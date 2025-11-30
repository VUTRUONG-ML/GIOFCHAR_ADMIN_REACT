import axiosClient from "./axiosClient";
const ordersApi = {
  getOrders(signal) {
    return axiosClient.get("/orders", { signal });
  },
  getOrderItems(orderId, signal) {
    return axiosClient.get(`/orders/${orderId}/detail`, { signal });
  },
  updateOrderStatus(orderId, statusData) {
    return axiosClient.put(`/orders/${orderId}/status`, statusData);
  },
};

export default ordersApi;
