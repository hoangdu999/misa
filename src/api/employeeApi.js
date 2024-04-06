import axiosClient from "./axiosClient";
const baseUrl = "employees/";

/**
 * Các API liên quan đến Employee
 */
const useEmpoyee = {
  /**
   * Lấy tất cả các nhân viên
   */
  getAllEmp: () => {
    try {
      return axiosClient.get(baseUrl);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Lấy các nhân viên theo bộ lọc
   */
  getEmpByFilter: (params) => {
    try {
      return axiosClient.post(baseUrl + "filter", params);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Lấy mã nhân viên mới
   */
  getNewEmpCode: () => {
    try {
      return axiosClient.get(baseUrl + "NewEmployeeCode");
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Lấy 1 nhân viên theo Id
   */
  getEmpById: (id) => {
    try {
      return axiosClient.get(baseUrl + id);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Thêm nhân viên
   */
  createEmp: (employee) => {
    try {
      return axiosClient.post(baseUrl, employee);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Sửa nhân viên
   */
  updateEmp: (id, newEmployee) => {
    try {
      return axiosClient.put(baseUrl + id, newEmployee);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Xóa nhân viên theo Id
   */
  deleteEmp: (id) => {
    try {
      return axiosClient.delete(baseUrl + id);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Xóa nhiều nhân viên theo list Id
   */
  deleteEmployees: (listId) => {
    try {
      return axiosClient.post(baseUrl + "Delete-Records", listId);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Export nhân viên
   */
  ExportEmp: (filter) => {
    try {
      return axiosClient({
        method: "POST",
        url: baseUrl + "ExportExcel",
        responseType: "blob",
        data: filter,
      });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Export file validate nhân viên
   */
  FileImportValidate: (data) => {
    try {
      return axiosClient({
        method: "POST",
        url: baseUrl + "FileImportValidate",
        responseType: "blob",
        data: { employees: data },
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Xuất file template mẫu import
   */
  templateImport: () => {
    try {
      return axiosClient({
        method: "GET",
        url: baseUrl + "FileImportEmployeeTemplate",
        responseType: "blob",
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Xuất file template mẫu import
   */
  checkValidateDataImport: (fileForm) => {
    try {
      return axiosClient({
        method: "POST",
        url: baseUrl + "ValidateDataImport",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: fileForm,
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Nhập file check validate file
   */
  checkValidateFileImport: (fileForm) => {
    try {
      // return axiosClient.post(baseUrl + "CheckBasicFileImport",fileForm);
      return axiosClient({
        method: "POST",
        url: baseUrl + "CheckBasicFileImport",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: fileForm,
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Nhập file check validate file
   */
  ImportExcel: (listEmployee) => {
    try {
      // return axiosClient.post(baseUrl + "CheckBasicFileImport",fileForm);
      return axiosClient({
        method: "POST",
        url: baseUrl + "ImportExcel",
        data: listEmployee,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default useEmpoyee;
