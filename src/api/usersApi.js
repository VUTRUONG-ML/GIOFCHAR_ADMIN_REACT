import axiosClient from "./axiosClient";
const usersApi = {
  getUsers(signal) {
    return axiosClient.get("/users", { signal });
  },
};

export default usersApi;
