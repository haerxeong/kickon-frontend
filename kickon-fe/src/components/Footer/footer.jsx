import React, { Component } from 'react';
import { FooterContainer, FooterContent, FooterLogo, FooterTextWrapper, FooterMenu, FooterText } from './footer.style';
import LogoImage from "../../assets/Logo.svg"; // 로고 이미지 경로

class Footer extends Component {
    render() {
        return (
            <FooterContainer>
                <FooterContent>
                    {/* 로고 */}
                    <FooterLogo>
                        <img src={LogoImage} alt="Kick-On Logo" />
                    </FooterLogo>

                    {/* 텍스트와 메뉴 */}
                    <FooterTextWrapper>
                        <FooterMenu>
                            <a href="#">서비스 이용약관</a> | <a href="#">개인정보처리방침</a>
                        </FooterMenu>
                        <FooterText>
                            Copyright 2025. Kick-on. All pictures cannot be copied without permission
                            &nbsp;&nbsp; E-mail: business.kickon@gmail.com
                        </FooterText>
                    </FooterTextWrapper>
                </FooterContent>
            </FooterContainer>
        );
    }
}

export default Footer;