import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./writeButton.style";
import { useAuthGuard } from "../../hooks/useAuthGuard.js"; // 경로 확인 필요

const WriteButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const requireAuth = useAuthGuard();

    const handleClick = () => {
        if (!requireAuth()) return;

        if (location.pathname.startsWith("/news")) {
            navigate("/news/write");
        } else if (location.pathname.startsWith("/community")) {
            navigate("/community/write");
        } else if (location.pathname.startsWith("/market")) {
            navigate("/market/write");
        }
    };

    return (
        <S.FloatingButton onClick={handleClick}>
            <S.Icon>
                <FiEdit2 />
            </S.Icon>
            <S.Text>새로운 글 작성하기</S.Text>
        </S.FloatingButton>
    );
};

export default WriteButton;