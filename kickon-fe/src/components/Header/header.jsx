import React from "react";
import { Link } from "react-router-dom";
import {
    HeaderWrapper,
    Logo,
    NavMenu,
    NavItem,
} from "./header.style";
import LogoImage from "../../assets/logo.svg"; // 로고 이미지 경로

const Header = () => {
    return (
        <HeaderWrapper>
            {/* 로고 */}
            <Logo>
                <Link to="/">
                    <img src={LogoImage} alt="KICK-ON Logo" />
                </Link>
            </Logo>

            {/* 네비게이션 메뉴 */}
            <NavMenu>
                <NavItem to="/news">뉴스</NavItem>
                <NavItem to="/community">클럽 커뮤니티</NavItem>
            </NavMenu>
        </HeaderWrapper>
    );
};

export default Header;
