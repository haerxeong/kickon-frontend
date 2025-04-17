import axiosInstance from "../../axios-instance.js";

export const fetchMatchData = async (league, status) => {
    try {
        const response = await axiosInstance.get('/api/game', {
            params: {
                league: 1,
                status
            }
        });

        console.log(`${status} 매치리스트 API 응답:`, response);

        // Check if response has a code property and handle success/error
        if (response.data && response.data.code && !response.data.code.split('_').includes('SUCCESS')) {
            console.error(response.data);
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        console.error(`${status} 매치리스트 가져오기 실패:`, error);
        throw error;
    }
};