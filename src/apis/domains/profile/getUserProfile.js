import axiosInstance from '../../axios-instance';

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/user/me');
    return response;
  } catch (error) {
    console.error('프로필 정보 조회 실패:', error);
    throw error;
  }
};
