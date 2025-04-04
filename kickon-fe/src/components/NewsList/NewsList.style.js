import styled from "styled-components";
import MoreSvg from "../../assets/more.png";

export const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  width: 30rem;
  padding: 1.35rem 0.71rem 1rem 0.71rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid #DCDCDC;
  background: #FFF;
`;

export const NewsItemsWrapper = styled.div`
  width: 100%;
  
  /* 첫 번째 아이템을 제외한 모든 아이템에 상단 간격 추가 */
  & > div + div {
    margin-top: 1rem;
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
  margin-bottom: 0.63rem;
  font-family: "Pretendard";
  font-size: 0.8rem;
  font-weight: 500;
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
  color: #676767;
  text-align: right;
  font-family: Pretendard;
  font-size: 0.628rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const MoreIcon = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  background-image: url(${MoreSvg});
  background-size: contain;
  background-repeat: no-repeat;
`;
