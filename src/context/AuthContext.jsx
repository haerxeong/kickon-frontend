import React, { createContext, useState, useEffect } from "react";
import { fetchUserInfo } from "../apis/domains/auth/fetchUserInfo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 인증 여부 로딩 완료 여부

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const refreshToken = localStorage.getItem("refreshToken");
      if (!token || !refreshToken) {
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchUserInfo();
        login(userData);
      } catch (err) {
        console.warn("토큰 유효하지 않음, 로그아웃 처리", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading }}>
        {!loading && children}
      </AuthContext.Provider>
  );
};

// 활용 방법: AuthContext 호출 후
// const { isAuthenticated, login } = useContext(AuthContext);