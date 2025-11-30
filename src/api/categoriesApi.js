import axiosClient from "./axiosClient";
const categoriesApi = {
  getCategories(signal) {
    return axiosClient.get("/categories", { signal });
  },
  deleteCategory(categoryId) {
    return axiosClient.delete(`/categories/${categoryId}`);
  },
};

export default categoriesApi;
