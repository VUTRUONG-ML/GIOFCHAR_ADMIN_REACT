import axiosClient from "./axiosClient";
const foodsApi = {
  getFoods(signal) {
    return axiosClient.get("/foods/foodsAdmin", { signal });
  },
  createFood(formData) {
    return axiosClient.post("/foods", formData, {
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
