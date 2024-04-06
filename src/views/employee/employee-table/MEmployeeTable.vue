<template>
  <div class="m__e-fixed-table">
    <table class="m__e-table">
      <tr class="m__e-table-row">
        <MTableColumn tag="th" className="col-fixed-left">
          <MCheckBox
            id="check-all"
            @checkboxSelected="checkboxSelected"
            :checked="checkedAll"
            :disabled="data.length == 0"
          />
        </MTableColumn>
        <MTableColumn tag="th" minWidth="100px" maxWidth="150px"
          >Mã nhân viên</MTableColumn
        >
        <MTableColumn tag="th" minWidth="250px" maxWidth="250px"
          >Tên nhân viên</MTableColumn
        >
        <MTableColumn tag="th" minWidth="100px" maxWidth="100px"
          >Giới tính</MTableColumn
        >
        <MTableColumn
          tag="th"
          minWidth="150px"
          textAlign="center"
          maxWidth="150px"
          >Ngày sinh</MTableColumn
        >
        <MTableColumn
          tag="th"
          minWidth="200px"
          dataTip="Số chứng minh nhân dân"
          maxWidth="200px"
          >Số CMND</MTableColumn
        >
        <MTableColumn tag="th" minWidth="150px" maxWidth="150px"
          >Chức danh</MTableColumn
        >
        <MTableColumn tag="th" minWidth="200px" maxWidth="200px"
          >Tên đơn vị</MTableColumn
        >
        <MTableColumn tag="th" minWidth="150px" maxWidth="150px"
          >Số tài khoản</MTableColumn
        >
        <MTableColumn tag="th" className="col-fixed-right"
          >Chức năng</MTableColumn
        >
      </tr>
      <tr
        class="m__e-table-row"
        v-for="item in data"
        :key="item.EmployeeId"
        :class="{ active: rowSlected.includes(item.EmployeeId) }"
        @dblclick="employeeInfor(item.EmployeeId, actions.Update)"
      >
        <MTableColumn className="col-fixed-left">
          <MCheckBox
            :id="item.EmployeeId"
            :checked="rowSlected.includes(item.EmployeeId)"
            @checkboxSelected="checkboxSelected"
          />
        </MTableColumn>
        <MTableColumn>{{ item.EmployeeCode }}</MTableColumn>
        <MTableColumn  :dataTip="item.FullName" >{{ item.FullName }}</MTableColumn>
        <MTableColumn>{{
          item.GenderName || getTitleGender(item.Gender)
        }}</MTableColumn>
        <MTableColumn textAlign="center">{{
          formatDate(item.DateOfBirth)
        }}</MTableColumn>
        <MTableColumn>{{ item.IdentityNumber }}</MTableColumn>
        <MTableColumn>{{ item.PositionName }}</MTableColumn>
        <MTableColumn>{{ item.DepartmentName }}</MTableColumn>
        <MTableColumn>{{ item.IdentityNumber }}</MTableColumn>
        <MTableColumn className="col-fixed-right col-center">
          <div class="m__e-table-col-function-btn" ref="btnFunctionMenu" >
            <span @click="employeeInfor(item.EmployeeId, actions.Update)"
              >Sửa</span
            >
            <div
              class="m__e-table-col-icon"
              :class="
                employeeId === item.EmployeeId && isShowfunction ? 'active' : ''
              "
              @click="showFunctionId($event, item.EmployeeId)"
              v-click-outside="clickOutSideFunction"
              ref="btnFunction"
            >
              <div class="icon-drop-page-blue"></div>
            </div>
          </div>
        </MTableColumn>
      </tr>
    </table>
    <div class="m__e-list-empty" v-if="isShowImgNoData">
      <img src="../../../assets/img/bg_report_nodata.76e50bd8.svg" alt="Không có dữ liệu">
      <span>Không có dữ liệu</span>
    </div>
    <div
      class="m__e-table-col-function"
      :style="{
        top: `${functionTop}px `,
        left: `${functionLeft}px `,
      }"
      v-show="isShowfunction"
      ref="functionContextMenu"
    >
      <li @click="employeeInfor(employeeId, actions.replication)">Nhân bản</li>
      <li @click="confirmDeleteEmployee">Xóa</li>
      <li data-tip="Tính năng chưa phát triển">Ngừng sử dụng</li>
    </div>
  </div>
  <!-- Pop-up thông báo khi xóa -->
  <MPopUpWarn :isShow="isPopUpDelete" @close-pop-up="isPopUpDelete = false">
    {{
      `Bạn có thực sự muốn xóa nhân viên có mã <${
        data.find((x) => x.EmployeeId === employeeId)?.EmployeeCode
      }> không ?`
    }}
    <template #footer>
      <div class="warning__delete-btn">
        <div @click="isPopUpDelete = false">
          <MButton typeBtn="close">Không</MButton>
        </div>
        <div @click="deleteEmployee()" >
          <MButton typeBtn="delete" >Có</MButton>
        </div>
      </div>
    </template>
  </MPopUpWarn>
  <MLoadding :isFixed="true" :isLoadding="isLoadding" />
