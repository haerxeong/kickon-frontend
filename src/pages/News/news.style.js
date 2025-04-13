import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const NewsContainer = styled.div`
  width: 30rem;
  //height: 116.2rem;
  flex-shrink: 0;
  border-radius: 0.44rem;
  border: 1px solid #DCDCDC;
  background: #FFF;
  padding: 1.33rem 0.7rem 1.77rem 0.7rem;
  margin-bottom: 6.19rem;
  position: relative;
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0.66rem 1rem;
  gap: 1rem;
`;

export const TabButton = styled.div`
    // 전체, 인기 등 탭 버튼
  margin-right: 0.7rem;
  text-align: center;
  font-size: 0.7rem;
  font-style: normal;
  line-height: 0.7rem;
  font-weight: ${props => props.isActive ? '500' : '400'};
  color: ${props => props.isActive ? '#C00C0B' : '#000'};
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0;
  flex-shrink: 0;
  stroke-width: 1px;
  stroke: #DCDCDC;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.20));
  border-bottom: 1px solid #DCDCDC;
  position: relative;
`;

export const ActiveIndicator = styled.div`
    position: absolute;
    top: -1px;
    width: 1.85rem;
    height: 0;
    stroke-width: 2px;
    stroke: #C00C0B;
    border-bottom: 2px solid #C00C0B;
    left: ${props => props.left};
`;

export const NewsList = styled.div`
  margin-top: 1rem;
        /* 첫 번째 아이템을 제외한 모든 아이템에 상단 간격 추가 */
        & > div + div {
                margin-top: 1rem;
        }

        /* 마지막 아이템의 하단 테두리 제거 */
        & > div:last-child {
                border-bottom: none;
        }
`;