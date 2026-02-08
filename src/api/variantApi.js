import axiosClient from "./axiosClient";

const variantApi = {
  deleteVariant(variantId) {
    return axiosClient.delete(`/variants/${variantId}`);
  },
  updateVariant(variantId, data) {
    return axiosClient.put(`/variants/${variantId}`, data);
  },
};
export default variantApi;
