// apis/domains/common/patchGamble.js
import axiosInstance from "../../axios-instance.js";

/**
 * 승부예측 결과를 PATCH(수정)
 * @param {string} gambleId - 기존 예측의 고유 ID (myGambleResult.gamble)
 * @param {number} predictedHomeScore
 * @param {number} predictedAwayScore
 */
export const patchMatchPrediction = async (gambleId, predictedHomeScore, predictedAwayScore) => {
    try {
        const body = {
            gamble: gambleId,
            predictedHomeScore,
            predictedAwayScore
        };
        const response = await axiosInstance.patch('/api/user-game-gamble', body);
        if (!response.code.split('_').includes('SUCCESS')) {
            console.error(response);
            return response.message;
        }
        return response.data;
    } catch (error) {
        console.error('예측 결과 수정 실패:', error);
        return '예측 결과 수정에 실패했습니다.';
    }
};
