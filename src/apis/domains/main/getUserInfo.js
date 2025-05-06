// src/apis/domains/main/getUserInfo.js
import axiosInstance from '../../axios-instance';

export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    
    // 토큰이 없으면 로그인되지 않은 상태로 간주
    if (!token) {
      return { isLoggedIn: false };
    }
    
    const response = await axiosInstance.get('/api/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    // 성공적으로 사용자 정보를 가져왔을 때
    if (response.code === "GET_SUCCESS") {
      return { 
        isLoggedIn: true,
        userData: response.data 
      };
    } else {
      // API 호출은 성공했지만 응답 코드가 성공이 아닌 경우
      return { isLoggedIn: false };
    }
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    // 에러 발생 시 로그인되지 않은 상태로 간주
    return { isLoggedIn: false };
  }
};
