import axiosInstance from "../../axios-instance.js";

export const updateUserInfo = async (body) => {
	try {
		const response = await axiosInstance.patch('/api/user', body);

		if (!response.code.split('_').includes('SUCCESS')) {
			console.error(response);
			return response.message;
		}
		return response;
	} catch (error) {
		console.error('유저 정보 수정 실패: ', error);
	}
};