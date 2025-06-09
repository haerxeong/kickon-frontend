import React, {useContext, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../features/modal/modalSlice";
import * as S from "./header.style";
import DarkLogoImage from "../../assets/logo_black.svg";
import LogoImage from "../../assets/logo_white.svg";
import LoginModal from "../LoginModal/loginModal.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

const Header = ({ isDark }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const dispatch = useDispatch();
    const { isAuthenticated, logout } = useContext(AuthContext);

    useEffect(() => {
        console.log("isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    const handleLoginClick = (e) => {
        e.preventDefault(); // 페이지 이동 방지
        dispatch(openLoginModal());
    };

    const handleLogoutClick = () => {
        logout();
        console.log("로그아웃 처리 완료");
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
                    onClick={(e) => {
                        if (!isAuthenticated) {
                            e.preventDefault(); // 링크 이동 방지
                            dispatch(openLoginModal()); // 로그인 모달 열기
                        }
                    }}
                >
                    클럽 커뮤니티
                </S.NavItem>

                <S.NavItem
                    to="/market"
                    isDark={isDark}
                    currentPath={currentPath}
                    itemPath="/market"
                    onClick={(e) => {
                        if (!isAuthenticated) {
                            e.preventDefault(); // 링크 이동 방지
                            dispatch(openLoginModal()); // 로그인 모달 열기
                        }
                    }}
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

                {!isAuthenticated && (
                    <S.LoginButton
                        currentPath={currentPath}
                        onClick={handleLoginClick}
                    >
                        로그인
                    </S.LoginButton>
                )}
                {isAuthenticated && (
                    <S.LoginButton
                        currentPath={currentPath}
                        onClick={handleLogoutClick}
                    >
                        로그아웃
                    </S.LoginButton>
                )}
            </S.HeaderWrapper>

            <LoginModal />
        </>
    );
};

export default Header;