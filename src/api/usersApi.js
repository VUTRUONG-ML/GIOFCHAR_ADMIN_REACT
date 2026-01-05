import axiosClient from "./axiosClient";
const usersApi = {
  getUsers(signal) {
    return axiosClient.get("/users", { signal });
  },
  updateActiveUser(active, userId) {
    return axiosClient.put(`/users/${userId}`, active);
  },
  getOverView(signal) {
    return axiosClient.get("/users/stats/overviewCount", { signal });
  },
};

export default usersApi;
