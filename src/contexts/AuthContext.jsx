import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, accessToken) => {
    localStorage.setItem("access_token", accessToken);
    setUser(userData);
  };
  const logout = () => {
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

        console.log("check getme", response.data.user);
        setUser(response.data?.user);
      } catch (error) {
        localStorage.removeItem("access_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadAccount();
  }, []);

  const value = { user, login, logout, loading, setLoading };
  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
