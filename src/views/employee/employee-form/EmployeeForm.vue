<template>
  <m-pop-up
    :isShow="isShow"
    :isIconClose="true"
    @close-pop-up="closeFormEmployee"
    dataTipIcon="Đóng (Esc)"
    iconCloseClass="icon-close-big"
  >
    <template #header>
      <div class="m__e-form-header">
        <div class="m__e-form-title">
          {{ titleForm }}
        </div>
        <div
          class="m__e-form-type-customer"
          data-tip="Tính năng chưa được phát triển"
        >
          <MCheckBox
            :disabled="true"
            :checked="false"
            id="type-customer-1"
          /><span class="type-customer__name">Là khách hàng</span>
        </div>
        <div
          class="m__e-form-type-customer"
          data-tip="Tính năng chưa được phát triển"
        >
          <MCheckBox
            :disabled="true"
            :checked="false"
            id="type-customer-2"
          /><span class="type-customer__name">Là nhà cung cấp</span>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="form-submit">
        <div class="m__e-form">
          <div class="form__row" style="width: 100%">
            <div class="form__row f-bw" style="width: 50%">
              <div class="form__col" style="width: 49%">
                <MInput
                  textField="Mã"
                  :value="employee?.EmployeeCode"
                  :required="true"
                  ref="EmployeeCode"
                  name="EmployeeCode"
                  placeholder="NV-00001"
                  :tabIndex="1"
                  :originValue="employeeId"
                  :errorMsg="errorMsgObjectInput?.EmployeeCode"
                  :rules="[
                    rules.NOT_EMPTY,
                    `${rules.MAX_LENGTH}|20`,
                    rules.HAS_FORMAT,
                  ]"
                  @change-input="handleBindInputValue"
                  @message-error-input="handleBindMessageInput"
                />
              </div>
              <div class="form__col" style="width: 49%">
                <MInput
                  textField="Tên"
                  :value="employee?.FullName"
                  :required="true"
                  name="FullName"
                  ref="FullName"
                  :tabIndex="2"
                  :rules="[rules.NOT_EMPTY, `${rules.MAX_LENGTH}|100`]"
                  :errorMsg="errorMsgObjectInput?.FullName"
                  @change-input="handleBindInputValue"
                  @message-error-input="handleBindMessageInput"
                />
              </div>
            </div>
            <div class="form__row" style="width: 50%; padding-left: 20px">
              <div class="form__col" style="width: 40%">
                <MDatePicker
                  textField="Ngày sinh"
                  name="DateOfBirth"
                  ref="DateOfBirth"
                  :tabIndex="5"
                  :rules="[rules.ADULT]"
                  :dateValue="employee?.DateOfBirth"
                  @change="handleBindDateValue"
                  :errorMsg="errorMsgObjectInput?.DateOfBirth"
                  @message-error-input="handleBindMessageInput"
                />
              </div>
              <div class="form__col" style="width: 55%">
                <div class="form-col-gender-lable">Giới tính</div>
                <div class="form-col-gender">
                  <MRadioButton
                    margin="0 0 0 10px"
                    textField="Nam"
                    nameInput="gender"
                    id="0"
                    :tabIndex="6"
                    :checked="employee?.Gender == enumGender.male"
                    @change="employee.Gender = enumGender.male"
                  />
                  <MRadioButton
                    margin="0 0 0 10px"
                    textField="Nữ"
                    nameInput="gender"
                    id="1"
                    :tabIndex="7"
                    :checked="employee?.Gender == enumGender.female"
                    @change="employee.Gender = enumGender.female"
                  />
                  <MRadioButton
                    margin="0 0 0 10px"
                    textField="Khác"
                    nameInput="gender"
                    id="2"
                    :tabIndex="8"
                    :checked="employee?.Gender == enumGender.other"
                    @change="employee.Gender = enumGender.other"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form__row" style="width: 100%">
            <div class="form__col" style="width: 50%">
              <MCombobox
                :data="listDepartment"
                v-model="employee.DepartmentId"
                ref="DepartmentId"
                propName="name"
                propValue="id"
                :rules="[rules.NOT_EMPTY]"
                name="DepartmentId"
                textField="Đơn vị"
                :tabIndex="3"
                :required="true"
                :errorMsg="errorMsgObjectInput?.DepartmentId"
                @message-error-input="handleBindMessageInput"
              />
            </div>
            <div class="form__row f-bw" style="width: 50%; padding-left: 20px">
              <div class="form__col" style="width: 63%">
                <MInput
                  textField="Số CMND"
                  :value="employee?.IdentityNumber"
                  data-tip="Số chứng minh nhân dân"
                  name="IdentityNumber"
                  ref="IdentityNumber"
                  :rules="[`${rules.MAX_LENGTH}|12`]"
                  :errorMsg="errorMsgObjectInput?.IdentityNumber"
                  :tabIndex="9"
                  @change-input="handleBindInputValue"
                  @message-error-input="handleBindMessageInput"
                  type="number"
                />
              </div>
              <div class="form__col" style="width: 35%">
                <MDatePicker
                  textField="Ngày cấp"
                  name="IdentityDate"
                  ref="IdentityDate"
                  :tabIndex="10"
                  :rules="[rules.ADULT]"
                  :dateValue="employee?.IdentityDate"
                  @change="handleBindDateValue"
                  :errorMsg="errorMsgObjectInput?.IdentityDate"
                  @message-error-input="handleBindMessageInput"
                />
              </div>
            </div>
          </div>
          <div class="form__row" style="width: 100%">
            <div class="form__row" style="width: 50%">
              <MInput
                textField="Chức danh"
                :value="employee?.PositionName"
                :rules="[`${rules.MAX_LENGTH}|100`]"
                name="PositionName"
                ref="PositionName"
                :tabIndex="4"
                @change-input="handleBindInputValue"
                :errorMsg="errorMsgObjectInput?.PositionName"
                @message-error-input="handleBindMessageInput"
              />
            </div>
            <div class="form__col" style="width: 50%; padding-left: 20px">
              <MInput
                textField="Nơi cấp"
                :value="employee?.IdentityPlace"
                name="IdentityPlace"
                ref="IdentityPlace"
                :rules="[`${rules.MAX_LENGTH}|255`]"
                :tabIndex="11"
                @change-input="handleBindInputValue"
                @message-error-input="handleBindMessageInput"
                :errorMsg="errorMsgObjectInput?.Address"
              />
            </div>
          </div>
          <div class="form__row" style="width: 100%">
            <MInput
              textField="Địa chỉ"
              :value="employee?.Address"
              name="Address"
              ref="Address"
              :rules="[`${rules.MAX_LENGTH}|100`]"
              :tabIndex="12"
              @change-input="handleBindInputValue"
              @message-error-input="handleBindMessageInput"
              :errorMsg="errorMsgObjectInput?.Address"
            />
          </div>
          <div class="form__row f-bw" style="width: 70%">
            <div class="form__col" style="width: 32%">
              <MInput
                textField="ĐT di động"
                data-tip="Điện thoại di động"
                :value="employee?.PhoneNumber"
                :rules="[rules.HAS_FORMAT]"
                name="PhoneNumber"
                ref="PhoneNumber"
                type="number"
                :tabIndex="13"
                @change-input="handleBindInputValue"
                @message-error-input="handleBindMessageInput"
                :errorMsg="errorMsgObjectInput?.PhoneNumber"
              />
            </div>
            <div class="form__col" style="width: 32%">
              <MInput
                textField="ĐT cố định"
                data-tip="Điện thoại cố định"
                :value="employee?.PhoneNumberFixed"
                :rules="[rules.HAS_FORMAT]"
                name="PhoneNumberFixed"
                ref="PhoneNumberFixed"
                type="number"
                :tabIndex="14"
                @change-input="handleBindInputValue"
                @message-error-input="handleBindMessageInput"
                :errorMsg="errorMsgObjectInput?.PhoneNumberFixed"
              />
            </div>
            <div class="form__col" style="width: 32%">
              <MInput
                textField="Email"
                :value="employee?.Email"
                name="Email"
                ref="Email"
                :tabIndex="15"
                :rules="[rules.HAS_FORMAT, `${rules.MAX_LENGTH}|255`]"
                :errorMsg="errorMsgObjectInput?.Email"
                @change-input="handleBindInputValue"
                @message-error-input="handleBindMessageInput"
              />
            </div>
          </div>
          <div class="form__row f-bw" style="width: 70%">
            <div class="form__col" style="width: 32%">
              <MInput
                :tabIndex="16"
                textField="Tài khoản ngân hàng"
                name="BankAccount"
                ref="BankAccount"
                :value="employee?.BankAccount"
                :rules="[`${rules.MAX_LENGTH}|15`]"
                @change-input="handleBindInputValue"
                :errorMsg="errorMsgObjectInput?.BankAccount"
                @message-error-input="handleBindMessageInput"
                type="number"
              />
            </div>
            <div class="form__col" style="width: 32%">
              <MInput
                :tabIndex="17"
                textField="Tên ngân hàng"
                name="BankName"
                ref="BankName"
                :value="employee?.BankName"
                :rules="[`${rules.MAX_LENGTH}|150`]"
                @change-input="handleBindInputValue"
                :errorMsg="errorMsgObjectInput?.BankName"
                @message-error-input="handleBindMessageInput"
              />
            </div>
            <div class="form__col" style="width: 32%">
              <MInput
                :tabIndex="18"
                textField="Chi nhánh"
                name="BankBranchName"
                ref="BankBranchName"
                :value="employee?.BankBranchName"
                :rules="[`${rules.MAX_LENGTH}|255`]"
                @change-input="handleBindInputValue"
                :errorMsg="errorMsgObjectInput?.BankBranchName"
                @message-error-input="handleBindMessageInput"
              />
            </div>
          </div>
        </div>
        <div class="m__e-form-footer-btn">
          <div class="m__e-form-btn__left" @click="destroyForm()">
            <MButton typeBtn="close" :tabIndex="20" name="EndForm" ref="EndForm"
              >Hủy</MButton
            >
          </div>
          <div class="m__e-form-btn__right">
            <MButton
              margin="0 16px 0 0"
              typeBtn="close"
              :tabIndex="18"
              @click="onSubmitFormEmployee(actionButtonForm.save)"
              dataTip="Cất (Ctrl + S)"
              >Cất</MButton
            >
            <MButton
              :tabIndex="19"
              @click="onSubmitFormEmployee(actionButtonForm.addAndSave)"
              dataTip="Cất và thêm (Ctrl + Shift + S)"
              >{{ titleBtnAction }}</MButton
            >
          </div>
        </div>
      </div>
    </template>
    <div
      class="m__e-form-footer-btn-support icon-question"
      data-tip-icon="Tính năng giải đáp chưa được phát triển"
    ></div>
  </m-pop-up>
  <!-- Pop-up thông báo khi đóng form -->
  <MPopUpWarn
    :isShow="isValidateClosePopUp"
    @close-pop-up="isValidateClosePopUp = false"
    dataTipIcon="Đóng"
    >Dữ liệu đã bị thay đổi. Bạn có muốn cất không?
    <template #footer>
      <div class="warning__validate-btn">
        <MButton
          @click="destroyPopUpInValid()"
          margin="0 8px 0 0"
          typeBtn="close"
          ref="CloseValidate"
          name="CloseValidate"
          :tabIndex="21"
          >Hủy</MButton
        >
        <MButton
          @click="closeForm"
          margin="0 8px 0 0"
          typeBtn="close"
          :tabIndex="22"
          >Không</MButton
        >
        <MButton
          @click="onSubmitFormEmployee(actionButtonForm.save)"
          :tabIndex="23"
          >Có</MButton
        >
      </div>
    </template>
  </MPopUpWarn>
  <!-- Pop-up validate-->
  <MPopUpWarn
    :isShow="isValidateForm"
    @close-pop-up="isValidateForm = false"
    dataTipIcon="Đóng"
  >
    {{ errorMessage }}
    <template #footer>
      <div class="warning__validate-btn" style="justify-content: flex-end">
        <div @click="closePupUpValidate">
          <MButton>Đóng</MButton>
        </div>
      </div>
    </template>
  </MPopUpWarn>
  <MLoadding :isFixed="true" :isLoadding="isLoadding" />
