import resources from "@/assets/js/resource";
import axios from "axios";
import queryString from "query-string";
import state from "../store";
import enumMISA from "../assets/js/enum";

/**
 * Config axios

 */
const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: {
    encode: queryString.parse,
    serialize: (params) => queryString.stringify(params),
  },
});

/**
 * Config response

 */
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log("Lỗi", error);
    // Xử lý các lỗi của response
    if (error.response) {
      // Xử lý các lỗi từ phía server
      if (error.response.status === 401) {
        toastMessage(resources.vi.errorMessageAPI.ERROR_AUTHENTICATE);
      }
    } else if (error.request) {
      // Xử lý các lỗi từ phía client
      if (error.code === enumMISA.ERROR_REQUEST.ERR_NETWORK) {
        toastMessage(resources.vi.errorMessageAPI.ERROR_NETWORK);
      }
    } else {
      toastMessage(resources.vi.errorMessageAPI.ERROR_SERVER);
    }
    // Xử lý xóa toast
    setTimeout(async () => {
      state.state.toastMessage.splice(state.state.toastMessage.length - 1, 1);
    }, 4000); // delay
    return Promise.reject(error);
    // throw error;
  }
);

const toastMessage = function (msg) {
  state.state.toastMessage.unshift(resources.vi.TOAST_MESSAGE.ERROR(msg));
};

export default axiosClient;
