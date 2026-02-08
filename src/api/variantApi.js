import axiosClient from "./axiosClient";

const variantApi = {
  deleteVariant(variantId) {
    return axiosClient.delete(`/variants/${variantId}`);
  },
};
export default variantApi;
