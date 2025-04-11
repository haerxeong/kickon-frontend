import axiosInstance from "../../axios-instance.js";

export const getLeagues = async () => {
    try {
        const response = await axiosInstance.get('/api/league');

        if (!response.code.split('_').includes('SUCCESS')) {
            console.error(response);
            return response.message;
        }

        return response.data; // Return the league data
    } catch (error) {
        console.error('리그 정보 가져오기 실패: ', error.toJSON());
        throw error; // Re-throw the error for further handling
    }
};