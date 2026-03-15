import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";
import { authService } from "../utils/authService";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, accessToken) => {
    localStorage.setItem("access_token", accessToken);
    setUser(userData);
  };
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.log(">>> logout error:", error.message);
    }
    localStorage.removeItem("access_token");
    setUser(null);
  };

  useEffect(() => {
    const loadAccount = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await authApi.getProfile();
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("access_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadAccount();
    authService.setLogout(logout);
  }, []);

  const value = { user, login, logout, loading, setLoading };
  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
