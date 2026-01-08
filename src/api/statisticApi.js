import axiosClient from "./axiosClient";
const statistic = {
  getRevenue(range = 7, signal) {
    return axiosClient.get(`/statistic/revenue?range=${range}`, { signal });
  },
  getRecentOrders(signal) {
    return axiosClient.get(`/statistic/recent-orders`, { signal });
  },
  getLowStockProduct(signal) {
    return axiosClient.get(`/statistic/low-stock`, { signal });
  },
  getTopProduct(signal) {
    return axiosClient.get(`/statistic/top-products`, { signal });
  },
};

export default statistic;
