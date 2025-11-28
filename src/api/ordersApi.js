import axiosClient from "./axiosClient";
const ordersApi = {
  getOrders() {
    return axiosClient.get("/orders");
  },
  login(data) {
    return axiosClient.post("/auth/login", data);
  },
};

export default ordersApi;
