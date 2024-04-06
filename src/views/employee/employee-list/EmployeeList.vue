<template>
  <div class="m-main-content-header">
    <div class="m-main-content-title">Nhân viên</div>
    <div class="m-main-content-btn-add">
      <div @click="onShowForm">
        <MButton>Thêm nhân viên</MButton>
      </div>
      <div
        class="m-main-content-btn-import"
        @click="toggleActionImport"
        v-click-outside="() => (isShowActionImport = false)"
      >
        <div class="icon-drop-page-white"></div>
        <ul class="m-main-content-btn-import__action" v-if="isShowActionImport">
          <li @click="redirectPageImport()">Nhập từ Excel</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="m-main-content-table">
    <div class="content-table__btn">
      <div class="content-table-btn__left">
        <div
          v-show="isShowActionprocessMutiple"
          class="content-table-btn__left-block"
        >
          <div class="series-selected">
            Đã chọn <span>{{ listRowSelected.length }}</span>
          </div>
          <div class="series-unchecked" @click="uncheckedAll()">Bỏ chọn</div>
          <div class="action__delete-mutiple" @click="confirmDeleteEmployee()">
            Xóa
          </div>
        </div>
      </div>
      <div class="content-table__btn-right">
        <MInput
          placeholder="Tìm theo mã, tên nhân viên"
          classIcon="icon-search"
          @change-input="searchData"
          width="220px"
          marginBottom="0px"
        />
        <div
          class="content-table__refesh icon-refesh"
          @click="refresh()"
          data-tip="Lấy lại dữ liệu"
        ></div>
        <div
          class="content-table__refesh icon-export"
          @click="exportEmployee"
          data-tip-left="Xuất excel (Ctrl + P)"
        ></div>
      </div>
    </div>
    <MEmployeeTable
      v-model="listRowSelected"
      :data="listEmpoyee"
      @employee-infor="showEmployeeInforForm"
      @delete-employee-successfully="resetEmployeeAction"
      @close-pop-up="closeFormEmployee"
    />
    <div class="content-navigation">
      <div class="content-navigation__total">
        Tổng số: <span>{{ this.totalRecord || 0 }}</span> bản ghi
      </div>
      <div class="content-navigation__page">
        <div style="margintop: -5px">
          <MCombobox
            :data="listCbbNavigate"
            v-model="pageSize"
            propName="value"
            propValue="id"
            icon="icon-drop-page-black"
            :locationList="1"
            :isReadonly="true"
          />
        </div>
        <MPaginate :pageCount="totalPageNumber" @change="eventHandlePaginate" />
      </div>
    </div>
    <MLoadding :isLoadding="isLoadding" />
  </div>
  <EmployeeForm
    :isShow="showForm"
    :action="action"
    :employeeId="employeeId"
    @close-pop-up="closeFormEmployee"
    @action-employee-successfully="resetEmployeeAction"
  />
  <!-- Pop-up thông báo khi xóa -->
  <MPopUpWarn :isShow="isPopUpDelete" @close-pop-up="isPopUpDelete = false">
    Bạn có thực sự muốn xóa {{ listRowSelected.length }} nhân viên đã chọn
    không?
    <template #footer>
      <div class="warning__delete-btn">
        <div @click="isPopUpDelete = false">
          <MButton typeBtn="close">Không</MButton>
        </div>
        <div @click="deleteEmployees()">
          <MButton>Có</MButton>
        </div>
      </div>
    </template>
  </MPopUpWarn>
</template>

<script>
import MButton from "@/components/button/MButton.vue";
import MInput from "@/components/input/MInput.vue";
import MLoadding from "@/components/loadding/MLoadding.vue";
import useEmpoyee from "@/api/employeeApi";
import EmployeeForm from "../employee-form/EmployeeForm.vue";
import MEmployeeTable from "../employee-table/MEmployeeTable.vue";
import constants from "../../../assets/js/constants";
import MPaginate from "@/components/pagination/MPaginate.vue";
import enumMISA from "@/assets/js/enum";
import resources from "@/assets/js/resource";
import MCombobox from "@/components/combobox/MCombobox.vue";
import MPopUpWarn from "@/components/pop-up/MPopUpWarn.vue";

