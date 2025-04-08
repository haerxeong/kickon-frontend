import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal } from "../../features/modal/modalSlice";
import {
    ModalOverlay,
    ModalContainer,
    CloseButton,
    LogoImage,
    DescriptionText,
    KakaoLoginButton,
    KakaoLogo,
    KakaoLoginText,
    NaverLoginButton,
    NaverLogo,
    NaverLoginText
} from "./loginModal.style";
import loginLogo from "../../assets/login_logo.svg";
import kakaoLogo from "../../assets/kakao.svg";
import naverLogo from "../../assets/naver.svg";

const LoginModal = () => {
    const isLoginModalOpen = useSelector((state) => state.loginModal.isLoginModalOpen);
    const dispatch = useDispatch();

    if (!isLoginModalOpen) return null;

    return (
        <ModalOverlay onClick={() => dispatch(closeLoginModal())}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={() => dispatch(closeLoginModal())} />
                <LogoImage src={loginLogo} alt="킥온 로고" />
                <DescriptionText>
                    로그인하고 킥온과 함께 <br />
                    좋아하는 축구팀 승부예측하러 가요!
                </DescriptionText>
                <KakaoLoginButton>
                    <KakaoLogo src={kakaoLogo} alt="카카오 로고" />
                    <KakaoLoginText>카카오로 로그인</KakaoLoginText>
                </KakaoLoginButton>
                <NaverLoginButton>
                    <NaverLogo src={naverLogo} alt="네이버 로고" />
                    <NaverLoginText>네이버로 로그인</NaverLoginText>
                </NaverLoginButton>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default LoginModal;