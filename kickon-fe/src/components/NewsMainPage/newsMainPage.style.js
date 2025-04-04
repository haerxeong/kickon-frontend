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

export const DropdownContainer = styled.div`
  position: relative;
`;

export const TabSelector = styled.div`
    // 리그 선택 탭
    display: flex;
    width: 3.5rem;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: 0.37rem;
    background: #FFF;
    font-size: 0.65rem;
    cursor: pointer;

    span {
        color: #000;
        font-weight: 400;
        font-size: 0.7rem;
        font-style: normal;
        line-height: 0.7rem;
    }
`;

export const DropdownMenu = styled.div`
    // 드롭다운 컨테이너
    position: absolute;
    width: 8.8rem;
    z-index: 10;
    margin-top: 0.4rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.35rem;
    align-self: stretch;
    border-radius: 0.4375rem;
    border: 0.7px solid #F0F0F0;
    background: #FFF;
    box-shadow: 0 3px 11px 0 rgba(0, 0, 0, 0.20);
`;

export const LeagueImage = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  margin-left: 1rem;
`;

export const LeagueName = styled.span`
  margin-left: 0.7rem;
  color: #000;
  font-size: 0.62rem;
  font-style: normal;
  font-weight: 300;
  line-height: 0.7rem;
`;

export const TabOption = styled.div`
    // 드롭다운 각 리그
    width: 100%;
    color: #000;
    font-size: 0.65rem;
    padding: 0.3rem 0;
    cursor: pointer;
    align-items: center;

    &:hover {
        background-color: #F0F0F0;

        ${LeagueName} {
            font-weight: 400;
        }
    }

    & + & {
        border-top: 1px solid #F0F0F0;
    }
`;

export const Divider = styled.div`
  width: 100%;
  height: 0rem;
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