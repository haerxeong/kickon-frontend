// footer.style.js
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 13.125rem; /* 210px -> rem 변환 (210px ÷ 16 = 13.125rem) */
  padding: 0 46.4375rem 0 17.5rem; /* Figma 여백 (743px ÷ 16, 280px ÷ 16) */
  background-color: #fff; /* 배경색 */
`;

export const FooterLogo = styled.div`
  img {
    height: auto;
    max-height: 100%; /* 이미지가 영역을 초과하지 않도록 설정 */
    display: block;
  }
`;

export const FooterMenu = styled.nav`
  font-size: 0.875rem; /* 약 14px (14px ÷ 16 = 0.875rem) */
  margin-bottom: 0.5rem;

  a {
    text-decoration: none;
    color: #000; /* 검정색 텍스트 */
    margin-right: 0.625rem; /* 약간의 간격 추가 (10px ÷ 16 = 0.625rem) */

    &:hover {
      text-decoration: underline; /* 링크에 호버 효과 */
    }
  }
`;

export const FooterText = styled.p`
  font-size: 0.75rem; /* 약 12px (12px ÷ 16 = 0.75rem) */
  color: #666; /* 회색 텍스트 */
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: #f8f8f8; /* 배경색 */
`;

export const FooterTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: #f8f8f8; /* 배경색 */
`;
