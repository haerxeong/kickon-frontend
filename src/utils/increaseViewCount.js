import axiosInstance from '../apis/axios-instance';

/**
 * @param {"board" | "news"} type - 콘텐츠 타입
 * @param {number} id - 콘텐츠 ID
 * @returns {Promise<void>}
 */
export const increaseViewCount = async (type, id) => {
    try {
        const endpoint =
            type === 'board'
                ? '/api/board-view-history'
                : '/api/news-view-history';

        const payload =
            type === 'board'
                ? { board: id }
                : { news: id };

        await axiosInstance.post(endpoint, payload);
        console.log(`View count increased for ${type} ID: ${id}`);
    } catch (error) {
        console.error(`Failed to increase view count for ${type} ID: ${id}`, error);
    }
};