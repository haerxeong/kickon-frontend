import axiosInstance from '../../axios-instance';

/**
 * 게시글 상세 정보를 가져오는 함수
 * @param {number} boardPk - 게시글 PK
 * @returns {Promise} 게시글 상세 데이터 응답
 */
export const getBoardDetail = async (boardPk) => {
  try {
    console.log('게시글 상세 조회 요청:', boardPk);
    const response = await axiosInstance.get(`/api/board/${boardPk}`);
    console.log('게시글 상세 응답:', response);
    
    return response;
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error.response || error);
    throw error;
  }
};
