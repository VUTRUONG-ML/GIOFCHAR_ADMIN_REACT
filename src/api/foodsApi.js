import axiosClient from "./axiosClient";
const foodsApi = {
  getFoods(signal) {
    return axiosClient.get("/foods/", { signal });
  },
  getFood(foodId, signal) {
    return axiosClient.get(`/foods/${foodId}`, { signal });
  },
  createFood(formData) {
    return axiosClient.post("/foods", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateFood(formData, foodId) {
    return axiosClient.put(`/foods/${foodId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteFood(foodId) {
    return axiosClient.delete(`/foods/${foodId}`);
  },
};

export default foodsApi;
