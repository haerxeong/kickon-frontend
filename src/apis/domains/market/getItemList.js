import axiosInstance from "../../axios-instance.js";

export const getItemList = async ({ size = 6, page = 1 }) => {
    try {
        const response = await axiosInstance.get('/api/usedProduct', {
            params: { size, page },
        });

        if (response?.code === 'GET_SUCCESS') {
            console.log('API 응답:', response);
            return {
                items: response.data, // 실제 상품 리스트
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