// import hotkeys from "hotkeys-js";
export default {
  name: "EmployeeList",
  emits: ["change-toast-message"],
  data() {
    return {
      isLoadding: false, // Biến ẩn hiện loadding
      pageSize: 20, // Số lượng dòng trên bảng
      pageNumber: 1, // Số page hiện tại
      totalRecord: 0, // Tổng số lượng bản ghi
      textSearch: "", // Text tìm kiếm
      listEmpoyee: [], // Mảng lưu dữ liệu nhân viên
      listCbbNavigate: constants.listNavigateNumber, // List combobox số bản ghi trên trang
      itemPageSize: 20, // Pagesite active
      showForm: false, // Ân hiện form
      titleForm: "", // Tiêu đề form
      employeeId: null, // ID nhân viên được chọn
      action: null, // ID nhân viên được chọn
      isDisabledBtnExecution: true, // disable button hàng loạt
      listRowSelected: [], // List nhân viên tích
      isPopUpDelete: false, // Popup xác nhân xóa
      isShowActionprocessMutiple: false, // Nút xóa hàng loạt
      isShowActionImport: false, //Show action import
    };
  },
  components: {
    MButton,
    MInput,
    MEmployeeTable,
    MLoadding,
    EmployeeForm,
    MPaginate,
    MCombobox,
    MPopUpWarn,
  },
  created() {
    /**
     * Lấy dữ liệu khi bắt đầu vào trang
     */
    this.getData();
  },
  mounted() {
    // Xử lý phím tắt
    document.addEventListener("keydown", this.onKeyDown);
  },
  methods: {
    /**
     * Hàm xử lý phím tắt
     */
    onKeyDown(event) {
      // Tắt mở form (Shift + n)
      if (event.ctrlKey && event.key === "1") {
        event.preventDefault();
        this.onShowForm();
      }
      // Xuất file excel phím tắt CTRL + P
      else if (event.ctrlKey && (event.key === "P" || event.key === "p")) {
        event.preventDefault();
        this.exportEmployee();
      }
    },
    /**
     * Hàm lấy danh sách nhân viên
     */
    async getData() {
      try {
        this.isLoadding = true;
        const data = await useEmpoyee.getEmpByFilter(this.params);
        this.listEmpoyee = data.Data;
        this.totalRecord = data.Total;
        this.isLoadding = false;
      } catch (error) {
        this.isLoadding = false;
        console.log("Lỗi lấy dữ liệu", error);
      }
    },
    /**
     * Hàm search nhân viên
     */
    async searchData(event) {
      try {
        if (this.timeout) clearTimeout(this.timeout);
        // Xét thời gian tìm kiếm 0,5s
        this.timeout = setTimeout(async () => {
          this.textSearch = event.target.value || "";
          this.pageNumber = 1;
          await this.getData();
        }, 500); // delay
      } catch (error) {
        console.log("Lỗi search data : ", error);
      }
    },
    /**
     * Refresh lại dữ liệu
     */
    async refresh() {
      try {
        this.isLoadding = true;
        // Xét thời gian tìm kiếm 0,5s
        setTimeout(async () => {
          this.pageNumber = 1;
          await this.getData();
        }, 500); // delay
      } catch (error) {
        console.log("Lỗi refresh data : ", error);
      }
    },
    /**
     * Hàm check nếu sửa thì refresh lại dữ liệu
     */
    closeFormEmployee() {
      try {
        this.employeeId = null;
        this.showForm = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện thị form thêm hoặc sửa
     */
    showEmployeeInforForm(employeeId, action) {
      this.employeeId = employeeId;
      this.action = action;
      this.showForm = true;
    },

    /**
     * Hiện thị form thêm nhân viên
     */
    onShowForm() {
      this.action = enumMISA.enumActionForm.insert;
      this.showForm = true;
    },
    /**
     * Bắt sự kiện thay đổi trang
     */
    async eventHandlePaginate(pageNumber) {
      this.isLoadding = true;
      this.pageNumber = pageNumber;
      setTimeout(async () => {
        await this.getData();
      }, 500); // delay
    },
    /**
     * Bắt sự kiện thay đổi trang
     */
    resetEmployeeAction(item, action) {
      var me = this;
      // Lấy vị trí cần thêm, sửa hoặc xóa
      var index = me.listEmpoyee.findIndex(
        (x) =>
          x.EmployeeId ===
          `${
            action === enumMISA.enumActionForm.delete ? item : item.EmployeeId
          }`
      );
      // Kiểm tra có phải xoa
      if (action === enumMISA.enumActionForm.delete) {
        this.listEmpoyee.splice(index, 1);
        this.totalRecord--;

        // Hiển thị toast massage
        this.$state.addToastMessage(
          this,
          resources.vi.TOAST_MESSAGE.SUCCESS(resources.vi.ACTION.DELETE)
        );
      } // Kiểm tra có phải thêm
      else if (
        action === enumMISA.enumActionForm.insert ||
        action === enumMISA.enumActionForm.replication
      ) {
        this.totalRecord++;
        this.listEmpoyee.unshift(item);

        // Hiển thị toast massage
        this.$state.addToastMessage(
          this,
          resources.vi.TOAST_MESSAGE.SUCCESS(resources.vi.ACTION.ADD)
        );
      } // Kiểm tra có phải sửa
      else if (action === enumMISA.enumActionForm.Update) {
        this.listEmpoyee.splice(index, 1);
        this.listEmpoyee.unshift(item);

        // Hiển thị toast massage
        this.$state.addToastMessage(
          this,
          resources.vi.TOAST_MESSAGE.SUCCESS(resources.vi.ACTION.EDIT)
        );
      }
      this.employeeId = null;
    },
    /**
     * Export nhân viên
     */
    async exportEmployee() {
      try {
        const response = await useEmpoyee.ExportEmp(this.params);
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", resources.vi.nameFile.fileExport);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.log("Export error : ", error);
      }
    },
    /**
     * Hiện thi thông báo xóa
     */
    confirmDeleteEmployee() {
      this.isPopUpDelete = true;
    },
    /**
     * Bỏ chọn tất cả checkbox
     */
    uncheckedAll() {
      this.listRowSelected = [];
    },
    /**
     * Xử lý xóa nhiều nhân viên
     */
    async deleteEmployees() {
      try {
        this.isLoadding = true;
        const data = await useEmpoyee.deleteEmployees(this.listRowSelected);
        if (data) {
          this.isPopUpDelete = false;
          this.listRowSelected = [];
          // Hiển thị toast massage
          this.$state.addToastMessage(
            this,
            resources.vi.TOAST_MESSAGE.SUCCESS(resources.vi.ACTION.DELETE)
          );
        } else {
          this.$state.addToastMessage(this, resources.vi.msgDeleteNotFundID);
        }
        this.pageNumber = 1;
        await this.getData();
        this.isLoadding = false;
      } catch (error) {
        this.$state.addToastMessage(this, resources.vi.msgErrorServer);
      }
    },
    /**
     * Ẩn hiện action import
     */
    toggleActionImport() {
      this.isShowActionImport = !this.isShowActionImport;
    },
    /**
     * Chuyển hướng đến page import
     */
    redirectPageImport() {
      this.isShowActionImport = false;
      this.$router.push("/app/import-employee");
    },
  },
  computed: {
    /**
     * Get param filter data
     */
    params() {
      return {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        textSearch: this.textSearch,
      };
    },
    /**
     * Tính tổng số trang
     */
    totalPageNumber() {
      return Math.ceil(this.totalRecord / this.pageSize);
    },
  },

  watch: {
    /**
     * Lựa chọn số bản ghi trên 1 trang
     */
     pageSize: async function  () {
      this.isLoadding = true;
      this.pageNumber = 1;
      setTimeout(async () => {
        await this.getData();
      }, 500); // delay
    },
    /**
     * Kiểm tra xem số lương nhân viên tích chọn để disable button
     */
    listRowSelected: {
      handler() {
        if (this.listRowSelected.length > 0)
          this.isShowActionprocessMutiple = true;
        else {
          this.isDisabledBtnExecution = true;
          this.isShowActionprocessMutiple = false;
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
@import url(./employee-list.css);
</style>
