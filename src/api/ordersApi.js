import axiosClient from "./axiosClient";
const ordersApi = {
  getOrders() {
    return axiosClient.get("/orders");
  },
  getOrderItems(orderId) {
    return axiosClient.get(`/orders/${orderId}/detail`);
  },
  updateOrderStatus(orderId, statusData) {
    return axiosClient.put(`/orders/${orderId}/status`, statusData);
  },
};

export default ordersApi;
