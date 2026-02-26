import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("cartlyUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("cartlyUser", JSON.stringify(data));
    setUser(data);
  };

  const register = async (name, email, password) => {
    await API.post("/auth/register", {
      name,
      email,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem("cartlyUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
