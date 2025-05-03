import axiosInstance from "../../axios-instance.js";

export const fetchUserInfo = async () => {
    try {
        const res = await axiosInstance.get("/api/user/me");
        return res.data;
    } catch (error) {
        console.error("유저 정보 조회 실패:", error);
        return null;
    }
};