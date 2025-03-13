import React from "react";
import { Link } from "react-router-dom";
import {
    HeaderWrapper,
    Logo,
    NavMenu,
    NavItem,
} from "./header.style";

const Header = () => {
    return (
        <HeaderWrapper>
            <Logo>
                <Link to="/">KICK-ON</Link>
            </Logo>
            <NavMenu>
                <NavItem as={Link} to="/news">
                    뉴스
                </NavItem>
                <NavItem as={Link} to="/community">
                    팬 커뮤니티
                </NavItem>
            </NavMenu>
        </HeaderWrapper>
    );
};

export default Header;
