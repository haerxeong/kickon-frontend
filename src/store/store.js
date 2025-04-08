// redux의 상태 저장소.
// configureStore를 사용하여 loginModalSlice를 포함한 여러 슬라이스를 결합
import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from "../features/modal/modalSlice.js";

export const store = configureStore({
    reducer: {
        loginModal: loginModalReducer,
    },
});