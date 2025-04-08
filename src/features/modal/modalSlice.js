// createSlice를 사용하여 모달의 상태를 관리하는 슬라이스
// 여기서 모달의 열림/닫힘 상태를 정의하고, 이를 변경하는 액션들을 포함
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoginModalOpen: false, // 로그인 모달 열림/닫힘 상태
};

const loginModalSlice = createSlice({
    name: "loginModal",
    initialState,
    reducers: {
        openLoginModal: (state) => {
            state.isLoginModalOpen = true; // 로그인 모달 열기
        },
        closeLoginModal: (state) => {
            state.isLoginModalOpen = false; // 로그인 모달 닫기
        },
        toggleLoginModal: (state) => {
            state.isLoginModalOpen = !state.isLoginModalOpen; // 로그인 모달 상태 토글
        },
    },
});

export const { openLoginModal, closeLoginModal, toggleLoginModal } =
    loginModalSlice.actions;

export default loginModalSlice.reducer;