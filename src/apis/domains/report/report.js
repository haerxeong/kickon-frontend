import axiosInstance from '../../axios-instance';

// 게시글 신고 API
export const reportBoard = async (boardId, reason) => {
  try {
    const response = await axiosInstance.post('/api/report-board', {
      board: boardId,
      reason: reason
    });
    
    return response;
  } catch (error) {
    console.error('게시글 신고 실패: ', error);
    throw error;
  }
};

// 뉴스 신고 API
export const reportNews = async (newsId, reason) => {
  try {
    const response = await axiosInstance.post('/api/report-news', {
      news: newsId,
      reason: reason
    });
    
    return response;
  } catch (error) {
    console.error('뉴스 신고 실패: ', error);
    throw error;
  }
};
