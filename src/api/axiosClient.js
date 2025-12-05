import axios from "axios";

import { toast } from "react-toastify";
import { navigateTo } from "../utils/navigationService";
import { authService } from "../utils/authService";

const defaultOptions = {
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosClient = axios.create(defaultOptions);

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      throw error;
    }

    const status = error.response.status;
    const message = error.response.data?.message || "Đã có lỗi xảy ra";

    switch (status) {
      case 400:
        console.warn("Bad Request:", message);
        break;
      case 401:
        console.warn("Unauthorized", message);
        authService.logout();
        navigateTo("/auth");
        break;
      case 403:
        console.warn("Forbidden", message);
        break;
      case 404:
        console.warn("API not found", message);
        break;
      case 500:
        console.warn("Server error");
        break;
      default:
        console.warn("Error", message);
    }
    toast.error(message);
    // ui toast error
    // Nếu return error thì nó vào try lúc nhận response còn nếu throw thì vào catch
    throw error;
  }
);
export default axiosClient;
