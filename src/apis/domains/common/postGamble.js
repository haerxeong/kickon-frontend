import axiosInstance from "../../axios-instance.js";

/**
 * 승부예측 결과를 서버에 제출
 * @param {number} gameId - 예측할 경기의 고유 ID
 * @param {number} predictedHomeScore - 홈팀 예측 점수 (CountDisplay 0)
 * @param {number} predictedAwayScore - 어웨이팀 예측 점수 (CountDisplay 2)
 * @returns {Promise<object|string>} 서버 응답 데이터 또는 에러 메시지
 */
export const postMatchPrediction = async (gameId, predictedHomeScore, predictedAwayScore) => {
    try {
        const body = {
            game: gameId,
            predictedHomeScore,
            predictedAwayScore
        };

        const response = await axiosInstance.post('/api/user-game-gamble', body);

        // 응답 코드가 SUCCESS가 아니면 에러 메시지 반환
        if (!response.code.split('_').includes('SUCCESS')) {
            console.error(response);
            return response.message;
        }
        return response.data;
    } catch (error) {
        console.error('예측 결과 제출 실패:', error);
        return '예측 결과 제출에 실패했습니다.';
    }
};
