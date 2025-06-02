import axiosInstance from "../../axios-instance";

export const getItemDetail = async (pk) => {
    try {
        const response = await axiosInstance.get(`/api/usedProduct/${pk}`);
        if (response?.code === "GET_SUCCESS") {
            return { data: response.data, error: null };
        } else {
            console.error("Unexpected API format:", response);
            return { data: null, error: "INVALID_RESPONSE" };
        }
    } catch (error) {
        console.error("중고상품 상세 조회 실패:", error);
        return { data: null, error };
    }
};