import axiosClient from "./axiosClient";
const statistic = {
  getRevenue(range = 7, signal) {
    return axiosClient.get(`/statistic/revenue?range=${range}`, { signal });
  },
};

export default statistic;
