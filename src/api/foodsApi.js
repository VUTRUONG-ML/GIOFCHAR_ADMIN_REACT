import { mapVariants } from "../mappers/variants";
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
  getBestSelling(signal) {
    return axiosClient.get("/foods/best-selling", { signal });
  },
  getVariantsOfFood(foodId, signal) {
    return axiosClient.get(`/foods/${foodId}/variants`, { signal });
  },
};

export default foodsApi;
