import axiosInstance from "../../axios-instance.js";

export const updateUserInfo = async (body) => {
	try {
		const token = localStorage.getItem("accessToken");
		const response = await axiosInstance.patch("/api/user", body, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.code?.includes('SUCCESS')) {
			console.error(response);
			return response.message;
		}

		return response;
	} catch (error) {
		console.error("유저 정보 수정 실패: ", error);
		throw error;
	}
};