import React, { Component } from 'react';
import { FooterContainer, FooterContent, FooterLogo, FooterTextWrapper, FooterMenu, FooterText } from './footer.style';
import LogoImage from "../../assets/Logo_text.png"; // 로고 이미지 경로 변경

class Footer extends Component {
  render() {
    return (
      <FooterContainer>
        {/* 로고와 텍스트를 하나의 그룹으로 묶음 */}
        <FooterContent>
          <FooterLogo>
            <img src={LogoImage} alt="Kick-on Logo" />
          </FooterLogo>

          <FooterTextWrapper>
            {/* 서비스 이용약관 및 개인정보처리방침 */}
            <FooterMenu>
              <a href="/terms">서비스 이용약관</a> | <a href="/privacy">개인정보처리방침</a>
            </FooterMenu>

            {/* 저작권 및 이메일 정보 */}
            <FooterText>
              Copyright ©️ 2025 Kick-on. All pictures cannot be copied without permission.
              &nbsp;&nbsp;&nbsp;&nbsp;
              E-mail: business.kickon@gmail.com
            </FooterText>
          </FooterTextWrapper>
        </FooterContent>
      </FooterContainer>
    );
  }
}

export default Footer;
