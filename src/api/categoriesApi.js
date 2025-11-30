import axiosClient from "./axiosClient";
const categoriesApi = {
  getCategories(signal) {
    return axiosClient.get("/categories", { signal });
  },
};

export default categoriesApi;
