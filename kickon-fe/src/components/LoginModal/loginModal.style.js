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
    width: 30rem;
    height: 30rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #FFF;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.40);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: '✕';
        font-size: 1.5rem;
        color: #8F8F8F;
    }
`;

export const LogoImage = styled.img`
    width: 17.5rem;
    height: 3.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 1.88rem;
`;

export const DescriptionText = styled.p`
    color: #000;
    text-align: center;
    //font-family: Pretendard;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.25rem;
    margin-bottom: 6.62rem;
`;

export const KakaoLoginButton = styled.button`
    display: flex;
    height: 3.125rem;
    padding: 0.6875rem 5.8125rem 0.6875rem 5.5rem;
    align-items: center;
    gap: 0.75rem;
    border-radius: 0.5rem;
    background: #FDE500;
    border: none;
    cursor: pointer;
    margin-bottom: 1.25rem;
`;

export const KakaoLogo = styled.img`
    width: 1.125rem;
    height: 1rem;
    flex-shrink: 0;
`;

export const KakaoLoginText = styled.span`
    color: #363636;
    text-align: center;
    //font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.75rem;
`;

export const NaverLoginButton = styled.button`
    display: flex;
    height: 3.125rem;
    padding: 0.6875rem 5.8125rem 0.6875rem 5.5rem;
    align-items: center;
    gap: 0.75rem;
    border-radius: 0.5rem;
    background: #00C73C;
    border: none;
    cursor: pointer;
`;

export const NaverLogo = styled.img`
    width: 1.625rem;
    height: 1.625rem;
`;

export const NaverLoginText = styled.span`
  color: #FFF;
  text-align: center;
  //font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.75rem;
`;