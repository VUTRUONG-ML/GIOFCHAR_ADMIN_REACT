import axiosClient from "./axiosClient";
const foodsApi = {
  getFoods(signal) {
    return axiosClient.get("/foods/foodsAdmin", { signal });
  },
  deleteFood(foodId) {
    return axiosClient.delete(`/foods/${foodId}`);
  },
};

export default foodsApi;
