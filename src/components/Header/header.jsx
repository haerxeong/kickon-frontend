import React from "react";
import { Link, useLocation } from "react-router-dom";
import * as S from "./header.style";
import DarkLogoImage from "../../assets/logo_black.svg"; // 로고 이미지 경로
import LogoImage from "../../assets/logo_white.svg";

const Header = ({ isDark }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
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

      <S.LoginButton to="/login" currentPath={currentPath}>
        로그인
      </S.LoginButton>
    </S.HeaderWrapper>
  );
};

export default Header;
