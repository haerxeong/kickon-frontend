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
  
  // 이적 예측 페이지에서만 사용될 때 스타일 변경
  &.compact {
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: 0.45rem;
    background-color: white;
    margin-bottom: 1rem;
    max-height: none; // 15.5rem에서 none으로 변경
    overflow-y: visible; // auto에서 visible로 변경
    
    .news-item {
      margin: 0;
      padding: 0.3rem;
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
      
      .title {
        font-size: 0.85rem;
        margin: 0.2rem 0;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .content {
        font-size: 0.65rem;
        margin-bottom: 0.3rem;
        -webkit-line-clamp: 1;
        line-height: 1.2;
      }
      
      .thumbnail {
        width: 3rem;
        height: 3rem;
        margin: 0;
      }
    }
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

  .compact & {
    margin-top: 0;
    
    & > div + div {
      margin-top: 0.3rem;
    }
  }
`;
