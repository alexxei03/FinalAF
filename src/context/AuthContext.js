// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost, apiGet } from "../apiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  // Пример login с использованием API
  const login = async (credentials) => {
    // Отправляем POST запрос на /auth/login/
    const response = await apiPost("/auth/login/", credentials);
    if (response.access && response.refresh) {
      setAccessToken(response.access);
      localStorage.setItem("accessToken", response.access);
      setUser(response.user);
      navigate("/profile");
    } else {
      throw new Error("Ошибка авторизации");
    }
  };

  const logout = () => {
    // Можно реализовать вызов API для выхода (например, blacklist refresh-токена)
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    if (accessToken) {
      // Получаем данные пользователя через API
      apiGet("/auth/user/").then(data => setUser(data)).catch(err => console.error(err));
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
