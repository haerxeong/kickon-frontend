import axiosInstance from '../../axios-instance';

/**
 * 실제 시즌 리그 순위 데이터를 가져오는 함수
 * @param {Object} params - 요청 파라미터
 * @param {number} params.league - 리그 ID
 * @returns {Promise} 순위 데이터 응답
 */
export const getActualSeasonRanking = async (params) => {
  try {
    console.log('API 요청 파라미터:', params);
    const response = await axiosInstance.get('/api/actual-season-ranking', { params });
    console.log('API 응답:', response);
    
    // 응답 구조 확인
    if (response) {
      console.log('응답 타입:', typeof response);
      console.log('응답 키:', Object.keys(response));
      
      // 데이터 확인
      if (response.data) {
        console.log('데이터 타입:', typeof response.data);
        console.log('데이터 구조:', Array.isArray(response.data) ? '배열' : '객체');
      }
    }
    
    return response;
  } catch (error) {
    console.error('리그 순위 조회 실패 상세:', error.response || error);
    throw error;
  }
};

export const getLeagueList = async () => {
  try {
    console.log('리그 목록 요청 중...');
    const response = await axiosInstance.get('/api/league');
    console.log('리그 목록 응답:', response);
    
    return response;
  } catch (error) {
    console.error('리그 목록 조회 실패:', error.response || error);
    throw error;
  }
};

export const getGambleSeasonRanking = async (params) => {
  try {
    console.log('승부예측 순위 API 요청 파라미터:', params);
    const response = await axiosInstance.get('/api/gamble-season-ranking', { params });
    console.log('승부예측 순위 API 응답:', response);
    
    // 응답 구조 확인
    if (response) {
      console.log('응답 타입:', typeof response);
      console.log('응답 키:', Object.keys(response));
      
      // 데이터 확인
      if (response.data) {
        console.log('데이터 타입:', typeof response.data);
        console.log('데이터 구조:', Array.isArray(response.data) ? '배열' : '객체');
      }
    }
    
    return response;
  } catch (error) {
    console.error('승부예측 순위 조회 실패 상세:', error.response || error);
    throw error;
  }
};