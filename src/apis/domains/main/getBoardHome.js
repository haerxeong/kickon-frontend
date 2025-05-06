import axiosInstance from '../../axios-instance';

export const getBoardHome = async () => {
  try {
    const response = await axiosInstance.get('/api/board/home');
    return response;
  } catch (error) {
    console.error('홈 게시글 목록 조회 실패:', error);
    throw error;
  }
};
