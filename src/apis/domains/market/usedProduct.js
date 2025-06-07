import axiosInstance from '../../axios-instance';

export const updateUsedProductStatus = async (usedProductPk, status) => {
  const response = await axiosInstance.patch(`/api/usedProduct/${usedProductPk}/status`, {
    status
  });
  return response.data;
}; 