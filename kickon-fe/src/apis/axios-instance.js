import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
// 토큰 재발급
export const postNewToken = async (body) => {
	try {
		const response = await axiosInstance.post('/auth/refresh', body);

		if (!response.code.split('_').includes('SUCCESS')) {
			console.error(response);
			return response.message;
		}
		return response.data;
	} catch (error) {
		console.error('토큰 발급 실패: ', error);
	}
};

axiosInstance.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		const originalRequest = error.config;

		if (error.response) {
			// 인증 실패 시
			if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
				originalRequest._retry = true; // 무한 루프 방지

				const prevRefreshToken = localStorage.getItem('refreshToken');

				// 리프레시 토큰이 있으면 토큰 재발급 후 다시 시도
				if (prevRefreshToken) {
					const newTokenResponse = await postNewToken({ refreshToken: prevRefreshToken });

					// 토큰 재발급 성공
					if (newTokenResponse && typeof newTokenResponse !== 'string') {
						// 새 토큰 저장
						localStorage.setItem('refreshToken', newTokenResponse.refreshToken);
						localStorage.setItem('accessToken', newTokenResponse.accessToken);

						// 요청 재시도
						originalRequest.headers.Authorization = `Bearer ${newTokenResponse.accessToken}`;
						return axiosInstance(originalRequest);
					} else {
						// 토큰 재발급 실패
						localStorage.clear();
					}
				}
			}

			// 그 외 서버 응답이 있는 오류 (FailResponse)
			return error.response.data;
		}
		return Promise.reject(error); // 기타 오류
	},
);

export default axiosInstance;

/*** 
 * [사용예제]
 * 아래 참고해서 각 도메인 폴더 만들고 사용할 api 정리하시면 될 것 같습니다~!
***/

// 유저 조회
// export const getUserInfo = async () => {
// 	try {
// 		const response = await axiosInstance.get<GetUserInfoResponse | FailResponse>('/api/user/me');

// 		if (!response.code.split('_').includes('SUCCESS')) {
// 			console.error(response);
// 			return response.message;
// 		}
// 		return response;
// 	} catch (error) {
// 		console.error('유저 정보 조회 실패: ', error);
// 	}
// };

// 유저 정보 수정
// export const updateUserInfo = async (body: UpdateUserInfoRequest) => {
// 	try {
// 		const response = await axiosInstance.patch<EmptySuccessResponse | FailResponse>('/api/user', body);

// 		if (!response.code.split('_').includes('SUCCESS')) {
// 			console.error(response);
// 			return response.message;
// 		}
// 		return response;
// 	} catch (error) {
// 		console.error('유저 정보 수정 실패: ', error);
// 	}
// };
