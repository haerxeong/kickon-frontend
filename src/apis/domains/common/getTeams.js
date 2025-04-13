import axiosInstance from "../../axios-instance.js";

/**
 * Fetches the list of teams based on league ID or keyword.
 *
 * @param {Object} params - Query parameters for the API call.
 * @param {number} params.league - The league ID to filter teams (required).
 * @param {string} [params.keyword] - The keyword to search for teams (optional).
 * @returns {Promise<Object>} - The response data containing the list of teams.
 */
export const getTeams = async ({ league, keyword }) => {
    try {
        const response = await axiosInstance.get('/api/team', {
            params: { league, keyword },
        });

        if (!response.code.split('_').includes('SUCCESS')) {
            console.error(response);
            return response.message;
        }

        return response.data; // Return the team data
    } catch (error) {
        console.error('팀 정보 가져오기 실패: ', error.toJSON());
        throw error; // Re-throw the error for further handling
    }
};