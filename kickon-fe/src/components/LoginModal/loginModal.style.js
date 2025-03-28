import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    position: relative;
    width: 26.33rem;
    height: 26.5rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #FFF;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.40);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 0.67rem;
    right: 0.67rem;
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: '✕';
        font-size: 1rem;
        color: #8F8F8F;
    }
`;

export const LogoImage = styled.img`
    width: 14rem;
    height: 3.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 1.5rem;
`;

export const DescriptionText = styled.p`
    color: #000;
    text-align: center;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.8rem;
    margin-bottom: 6rem;
`;

export const KakaoLoginButton = styled.button`
    display: flex;
    height: 2.5rem;
    padding: 0.6rem 4.5rem;
    align-items: center;
    gap: 0.6rem;
    border-radius: 0.5rem;
    background: #FDE500;
    border: none;
    cursor: pointer;
    margin-bottom: 1rem;
`;

export const KakaoLogo = styled.img`
    width: 1rem;
    height: 0.9rem;
    flex-shrink: 0;
`;

export const KakaoLoginText = styled.span`
    color: #363636;
    text-align: center;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.4rem;
`;

export const NaverLoginButton = styled.button`
    display: flex;
    height: 2.5rem;
    padding: 0.6rem 4.5rem;
    align-items: center;
    gap: 0.6rem;
    border-radius: 0.5rem;
    background: #00C73C;
    border: none;
    cursor: pointer;
`;

export const NaverLogo = styled.img`
    width: 1.3rem;
    height: 1.3rem;
`;

export const NaverLoginText = styled.span`
    color: #FFF;
    text-align: center;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.4rem;
`;