<template>
  <div class="m-import">
    <div class="m-import__header">
      <h1>Nhập nhân viên từ Excel</h1>
      <ul class="progressbar">
        <li :class="{ complete: stepNow > 1, active: stepNow == 1 }">
          CHỌN TỆP NGUỒN
        </li>
        <li :class="{ complete: stepNow > 2, active: stepNow == 2 }">
          KIỂM TRA DỮ LIỆU
        </li>
        <li :class="{ complete: stepNow > 3, active: stepNow == 3 }">
          KẾT QUẢ
        </li>
      </ul>
    </div>
    <div class="m-import__body">
      <div class="import-step-one" v-show="stepNow == 1">
        <div class="title__attachment">
          <div class="icon-attachment"></div>
          <div class="attachment-title">Chọn tệp Excel</div>
          <span>Dung lượng tối đa 20MB</span>
        </div>
        <div class="import-step-one__file-name" data-tip="Tên file đã nhập.">
          {{ nameFile }}
        </div>
        <div class="dropzone" @dragover.prevent @drop="handleDropFile">
          <label for="ms-input-import"></label>
          <input
            type="file"
            id="ms-input-import"
            @change="handleSelectFile"
            :multiple="false"
            accept=".xlsx"
            style="display: none"
          />
          <div class="dropzone-placeholder">
            Kéo thả tệp vào đây hoặc bấm vào đây
            <div class="icon-upload-file"></div>
          </div>
        </div>
        <div class="template-import" @click="downLoadFileTemplate">
          Tải tệp mẫu cơ bản
          <div class="icon-download-template"></div>
        </div>
      </div>
      <div class="import-step-two" v-show="stepNow == 2">
        <div class="import-step-two__header">
          <div class="import-step-two__header-left">
            <h4 class="row-success" v-show="data.length > 0">
              {{ rowSuccess }} dòng dữ liệu nhân viên hợp lệ
            </h4>
            <h4 class="row-error" v-show="data.length > 0">
              {{ rowError }} dòng dữ liệu nhân viên không hợp lệ
            </h4>
          </div>
          <div class="file-import-validated" @click="downLoadFileValidateEmployee">
          Tải tệp kiểm tra
          <div class="icon-download-template"></div>
        </div>
          <div class="import-step-two__header-right">
            <div class="filter-content">Lọc tình trạng</div>
            <div>
              <MCombobox
                :data="listStatusFilterImport"
                v-model="statusFilterRow"
                propName="value"
                propValue="id"
                icon="icon-drop-page-black"
                :isReadonly="true"
              />
            </div>
          </div>
        </div>
        <div class="m__e-fixed-table m__e-fixed-table-import">
          <table class="m__e-table m__e-table-import">
            <tr class="m__e-table-row m__e-table-row-import">
              <MTableColumn tag="th" minWidth="100px">Dòng số</MTableColumn>
              <MTableColumn tag="th" minWidth="100px">Tình trạng</MTableColumn>
              <MTableColumn
                tag="th"
                className="truncate_two-row"
                minWidth="250px"
                maxWidth="250px"
                >Chi tiết lỗi</MTableColumn
              >
              <MTableColumn tag="th" minWidth="150px" maxWidth="120px"
                >Mã nhân viên</MTableColumn
              >
              <MTableColumn tag="th" minWidth="150px"
                >Tên nhân viên</MTableColumn
              >
              <MTableColumn tag="th">Mã đơn vị</MTableColumn>
              <MTableColumn tag="th">Chức danh</MTableColumn>
              <MTableColumn tag="th" width="90px">Giới tính</MTableColumn>
            </tr>
            <tr
              class="m__e-table-row"
              v-for="item in dataPagination"
              :key="item.EmployeeId"
            >
              <MTableColumn>{{ item.rowIndex }}</MTableColumn>
              <MTableColumn
                :color="
                  item.StatusTitle == statusRowImport.valid ? 'blue' : 'red'
                "
                >{{ item.StatusTitle }}</MTableColumn
              >
              <MTableColumn :dataTip="item.MessageDetail">{{
                item.MessageDetail
              }}</MTableColumn>
              <MTableColumn>{{ item.EmployeeCode }}</MTableColumn>
              <MTableColumn>{{ item.FullName }}</MTableColumn>
              <MTableColumn>{{ item.DepartmentCode }}</MTableColumn>
              <MTableColumn>{{ item.PositionName }}</MTableColumn>
              <MTableColumn>{{ item.GenderName }}</MTableColumn>
            </tr>
          </table>
          <div class="m__e-list-empty" v-if="isShowImgNoData">
            <img
              src="../../../assets/img/bg_report_nodata.76e50bd8.svg"
              alt="Không có dữ liệu"
            />
            <span>Không có dữ liệu</span>
          </div>
        </div>
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
            <MPaginate
              :pageCount="totalPageNumber"
              @change="eventHandlePaginate"
            />
          </div>
        </div>
      </div>
      <div class="import-step-three" v-show="stepNow == 3">
        <div class="import-step-three__successfully">
          {{ numberRowImportSuccess === null ? "0" : numberRowImportSuccess }} /
          {{ data?.length }} dòng dữ liệu nhập thành công
        </div>
      </div>
      <div class="m-import-footer">
        <div class="prev" @click="prevStep">
          <MButton :height="32" typeBtn="close">{{ prev }}</MButton>
        </div>
        <div
          class="next"
          @click="nextStep"
          :style="{ display: stepNow == 3 ? 'none' : 'block' }"
        >
          <MButton>{{ next }}</MButton>
        </div>
      </div>
    </div>
  </div>
  <!-- Pop-up validate-->
  <MPopUpWarn
    :isShow="isInValidateForm"
    @close-pop-up="isInValidateForm = false"
    >{{ errorMessage }}
    <template #footer>
      <div class="warning__validate-btn" style="justify-content: flex-end">
        <div @click="isInValidateForm = false">
          <MButton>Đóng</MButton>
        </div>
      </div>
    </template>
  </MPopUpWarn>
  <MLoadding :isLoadding="isLoadding" />
