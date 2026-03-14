import axiosClient from "./axiosClient";
const authApi = {
  login(data) {
    return axiosClient.post("/auth/login", data);
  },
  getProfile() {
    return axiosClient.get("/auth/account");
  },
  refreshToken() {
    return axiosClient.post("/auth/refresh");
  },
};
export default authApi;

let initGetRefreshToken = null;
export const ensureRefreshToken = async () => {
  if (!initGetRefreshToken) {
    initGetRefreshToken = authApi
      .refreshToken()
      .then((res) => localStorage.setItem("access_token", res.data.accessToken))
      .finally(() => {
        initGetRefreshToken = null;
      });
  }
  return initGetRefreshToken;
};