</template>
<script>
import common from "../../../assets/js/common";
import MCheckBox from "@/components/checkbox/MCheckBox.vue";
import MButton from "@/components/button/MButton.vue";
import MLoadding from "@/components/loadding/MLoadding.vue";
import resources from "@/assets/js/resource";
import enumMISA from "@/assets/js/enum";
import useEmpoyee from "@/api/employeeApi";
import MTableColumn from "@/components/table-column/MTableColumn.vue";
import MPopUpWarn from "@/components/pop-up/MPopUpWarn.vue";
export default {
  name: "MEmployeeTable",
  emits: [
    "delete-employee-successfully",
    "employee-infor",
    "change-toast-message",
    "update:modelValue",
    "close-pop-up"
  ],
  components: {
    MCheckBox,
    MButton,
    MLoadding,
    MTableColumn,
    MPopUpWarn,
  },
  props: {
    data: Array,
    modelValue: Array,
  },
  mounted(){
    this.heightFunction = this.$refs.functionContextMenu.offsetHeight;
    this.isShowfunction = false;
  },
  data() {
    return {
      rowSlected: [], // List id các checkbox được chọn
      checkedAll: false, // Checkbox tất cả
      employeeId: null, // Lưu ID nhân viên muốn sửa xóa
      employeeIndex: null, // Vị trí nhân viên được chọn
      isShowfunction: true, // Ẩn hiện chức năng của dòng
      heightFunction: 0,// Chiều cao của list chức năng
      functionTop: 0, // Tọa dộ top của list chức năng
      functionLeft: 0, // Tọa dộ left của list chức năng
      isPopUpDelete: false, // Ẩn hiện pop-up xóa
      isLoadding: false, // Ẩn hiện loadding
      actions: enumMISA.enumActionForm,
      isShowImgNoData: false, // Ẩn hiện ảnh không có data
    };
  },
  methods: {
    /**
     * Xử lý click out side cho list action
     */
    clickOutSideFunction(e){
      const check = this.$refs.btnFunction.filter(x => x.contains(e.target));
      if(!this.$refs.functionContextMenu.contains(e.target) && check.length <= 0 && this.isShowfunction){
        this.isShowfunction = false;
        this.employeeId = null;
      }
    },
    /**
     * Hàm xử lý checkbox
     */
    checkboxSelected(isChecked, id) {
      try {
        // Check all
        if (id === "check-all") {
          if (!isChecked) {
            // Kiểm tra khi bỏ check all
            this.data
              .map((x) => x.EmployeeId)
              .forEach((e) => {
                this.rowSlected = this.rowSlected.filter((x) => x != e);
              });
            this.checkedAll = false;
          } else {
            // Kiểm tra khi check all
            this.rowSlected = this.rowSlected.concat(
              this.data.map((x) => x.EmployeeId).filter((x) => !this.rowSlected.includes(x))
            );
            this.checkedAll = true;
          }
        } else {
          // Kiểm tra các item check
          if (!isChecked) {
            this.rowSlected = this.rowSlected.filter((x) => x !== id);
          } else {
            this.rowSlected.push(id);
          }
          this.testCheckAll();
        }
        this.$emit("update:modelValue", this.rowSlected);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm check tổng số phần tử trùng nhau của 2 mang
     */
    testCheckAll() {
      // Kiểm tra coi có check all hay không
      var count = 0;
      // Đếm số phần tử check của page
      this.data
        .map((x) => x.EmployeeId)
        .forEach((e) => {
          if (this.rowSlected.filter((x) => x == e).length > 0) count++;
        });

      // Kiểm tra để check
      if (this.data.length > 0 && count == this.data.length) {
        this.checkedAll = true;
      } else if (count < this.data.length) {
        this.checkedAll = false;
      }
    },

    /**
     * Truyền sự kiện lên cha thông tin nhân viên
     */

    employeeInfor(employeeId, action) {
      this.$emit("employee-infor", employeeId, action);
      this.isShowfunction = false;
    },
    /**
     * Format date theo DD/MM/YYYY
     */
    formatDate(date) {
      return common.formatDate(date);
    },
    /**
     * Format tiền việt nam
     */
    formatSalaryVN(Salary) {
      return common.formatSalaryVN(Salary);
    },
    /**
     * Hiển thị list chức năng của 1 dòng
     */
    showFunctionId(event, id) {
      if (this.employeeId == id) {
        this.isShowfunction = false;
        this.employeeId = null;
      } else {
        this.employeeId = id;
        this.isShowfunction = true;
        if(window.innerHeight - this.heightFunction*1.5 < event.clientY){
          this.functionTop = event.clientY - 15 - this.heightFunction;
          this.functionLeft = event.clientX - 100;
        }else{
          this.functionTop = event.clientY + 15;
          this.functionLeft = event.clientX - 100;
        }
      }
    },
    /**
     * Hiển thị pop-up xác nhận xóa
     */
    confirmDeleteEmployee() {
      this.isPopUpDelete = true;
      this.isShowfunction = false;
    },
    /**
     * Xử lý xóa nhân viên
     */
    async deleteEmployee() {
      try {
        this.isLoadding = true;
        const data = await useEmpoyee.deleteEmployees([this.employeeId]);
        if (data) {
          this.rowSlected = this.rowSlected.filter((x) => x !== this.employeeId);
          this.$emit("update:modelValue", this.rowSlected);
          this.isLoadding = false;
          // Xử lý xóa nhân viên trong bảng
          this.$emit(
            "delete-employee-successfully",
            this.employeeId,
            enumMISA.enumActionForm.delete
          );
        } else {
          this.$state.addToastMessage(this, resources.vi.msgDeleteNotFundID);
        }
        this.employeeId = null;
        this.isLoadding = false;
        this.isPopUpDelete = false;
      } catch (error) {
        this.isLoadding = false;
        console.log(error);
      }
    },
    /**
     * Xử lý gender title
     */
    getTitleGender(genderNumber) {
      return common.getTitleGender(genderNumber);
    },
  },
  watch: {
    /**
     * Kiểm tra khi chuyển page
     */
    data: function () {
      if(this.data.length == 0) {
        this.isShowImgNoData = true;
      }else this.isShowImgNoData = false;
      this.checkedAll = false;
      this.testCheckAll();
    },
    /**
     * Kiểm tra nếu đã xóa các employee
     */
    modelValue: {
      handler(newValue) {
        if (newValue.length == 0){
           this.rowSlected = [];
           this.checkedAll = false;
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
@import url(./table.css);
</style>