</template>
<script>
import MButton from "@/components/button/MButton.vue";
import useEmpoyee from "@/api/employeeApi";
import resources from "@/assets/js/resource";
import MLoadding from "@/components/loadding/MLoadding.vue";
import enumMISA from "@/assets/js/enum";
import MTableColumn from "@/components/table-column/MTableColumn.vue";
import MPopUpWarn from "@/components/pop-up/MPopUpWarn.vue";
import MCombobox from "@/components/combobox/MCombobox.vue";
import MPaginate from "@/components/pagination/MPaginate.vue";
import constants from "@/assets/js/constants";

export default {
  name: "EmployeeImport",
  components: {
    MButton,
    MLoadding,
    MTableColumn,
    MPopUpWarn,
    MCombobox,
    MPaginate,
  },
  data() {
    return {
      prev: enumMISA.btnImport.close,
      next: enumMISA.btnImport.continue,
      rowSuccess: 0,
      rowError: 0,
      stepNow: 1,
      total: 0,
      file: null,
      nameFile: "",
      isLoadding: false,
      data: [],
      dataPagination: [],
      dataSuccess: null,
      errorMessage: "",
      isInValidateForm: false,
      statusRowImport: resources.vi.statusRowImport,
      pageSize: 20, // Số lượng dòng trên bảng
      pageNumber: 1, // Số page hiện tại
      totalRecord: 0, // Tổng số lượng bản ghi
      listCbbNavigate: constants.listNavigateNumber, // List combobox số bản ghi trên trang
      listStatusFilterImport: constants.listStatusFilterImport, // List combobox tình trạng dòng
      statusFilterRow: 3, // List combobox tình trạng dòng
      numberRowImportSuccess: null,
      isShowImgNoData : false
    };
  },
  methods: {
    /**
     * Lấy file khi khéo vào
     */
    async handleDropFile(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      await this.fileHandling(file);
    },
    /**
     * Lấy file chọn input
     */
    async handleSelectFile(event) {
      const file = event.target.files[0];
      await this.fileHandling(file);
    },
    /**
     * Xử lý lưu file
     */
    async fileHandling(file) {
      this.nameFile = "";
      const formData = new FormData();
      formData.append("File", file);
      try {
        this.isLoadding = true;
        const res = await useEmpoyee.checkValidateFileImport(formData);
        if (res?.ErrorCode == enumMISA.ERROR_RESPONSE.BADREQUEST) {
          this.errorMessage = res.UserMsg;
          this.isInValidateForm = true;
        } else {
          this.file = formData;
          this.nameFile = file.name;
        }
        this.isLoadding = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tải file template
     */
    async downLoadFileTemplate() {
      try {
        this.isLoadding = true;
        const response = await useEmpoyee.templateImport();
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", resources.vi.nameFile.templateImport);
        document.body.appendChild(link);
        link.click();
        this.isLoadding = false;
      } catch (error) {
        console.log("Export error : ", error);
      }
    },
    /**
     * Tải file validate nhân viên
     */
    async downLoadFileValidateEmployee(){
      try {
        this.isLoadding = true;
        const response = await useEmpoyee.FileImportValidate(this.data);
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", resources.vi.nameFile.fileImportValidate);
        document.body.appendChild(link);
        link.click();
        this.isLoadding = false;
      } catch (error) {
        console.log("Export error : ", error);
      }
    },
    /**
     * Hàm nhấn bước tiếp theo
     */
    async nextStep() {
      try {
        if (this.stepNow < 3) {
          // Check bước 1 có thể qua bước 2 không
          if (
            this.next == enumMISA.btnImport.continue &&
            this.stepNow == 1 &&
            !this.nameFile
          ) {
            this.errorMessage = resources.vi.messageImport.fileNotSelected;
            this.isInValidateForm = true;
            return;
          }else if (this.next == enumMISA.btnImport.close) {
            this.redirectEmployeeList();
            return;
          }
          this.stepNow++;
          await this.processingSteps();
        }
      } catch (error) {
        console.log("Lỗi", error);
      }
    },
    /**
     * Chuyển hướng về employee list
     */
    redirectEmployeeList() {
      this.$router.replace("/app/employee");
    },
    /**
     * Hàm nhấn trở lại
     */
    async prevStep() {
      if (this.stepNow >= 1) {
        if (this.prev == enumMISA.btnImport.close) {
          this.redirectEmployeeList();
        }
        this.stepNow--;
        await this.processingSteps();
      }
    },
    /**
     * Hàm xử lý các bước
     */
    async processingSteps() {
      switch (this.stepNow) {
        /**
         * Hàm xử lý bước 1
             */
        case 1: {
          this.prev = enumMISA.btnImport.close;
          this.next = enumMISA.btnImport.continue;
          break;
        }
        /**
         * Hàm xử lý bước 2
             */
        case 2: {
          try {
            this.isLoadding = true;
            const res = await useEmpoyee.checkValidateDataImport(this.file);
            // Lưu thông tin validate
            this.data = res?.Data.data;
            this.rowSuccess = res?.Data.numberRowValid;
            this.rowError = res?.Data.numberRowInValid;
            this.total = res?.Data.totalRow;
            this.dataPagination = this.pagingIndex();
            this.prev = enumMISA.btnImport.comeBack;
            this.totalRecord = res?.Data.totalRow;

            // Set nút button bên phải
            if (this.rowError == 0)
              this.next = enumMISA.btnImport.insertInformation;
            else this.next = enumMISA.btnImport.close;
            this.isLoadding = false;
          } catch (error) {
            console.log(error);
            this.next = enumMISA.btnImport.close;
            this.isLoadding = false;
          }
          break;
        }
        /**
         * Hàm xử lý bước 3
             */
        case 3: {
          try {
            this.isLoadding = true;
            this.prev = enumMISA.btnImport.close;
            this.next = enumMISA.btnImport.close;
            const res = await useEmpoyee.ImportExcel({ employees: this.data });
            this.numberRowImportSuccess = res?.Data || 0;
            this.isLoadding = false;
          } catch (error) {
            console.log(error);
            this.isLoadding = false;
          }
          break;
        }
      }
    },
    /**
     * Xử lý phân trang
     */
    pagingIndex() {
      var firstIndex = this.pageNumber * this.pageSize - this.pageSize;
      var lastIndex = this.pageNumber * this.pageSize - 1;
      if (enumMISA.enumStatusCodeImport.all == this.statusFilterRow) {
        return this.data.slice(firstIndex, lastIndex);
      } else {
        return this.data
          .filter((x) => x.StatusCode == this.statusFilterRow)
          .slice(firstIndex, lastIndex);
      }
    },
    /**
     * Bắt sự kiện thay đổi trang
     */
    eventHandlePaginate(pageNumber) {
      this.pageNumber = pageNumber;
      this.dataPagination = this.pagingIndex();
    },
  },
  computed: {
    /**
     * Tính tổng số trang
     */
    totalPageNumber() {
      return Math.ceil(this.totalRecord / this.pageSize);
    },
  },
  watch: {
    /**
     * Theo dõi số page thay đổi
     */
    totalPageNumber: function () {
      this.dataPagination = this.pagingIndex();
    },
    /**
     * Theo dõi số số lượng bản ghi trên 1 page thay đổi
     */
    pageSize: function () {
      if (this.pageSize * this.pageNumber > this.totalRecord) {
        this.pageNumber = 1;
      }
    },
    /**
     * Theo dõi trạng thái lọc
     */
    statusFilterRow: function () {
      // Lọc theo tất cả
      if (enumMISA.enumStatusCodeImport.all == this.statusFilterRow) {
        this.totalRecord = this.data.length;
      } else {
        // Lọc theo từng trạng thái
        this.totalRecord = this.data.filter(
          (x) => x.StatusCode == this.statusFilterRow
        ).length;
      }
      this.dataPagination = this.pagingIndex();
      this.isShowImgNoData = this.dataPagination.length > 0 ? false  : true;
    },
  },
};
</script>
<style>
@import url(./employee-import.css);
</style>
