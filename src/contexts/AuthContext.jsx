import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData, accessToken) => {
    localStorage.setItem("access_token", accessToken);
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const value = { user, login, logout };
  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
