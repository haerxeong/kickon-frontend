import React, { createContext, useState, useEffect } from "react";
import { fetchUserInfo } from "../apis/domains/auth/fetchUserInfo";
import {useLeagueTeamStore} from "../store/useLeagueTeamStore.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 인증 여부 로딩 완료 여부

  const login = (userData, tokens) => {
    setUser(userData);
    setIsAuthenticated(true);

    // accessToken, refreshToken이 넘어오면 저장
    if (tokens?.accessToken && tokens?.refreshToken) {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }

    // 응원팀 저장
    if (userData?.teamPk && userData?.teamName && userData?.leaguePk && userData?.leagueName) {
      useLeagueTeamStore.getState().setSelectedTeam({
        pk: userData.teamPk,
        nameKr: userData.teamName,
        leaguePk: userData.leaguePk,
      });

      useLeagueTeamStore.getState().setSelectedLeague({
        pk: userData.leaguePk,
        nameKr: userData.leagueName,
      });
    } else {
      useLeagueTeamStore.getState().reset();
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
    useLeagueTeamStore.getState().reset();
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
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

    checkAuth(); // Promise 무시 경고는 신경 안 써도 OK (top-level await 없으므로)
  }, []);

  return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading }}>
        {!loading && children}
      </AuthContext.Provider>
  );
};

export { AuthProvider };

// 활용 방법: AuthContext 호출 후
// const { isAuthenticated, login } = useContext(AuthContext);