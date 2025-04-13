import axiosInstance from "../../axios-instance.js";

/**
 * Fetches the list of posts based on the provided parameters.
 *
 * @param {Object} params - Query parameters for the API call.
 * @param {number} params.team - The team ID to filter posts (required).
 * @param {number} params.size - The number of posts per page (required).
 * @param {number} params.page - The page number to fetch (required).
 * @param {string} params.order - The order of posts, either "hot" or "recent" (required).
 * @returns {Promise<Object>} - The response data containing the list of posts.
 */
export const getBoardList = async ({ team, size, page, order }) => {
    try {
        const response = await axiosInstance.get('/api/board', {
            params: { team, size, page, order },
        });

        if (!response.code.split('_').includes('SUCCESS')) {
            console.error(response);
            return response.message;
        }

        return response.data; // Return the post list data
    } catch (error) {
        console.error('게시글 리스트 조회 실패: ', error.toJSON());
        throw error; // Re-throw the error for further handling
    }
};