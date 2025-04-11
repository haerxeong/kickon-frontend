import axiosInstance from "../../axios-instance.js";

export const updatePrivacyAgreement = async (body) => {
    try {
        const response = await axiosInstance.patch('/api/user/privacy', body);

        if (!response.code.split('_').includes('SUCCESS')) {
            console.error(response);
            return response.message;
        }
        return response;
    } catch (error) {
        console.error('Failed to update privacy agreement: ', error);
        throw error;
    }
};