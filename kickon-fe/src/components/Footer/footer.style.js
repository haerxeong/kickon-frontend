// footer.style.js
import styled from 'styled-components';

export const FooterContainer = styled.footer`
    width: 100%;
    height: 13.125rem; /* 210px */
    background-color: #fff;
    margin-top: auto; /* 하단에 고정 */
`;

export const FooterContent = styled.div`
    display: flex;
    flex-direction: row; /* 로고와 텍스트를 가로로 배열 */
    align-items: center;
    justify-content: space-between;
    max-width: 1200px; /* 메인 콘텐츠와 동일한 너비 */
    height: 100%;
    margin: 0 auto; /* 중앙 정렬 */
    padding: 0 2rem;
`;

export const FooterLogo = styled.div`
    img {
        width: auto;
        height: 1rem; /* 로고 크기 조정 */
    }
`;

export const FooterTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 텍스트 왼쪽 정렬 */
`;

export const FooterMenu = styled.nav`
    font-size: 0.875rem; /* 14px */
    margin-bottom: 1rem;

    a {
        text-decoration: none;
        color: #000;
        margin-right: 0.625rem;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const FooterText = styled.p`
    font-size: 0.75rem; /* 12px */
    color: #666;
    line-height: 1.5;
    margin: 0;
`;