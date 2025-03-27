import React from "react";
import { Link } from "react-router-dom";
import {
    HeaderWrapper,
    Logo,
    NavMenu,
    NavItem,
} from "./header.style";
import DarkLogoImage from "../../assets/logo_black.svg"; // 로고 이미지 경로
import LogoImage from "../../assets/logo_white.svg";

const Header = ({isDark}) => {
    return (
        <HeaderWrapper isDark={isDark}>
            {/* 로고 */}
            <Logo>
                <Link to="/">
                    <img src={isDark ? LogoImage : DarkLogoImage} alt="Logo" />
                </Link>
            </Logo>

            {/* 네비게이션 메뉴 */}
            <NavMenu>
                <NavItem to="/news" isDark={isDark}>뉴스</NavItem>
                <NavItem to="/community" isDark={isDark}>클럽 커뮤니티</NavItem>
            </NavMenu>
        </HeaderWrapper>
    );
};

export default Header;
