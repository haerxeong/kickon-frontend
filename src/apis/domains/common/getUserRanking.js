import axiosInstance from "../../axios-instance.js";

export const getUserRanking = async () => {
    try {
        const response = await axiosInstance.get('/api/user-point-event/ranking');

        console.log('Ranking API 응답:', response);

        // Return default values if the ranking was not found
        if (response.code === "NOT_FOUND_USER_POINT_RANKING") {
            console.log('유저 랭킹 정보 없음, 기본값 사용');
            return {
                point: 0,
                teamLanking: "-"
            };
        }

        if (!response.code.split('_').includes('SUCCESS')) {
            console.error(response);
            throw new Error(response.message);
        }

        return {
            point: response.data.point || 0,
            teamLanking: response.data.teamLanking || "-"
        };
    } catch (error) {
        console.error('유저 랭킹 정보 가져오기 실패: ', error.toJSON());
        // Return default values for any API error
        return {
            point: 0,
            teamLanking: "-"
        };
    }
};