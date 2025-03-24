import styled from 'styled-components';

export const FooterContainer = styled.footer`
<<<<<<< HEAD
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 전체 컨테이너 왼쪽 정렬 */
  width: 100%;
  height: 13.125rem; /* Figma 기준 높이 */
  padding: 0 5rem; /* 전체 패딩 조정 (왼쪽과 오른쪽 여백 줄임) */
  background-color: #fff;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center; /* 로고와 텍스트 수직 가운데 정렬 */
  justify-content: flex-start; /* 로고와 텍스트 왼쪽 정렬 */
`;

export const FooterLogo = styled.div`
  margin-right: 2rem; /* 로고 오른쪽 여백 추가 */
  
  img {
    height: auto;
    max-height: 100%; /* 이미지가 영역을 초과하지 않도록 설정 */
    display: block;
  }
`;

export const FooterTextWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 텍스트를 세로로 정렬 */
`;

export const FooterMenu = styled.nav`
  font-size: 0.875rem; /* 약 14px (14px ÷ 16 = 0.875rem) */
  margin-bottom: 0.5rem;

  a {
    text-decoration: none;
    color: #000; /* 검정색 텍스트 */
    margin-right: 0.625rem; /* 항목 간 간격 추가 (10px ÷ 16 = 0.625rem) */

    &:hover {
      text-decoration: underline; /* 링크에 호버 효과 */
    }
  }
`;

export const FooterText = styled.p`
  font-size: 0.75rem; /* 약 12px (12px ÷ 16 = 0.75rem) */
  color: #666; /* 회색 텍스트 */
`;
=======
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
    max-width: 75rem; /* 1200px */
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
>>>>>>> f96c0207ef245ec1b5b51a79f4c0813b02cb309e
