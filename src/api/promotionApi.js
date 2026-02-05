import axiosClient from "./axiosClient";
const promoApi = {
  getPromotions(signal) {
    return axiosClient.get("/promotions", { signal });
  },
  updateActivePromotion(promotionId, active) {
    return axiosClient.patch(`/promotions/${promotionId}/active`, active);
  },
  updatePromotion(promotionId, data) {
    return axiosClient.put(`/promotions/${promotionId}`, data);
  },
};
export default promoApi;
