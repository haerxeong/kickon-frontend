import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../features/modal/modalSlice";

/**
 * 로그인되어 있지 않으면 모달을 띄우고 false 반환
 * 로그인되어 있으면 true 반환
 */
export const useAuthGuard = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const dispatch = useDispatch();

    const requireAuth = () => {
        if (!isAuthenticated) {
            dispatch(openLoginModal());
            return false;
        }
        return true;
    };

    return requireAuth;
};