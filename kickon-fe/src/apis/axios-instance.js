import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
    baseURL: import.meta.env.VITE_BASE_URL,
})

export default axiosInstance;
// -> axiosInstance.get('/api/news') 이런식으로 사용