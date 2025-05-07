import axiosInstance from "../../axios-instance.js";

export const getProfilecard = async () => {
    try {
        const response = await axiosInstance.get('/api/user/me');

        console.log('API 응답:', response);

        if (!response.code.split('_').includes('SUCCESS')) {
            console.error(response);
            return response.message;
        }

        return response.data; // Return the Profile data
    } catch (error) {
        console.error('유저 정보 가져오기 실패: ', error);
        throw error; // Re-throw the error for further handling
    }
};