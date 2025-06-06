import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../features/modal/modalSlice";
import * as S from "./header.style";
import DarkLogoImage from "../../assets/logo_black.svg";
import LogoImage from "../../assets/logo_white.svg";
import LoginModal from "../LoginModal/loginModal.jsx";

const Header = ({ isDark }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const dispatch = useDispatch();

    const handleLoginClick = (e) => {
        e.preventDefault(); // 페이지 이동 방지
        dispatch(openLoginModal());
    };

    return (
        <>
            <S.HeaderWrapper isDark={isDark}>
                <S.Logo>
                    <Link to="/">
                        <img src={isDark ? LogoImage : DarkLogoImage} alt="Logo" />
                    </Link>
                </S.Logo>

                <S.NavItem
                    to="/news"
                    isDark={isDark}
                    currentPath={currentPath}
                    itemPath="/news"
                >
                    뉴스
                </S.NavItem>

                <S.NavItem
                    to="/community"
                    isDark={isDark}
                    currentPath={currentPath}
                    itemPath="/community"
                >
                    클럽 커뮤니티
                </S.NavItem>

                <S.NavItem
                    to="/market"
                    isDark={isDark}
                    currentPath={currentPath}
                    itemPath="/market"
                >
                    중고 거래
                </S.NavItem>

                <S.NavItem
                    to="/transferability"
                    isDark={isDark}
                    currentPath={currentPath}
                    itemPath="/transferability"
                >
                    이적 예측
                </S.NavItem>

                <S.LoginButton
                    as="button" // styled(Link) 대신 일반 버튼처럼 동작하게
                    currentPath={currentPath}
                    onClick={handleLoginClick}
                >
                    로그인
                </S.LoginButton>
            </S.HeaderWrapper>

            {/* 로그인 모달 자체는 로그인 상태 Redux에서 제어 */}
            <LoginModal />
        </>
    );
};

export default Header;