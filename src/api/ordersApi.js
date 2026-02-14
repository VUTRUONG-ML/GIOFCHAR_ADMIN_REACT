import axiosClient from "./axiosClient";
const ordersApi = {
  getOrders(signal) {
    return axiosClient.get("/orders", { signal });
  },
  getOrderItems(orderId, signal) {
    return axiosClient.get(`/orders/${orderId}/detail`, { signal });
  },
  updateOrderStatus(orderId, statusData) {
    return axiosClient.patch(`/orders/${orderId}/status`, statusData);
  },
  getOverviewCount(signal) {
    return axiosClient.get("/orders/stats/overviewCount", { signal });
  },
  getOverviewRevenue(signal) {
    return axiosClient.get("/orders/stats/overviewRevenue", { signal });
  },
};

export default ordersApi;
