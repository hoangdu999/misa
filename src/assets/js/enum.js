const enumMISA = {
  /**
   * Enum giới tính
   */
  enumGender: {
    // Nam
    male: 0,
    // Nữ
    female: 1,
    // Khác
    other: 2,
  },
  /**
   * List tháng VN
   */
  enumMonthVN: {
    Jan: "Tháng 1",
    Feb: "Tháng 2",
    Mar: "Tháng 3",
    Apr: "Tháng 4",
    May: "Tháng 5",
    Jun: "Tháng 6",
    Jul: "Tháng 7",
    Aug: "Tháng 8",
    Sep: "Tháng 9",
    Oct: "Tháng 10",
    Nov: "Tháng 11",
    Dec: "Tháng 12",
  },
  /**
   * Chức năng thực thiện
   */
  enumActionForm: {
    // Xóa
    delete: 0,
    // Thêm
    insert: 1,
    // Sửa
    Update: 2,
    // Nhân bản
    replication: 3,
  },

  /**
   * Chức năng button form
   */
  enumActionButtonForm: {
    // Cất
    save: 0,
    // Thêm và cất
    addAndSave: 1,
  },
  /**
   * List key code
   */
  KEY_CODE: {
    // Phím enter
    ENTER: 13,
    // Phím lên
    KEY_UP: 38,
    // Phím xuống
    KEY_DOWN: 40,
  },
  /**
   * List key code
   */
  LoCATION_LIST_CBB: {
    // Phím lên
    UP: 1,
    // Phím xuống
    DOWN: 0,
  },
  /**
   * List lỗi trả về
   */
  ERROR_RESPONSE: {
    // Không có dữ liệu
    NOT_CONTENT: 0,
    // Validate
    BADREQUEST: 1,
    // Server
    SERVER_ERROR: 2,
  },
  /**
   * List lỗi phản hồi
   */
  ERROR_REQUEST: {
    // Lỗi không phản hồi
    ERR_NETWORK: "ERR_NETWORK",
  },
  /**
   * Nút button inport
   */
  btnImport: {
    close: "Đóng",
    continue: "Tiếp tục",
    comeBack: "Quay lại",
    insertInformation: "Nhập dữ liệu",
  },
  /**
   * Trạng thái dòng kiểm tra tình trạng import
   */
  enumStatusCodeImport: {
    all: 3,
    invalid: 1,
    valid: 2,
  },
};
export default enumMISA;
