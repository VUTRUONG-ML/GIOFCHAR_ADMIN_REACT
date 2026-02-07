import axiosClient from "./axiosClient";

const variantApi = {
  deleteVariant(variantId) {
    return axiosClient.post(`/variants/${variantId}`);
  },
};
export default variantApi;
