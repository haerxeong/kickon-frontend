import axiosInstance from '../../axios-instance';

export const updateUserProfile = async (userData) => {
  try {
    const response = await axiosInstance.patch('/api/user', userData);
    return response;
  } catch (error) {
    console.error('프로필 정보 수정 실패:', error);
    throw error;
  }
};
