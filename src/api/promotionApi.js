import axiosClient from "./axiosClient";
const promoApi = {
  getPromotions(signal) {
    return axiosClient.get("/promotions", { signal });
  },
};
export default promoApi;
