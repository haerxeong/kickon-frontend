import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 전체 컨테이너 왼쪽 정렬 */
  max-width: 100%;
  height: 10rem;
  padding: 0 20rem 0 10rem;
  background-color: ${(props) => (props.isDark ? "#363636" : "#fff")};
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center; /* 로고와 텍스트 수직 가운데 정렬 */
  justify-content: flex-start; /* 로고와 텍스트 왼쪽 정렬 */
  gap: 1rem; /* 로고와 텍스트 사이 간격 추가 */
`;

export const FooterLogo = styled.div`
  display: flex;
  margin-right: 2rem; /* 로고 오른쪽 여백 추가 */

  img {
    width: 7rem;
    height: auto;
    max-height: 100%; /* 이미지가 영역을 초과하지 않도록 설정 */
    display: block;
  }
`;

export const FooterTextWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 텍스트를 세로로 정렬 */
  color: ${(props) => (props.isDark ? "#F0F0F0" : "#666")};
`;

export const FooterMenu = styled.nav`
  font-size: 0.7rem; /* 약 14px (14px ÷ 16 = 0.875rem) */
  margin-bottom: 0.5rem;

  a {
    text-decoration: none;
    color: ${(props) => (props.isDark ? "#F0F0F0" : "#676767")};
    margin-right: 0.625rem; /* 항목 간 간격 추가 (10px ÷ 16 = 0.625rem) */

    &:hover {
      text-decoration: underline; /* 링크에 호버 효과 */
    }
  }
`;

export const FooterTextRow = styled.div`
  font-size: 0.75rem; /* 약 12px (12px ÷ 16 = 0.75rem) */
  color: ${(props) => (props.isDark ? "#F0F0F0" : "#666")};
`;
