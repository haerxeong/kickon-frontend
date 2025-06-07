import axiosInstance from "../../axios-instance.js";

export const getItemList = async ({ size = 6, page = 1, team }) => {
    try {
        const params = {
            size,
            page,
            ...(team !== undefined && { team })
        };

        const response = await axiosInstance.get('/api/usedProduct', { params });

        if (response?.code === 'GET_SUCCESS') {
            return {
                items: response.data,
                totalPages: response.meta?.totalPages || 1,
            };
        } else {
            console.error('Unexpected API format', response);
            return { items: [], totalPages: 1 };
        }
    } catch (error) {
        console.error('중고 상품 리스트 조회 실패:', error);
        return { items: [], totalPages: 1 };
    }
};