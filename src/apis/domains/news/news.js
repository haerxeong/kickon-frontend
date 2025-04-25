import axiosInstance from '../../axios-instance';

/**
 * 뉴스 상세 정보를 가져오는 함수
 * @param {number} newsPk - 뉴스 게시글 PK
 * @returns {Promise} 뉴스 상세 데이터 응답
 */
export const getNewsDetail = async (newsPk) => {
  try {
    console.log('뉴스 상세 조회 요청:', newsPk);
    const response = await axiosInstance.get(`/api/news/${newsPk}`);
    console.log('뉴스 상세 응답:', response);
    
    return response;
  } catch (error) {
    console.error('뉴스 상세 조회 실패:', error.response || error);
    throw error;
  }
};
