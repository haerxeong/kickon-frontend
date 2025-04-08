// createSlice를 사용하여 모달의 상태를 관리하는 슬라이스
// 여기서 모달의 열림/닫힘 상태를 정의하고, 이를 변경하는 액션들을 포함
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoginModalOpen: false, // 로그인 모달 열림/닫힘 상태
    isReportModalOpen: false,
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

const reportModalSlice = createSlice({
    name: "reportModal",
    initialState,
    reducers: {
        openReportModal: (state) => {
            state.isReportModalOpen = true;
        },
        closeReportModal: (state) => {
            state.isReportModalOpen = false;
        },
    },
});

export const { openLoginModal, closeLoginModal, toggleLoginModal } =
    loginModalSlice.actions;
export const { openReportModal, closeReportModal } =
    reportModalSlice.actions;

export const loginModalReducer = loginModalSlice.reducer;
export const reportModalReducer = reportModalSlice.reducer;