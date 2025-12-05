import axiosClient from "./axiosClient";
const categoriesApi = {
  getCategories(signal) {
    return axiosClient.get("/categories", { signal });
  },
  createCategory(data) {
    // categoryName, categoryDescription
    return axiosClient.post("/categories", data);
  },
  updateCategory(categoryId, dataUpdate) {
    return axiosClient.put(`/categories/${categoryId}`, dataUpdate);
  },
  deleteCategory(categoryId) {
    return axiosClient.delete(`/categories/${categoryId}`);
  },
};

export default categoriesApi;
