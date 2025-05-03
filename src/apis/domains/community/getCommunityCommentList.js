import axiosInstance from "../../axios-instance.js";

export const getCommunityCommentList = async ({ board, size, page }) => {
    try {
        const response = await axiosInstance.get('/api/board-reply', {
            params: { board, size, page },
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
        console.error('커뮤니티 댓글 리스트 조회 실패: ', error);
        return { data: [], meta: { totalPages: 1 } }; // Return default structure on error
    }
};