</template>
<script>
import MInput from "@/components/input/MInput.vue";
import MRadioButton from "@/components/radio-button/MRadioButton.vue";
import useDepartment from "@/api/departmentApi";
import MPopUp from "@/components/pop-up/MPopUp.vue";
import MCheckBox from "@/components/checkbox/MCheckBox.vue";
import MButton from "@/components/button/MButton.vue";
import useEmployee from "@/api/employeeApi";
import MLoadding from "@/components/loadding/MLoadding.vue";
import MDatePicker from "@/components/datepicker/MDatePicker.vue";
import enumMISA from "@/assets/js/enum";
import resources from "@/assets/js/resource";
import MCombobox from "@/components/combobox/MCombobox.vue";
import MPopUpWarn from "@/components/pop-up/MPopUpWarn.vue";
export default {
  name: "EmployeeForm",
  emits: ["close-pop-up", "action-employee-successfully"],
  props: {
    isShow: Boolean,
    employeeId: String,
    action: null,
  },
  components: {
    MInput,
    MRadioButton,
    MPopUp,
    MCheckBox,
    MButton,
    MLoadding,
    MDatePicker,
    MCombobox,
    MPopUpWarn,
  },
  data() {
    return {
      listDepartment: [], // Danh sach các phòng ban
      isValidateForm: false, // Toggle form
      firstInputNameError: "", // Lưu input name lỗi đầu tiên
      isValidateClosePopUp: false, // Toggle pup-up
      employee: {}, // Lưu thông tin nhân viên
      employeeIdSelected: null, // Id nhân viên muốn sửa hoặc nhân bản
      errorMessage: "", // Biến lưu lỗi input đầu
      isLoadding: false, // Biến ẩn hiện loadding
      titleBtnAction: "Cất và thêm", // Title input thêm hoặc sửa động
      errorMsgObject: {
        EmployeeCode: "",
        FullName: "",
        DepartmentId: "",
        PositionName: "",
        DateOfBirth: "",
        IdentityNumber: "",
        IdentityDate: "",
        IdentityPlace: "",
        Address: "",
        PhoneNumber: "",
        PhoneNumberFixed: "",
        Email: "",
        BankAccount: "",
        BankName: "",
        BankBranchName: "",
      }, // Lưu các lỗi của các input
      errorMsgObjectInput: {}, // Lưu lỗi hiển thị message input
      enumGender: enumMISA.enumGender, // Enum giới tính
      submitType: null, // Loại submit
      actionButtonForm: enumMISA.enumActionButtonForm, // Chức năng button form
      actionForm: enumMISA.enumActionForm.insert, // Chức năng  form
      rules: resources.FORM_RULES, // Rules validate
      currentInput: null,
      employeeStartForm: null,
    };
  },

  created() {
    this.getAllDempartment();
  },
  mounted() {
    /**
     * Xử lý phím tắt
     */
    document.addEventListener("keydown", (event) => {
      // Nếu form được mở
      if (this.isShow) {
        // Xử lý tab vòng lặp trong form
        if (
          event.shiftKey &&
          event.key === "Tab" &&
          event.target.name == "EmployeeCode"
        ) {
          event.preventDefault();
          this.$refs.EndForm.onFocus();
        } else if (
          !event.shiftKey &&
          event.key === "Tab" &&
          event.target.name == "EndForm"
        ) {
          event.preventDefault();
          this.$refs.EmployeeCode.onFocus();
        }
        // Tắt form phím ESC (27 là mã ESC)
        else if (event.keyCode === 27) {
          this.closeFormEmployee();
        }
        // Cất phím tắt CTRL + s
        else if (event.ctrlKey && event.key === "s") {
          event.preventDefault();
          this.onSubmitFormEmployee(this.actionButtonForm.save);
        }
        // Cất và thêm phím tắt CTRL + Shift + s
        else if (event.ctrlKey && event.key === "S") {
          event.preventDefault();
          this.onSubmitFormEmployee(this.actionButtonForm.addAndSave);
        }
      }
    });
  },
  methods: {
    /**
     * Lấy dữ liệu các phòng ban hiển thị lên Combobox
     */
    async getAllDempartment() {
      try {
        var response = await useDepartment.getAll();
        this.listDepartment = response.Data.map((item) => ({
          id: item.DepartmentId,
          name: item.DepartmentName,
        }));
      } catch (error) {
        console.log("Lỗi get phòng ban : ", error);
      }
    },
    /**
     * Check kiểm tra dữ liệu trước khi tắt form (dấu)
     */
    closeFormEmployee() {
      // Kiếm tra input có dữ liệu không
      try {
        const oldEmp = JSON.stringify(this.employeeStartForm);
        const newEmp = JSON.stringify(this.employee);
        if (oldEmp != newEmp) {
          this.isValidateClosePopUp = true;
        } else {
          this.isValidateClosePopUp = false;
          this.employee = {};
          this.errorMsgObjectInput = {};
          this.$emit("close-pop-up");
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xử lý submit form thêm nhân viên hoặc sửa
     */
    async onSubmitFormEmployee(actionButtonForm) {
      try {
        this.isLoadding = true;

        // Validate input form
        var checkValidate = this.checkValidateFormSubmit();
        if (!checkValidate) {
          this.dialogValidate();
          return;
        }
        // kiểm tra là thêm hay sửa
        var data = this.employeeIdSelected
          ? await useEmployee.updateEmp(this.employeeId, this.employee) // Gọi api Update
          : await useEmployee.createEmp(this.employee); // Gọi api Create
        // check kết quả

        //Xử lý vào table sau khi thành công
        this.processAddEmployeeToTable(data);

        // Hiện thị dữ liệu bảng
        if (actionButtonForm == enumMISA.enumActionButtonForm.addAndSave)
          await this.resetForm(); // (Thêm hoặc sửa) và cất
        else this.closeForm(); // Cất

        this.isLoadding = false;
      } catch (error) {
        var res = error?.response?.data;
        // Kiểm tra lỗi validate
        if (res?.ErrorCode == enumMISA.ERROR_RESPONSE.BADREQUEST) {
          for (const key in res.MoreInfo) {
            this.errorMsgObject[key] = res.MoreInfo[key];
            this.errorMessage = res.MoreInfo[key];
            this.firstInputNameError = key;
            this.errorMsgObjectInput = this.errorMsgObject;
            this.dialogValidate();
            return;
          }
        }
        console.log(error);
        this.isLoadding = false;
      }
    },
    /**
     * Xử lý vào table sau khi thành công
     */
    processAddEmployeeToTable(data) {
      // Set name department để thêm vào table
      var departmentName = this.listDepartment.find(
        (x) => x.id == this.employee.DepartmentId
      ).name;
      // Gán giá trị trường cần cho nhân viên để thêm vào bảng
      this.employee.EmployeeId = data.Data;
      this.employee.DepartmentName = departmentName;

      // Thêm emp vào bảng hiển thị
      this.$emit(
        "action-employee-successfully",
        this.employee,
        this.actionForm
      );
    },
    /**
     * Hàm validate form true : không lỗi
     */
    checkValidateFormSubmit() {
      for (const property in this.errorMsgObject) {
        this.$refs[property]?.checkValidate();
      }
      this.errorMessage = undefined;
      this.firstInputNameError = undefined;
      for (const property in this.errorMsgObject) {
        if (this.errorMsgObject[property]) {
          this.errorMessage = this.errorMsgObject[property];
          this.firstInputNameError = property;
          this.errorMsgObjectInput = this.errorMsgObject;
          return false;
        }
      }
      return true;
    },
    /**
     * Tắt dialog validate
     */
    dialogValidate() {
      this.isValidateForm = true;
      this.isLoadding = false;
    },
    /**
     * Tắt dialog validate
     */
    closePupUpValidate() {
      this.isValidateForm = false;
      this.$refs[this.firstInputNameError].onFocus();
    },
    /**
     * Tắt form
     */
    closeForm() {
      this.isValidateClosePopUp = false;
      this.errorMsgObjectInput = {};
      this.$emit("close-pop-up");
    },
    /**
     * Nhấn hủy khi tắt popup invalid
     */
    destroyPopUpInValid() {
      this.isValidateClosePopUp = false;
    },
    /**
     * Nhấn hủy khi tắt form
     */
    destroyForm() {
      this.$emit("close-pop-up");
      this.errorMsgObjectInput = {};
    },
    /**
     * Xử lý khi input form thay đổi
     */
    handleBindInputValue(event) {
      this.employee[event.target.name] = event.target.value?.trim();
      this.errorMsgObject[event.target.name] = "";
    },
    /**
     * Xử lý khi input message lỗi
     */
    handleBindMessageInput(name, msgError) {
      this.errorMsgObject[name] = msgError;
    },
    /**
     * Hàm xử lý value Datepicker
     */
    handleBindDateValue(date, name) {
      console.log(1, date);
      if (date) {
        date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
      }
      console.log(2, date);
      this.employee[name] = date;
      this.errorMsgObject[name] = "";
    },
    /**
     * Hàm check undefined and empty
     */
    isEmpty(value, name) {
      var bool = !value ? true : false;
      if (!bool) this.errorMsgObject[name] = "";
      return bool;
    },
    /**
     * Hàm gán lỗi
     */
    assignSessage(name, msg) {
      this.errorMsgObject[name] = msg;
      this.errorMessage = this.errorMessage || msg;
      if (this.errorMessage === msg) this.firstInputNameError = name;
    },
    /**
     * Hàm reset input form and newCode
     */
    async resetForm() {
      try {
        // xóa thông tin form
        this.employee = {};
        this.employeeIdSelected = null;
        // lấy EmployeeNewCode
        var newCode = await useEmployee.getNewEmpCode();
        this.employee.EmployeeCode = newCode;
        this.employee.Gender = enumMISA.enumGender.male;
        this.actionForm = enumMISA.enumActionForm.insert;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    /**
     * Hiện thi tiêu đề form
     */
    titleForm() {
      return this.employeeIdSelected === null
        ? "Thêm nhân viên"
        : "Thông tin nhân viên";
    },
  },
  watch: {
    /**
     * Check hiển thị form thêm hay sửa
     */
    isShow: async function () {
      try {
        if (this.isShow) {
          this.employeeIdSelected = this.employeeId;
          this.employee = {};
          // Call api lấy mã nhân viên mới
          var newEmmployeeCode = await useEmployee.getNewEmpCode();
          if (this.employeeIdSelected === null) {
            this.employee.EmployeeCode = newEmmployeeCode;
            this.employee.Gender = 0;
          } else {
            // Call api lấy thông tin nhân viên hiển thị lên
            const employee = await useEmployee.getEmpById(
              this.employeeIdSelected
            );
            this.employee = employee;
            this.employeeStartForm = Object.assign({}, this.employee);
            // Kiểm tra có phải là nhân bản
            if (this.actionForm == enumMISA.enumActionForm.replication)
              this.employee.EmployeeCode = newEmmployeeCode;
          }
          this.employeeStartForm = Object.assign({}, this.employee);
          // Focus vào input mã nhân viên
          this.$refs.EmployeeCode.onFocus();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * KIểm tra sự thay đổi của employee
     */
    employee: {
      handler(newValue) {
        if (newValue.DepartmentId)
          // Reset lỗi phòng ban
          this.errorMsgObject["DepartmentId"] = "";
      },
      deep: true,
    },
    /**
     * Gán hoạt động thêm, sửa hoặc nhân bản
     */
    action: function () {
      this.actionForm = this.action;
    },
  },
};
</script>
<style scoped>
@import url(./employee-form.css);
</style>
