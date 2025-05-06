import axiosInstance from '../../axios-instance';

export const getHomeNewsList = async (type = ' ') => {
  try {
    const response = await axiosInstance.get('/api/news/home', {
      params: { type }
    });
    return response.data;
  } catch (error) {
    console.error('뉴스 리스트 조회 실패:', error);
    throw error;
  }
};
