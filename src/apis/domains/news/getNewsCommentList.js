import axiosInstance from "../../axios-instance.js";

export const getNewsCommentList = async ({ news, size, page }) => {
    try {
        const response = await axiosInstance.get('/api/news-reply', {
            params: { news, size, page },
        });

        console.log('API Response:', response);

        // Validate the response structure
        if (response?.code === 'GET_SUCCESS') {
            return response;
        } else {
            console.error('Unexpected response format:', response.data);
            return { data: [], meta: { totalPages: 1 } }; // Return default structure
        }
    } catch (error) {
        console.error('뉴스 댓글 리스트 조회 실패: ', error);
        return { data: [], meta: { totalPages: 1 } }; // Return default structure on error
    }
};