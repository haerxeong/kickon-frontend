import React, { Component } from 'react';
import { FooterContainer, FooterContent, FooterLogo, FooterTextWrapper, FooterMenu, FooterTextRow } from './footer.style';
import LogoImage from "../../assets/logo_text_black.png"; // 로고 이미지 경로 변경
import WhiteLogoImage from "../../assets/logo_text_white.svg"; // 로고 이미지 경로 변경

const Footer = ({ isDark }) => {
    return (
      <FooterContainer isDark={isDark}>
        {/* 로고와 텍스트를 하나의 그룹으로 묶음 */}
        <FooterContent>
          <FooterLogo>
            <img src={isDark ? WhiteLogoImage : LogoImage} alt="Footer Logo" />
          </FooterLogo>

          <FooterTextWrapper>
            {/* 서비스 이용약관 및 개인정보처리방침 */}
              <FooterMenu isDark={isDark}>
                  <a href="https://lunar-surf-03d.notion.site/20d71dde430d8035b15ae8d2bfd745dd?source=copy_link" target="_blank" rel="noopener noreferrer">
                      서비스 이용약관
                  </a>
                  <span className="divider">|</span>
                  <a href="https://lunar-surf-03d.notion.site/20d71dde430d80c78293c9bd782efb28?source=copy_link">개인정보처리방침</a>
              </FooterMenu>

            {/* 저작권 및 이메일 정보 (한 줄로 배치) */}
            <FooterTextRow isDark={isDark}>
              Copyright ©️ 2025 Kick-on. All pictures cannot be copied without permission.
              &nbsp;&nbsp;&nbsp;&nbsp; {/* 공백 추가 */}
              E-mail: business.kickon@gmail.com
            </FooterTextRow>
          </FooterTextWrapper>
        </FooterContent>
      </FooterContainer>
    );
}

export default Footer;
