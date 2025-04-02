import styled from "styled-components";
import MoreSvg from "../../assets/more.png";

export const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  width: 30rem;
  padding: 1.875rem 1rem 1.5rem 1rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid var(--Black-black_300, #DCDCDC);
  background: var(--sub1, #FFF);
`;

export const NewsItemsWrapper = styled.div`
  width: 100%;
  
  /* 첫 번째 아이템을 제외한 모든 아이템에 상단 간격 추가 */
  & > div + div {
    margin-top: 1.5rem;
  }
  
  /* 마지막 아이템의 하단 테두리 제거 */
  & > div:last-child {
    border-bottom: none;
  }
`;

export const NewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
  font-family: "Pretendard";
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25rem;
  color: black;
  .title {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    span:nth-child(2) {
      color: #d91920;
    }
  }
`;

export const MoreLink = styled.a`
  color: var(--Black-black_700, #676767);
  text-align: right;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const MoreIcon = styled.div`
  width: 1.125rem;
  height: 1.125rem;
  background-image: url(${MoreSvg});
  background-size: contain;
  background-repeat: no-repeat;
`;
