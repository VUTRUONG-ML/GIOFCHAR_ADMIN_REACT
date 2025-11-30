import axiosClient from "./axiosClient";
const foodsApi = {
  getFoods(signal) {
    return axiosClient.get("/foods/foodsAdmin", { signal });
  },
};

export default foodsApi;
