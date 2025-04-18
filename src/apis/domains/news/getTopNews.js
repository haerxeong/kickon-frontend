import axiosInstance from "../../axios-instance.js";

export const getTopNews = async () => {
    try {
        const response = await axiosInstance.get('/api/news/hot');

        if (!response.code.split('_').includes('SUCCESS')) {
            console.error(response);
            return response.message;
        }

        return response.data; // Return the top news data
    } catch (error) {
        console.error('탑 뉴스 리스트 가져오기 실패: ', error.toJSON());
        throw error; // Re-throw the error for further handling
    }
};