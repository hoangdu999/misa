import axiosClient from "./axiosClient";
const baseUrl = "departments/";

/**
 * Các API liên quan đến Employee

 */
const useDepartment = {
  /**
     * Lấy tất cả các phòng ban
    
     */
  getAll: () => {
    try {
      return axiosClient.get(baseUrl);
    } catch (error) {
      console.log(error);
    }
  },
  /**
     * Thêm phòng ban
    
     */
  createDep: (employee) => {
    try {
      return axiosClient.post(baseUrl, employee);
    } catch (error) {
      console.log(error);
    }
  },
  /**
     * Sửa phòng ban
    
     */
  updateDep: (id, newEmployee) => {
    try {
      return axiosClient.put(baseUrl + id, newEmployee);
    } catch (error) {
      console.log(error);
    }
  },
  /**
     * Xóa phòng ban theo Id
    
     */
  deleteDep: (id) => {
    try {
      return axiosClient.delete(baseUrl + id);
    } catch (error) {
      console.log(error);
    }
  },
};

export default useDepartment;
