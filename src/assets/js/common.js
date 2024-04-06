// import constants from "./constants";
import enumMISA from "./enum";
// import resources from "./resource";

/**
 * Các hàm dùng chung
 */
const common = {
  /**
   * Format date (DD/MM/YYYY)
   */
  formatDate: (dateTime) => {
    try {
      if (dateTime) {
        dateTime = new Date(dateTime);
        let date =
          dateTime.getDate() < 10
            ? "0" + dateTime.getDate()
            : dateTime.getDate();
        let month =
          dateTime.getMonth() < 9
            ? `0${dateTime.getMonth() + 1}`
            : dateTime.getMonth() + 1;
        let year = dateTime.getFullYear();
        return `${date}/${month}/${year}`;
      }
      return "";
    } catch (error) {
      return "";
    }
  },
  /**
   * Hàm chuyển từ enum giới tính ra tên
   */
  getTitleGender: (gender) => {
    var title = "Khác";
    switch (gender) {
      // Nam
      case enumMISA.enumGender.male:
        title = "Nam";
        break;
      // Nữ
      case enumMISA.enumGender.female:
        title = "Nữ";
        break;
      // Khác
      case enumMISA.enumGender.other:
        title = "Khác";
        break;
      default:
        title = "";
        break;
    }
    return title;
  },
  /**
   * Format tiền VN
   */
  formatSalaryVN: (salary) => {
    return salary
      ? new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(salary)
      : "";
  },
};

export default common;
