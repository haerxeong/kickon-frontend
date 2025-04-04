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
  margin-top: 2.65rem;
`;

export const NewsItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const NewsTitle = styled.h3`
  font-size: 0.88rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

export const NewsDate = styled.p`
  font-size: 0.7rem;
  color: #8F8F8F;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.88rem;
  margin-top: 2.65rem;
  justify-content: center;
`;

export const PageNavButton = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.disabled ? '#D4D4D4' : '#8F8F8F'};
`;

export const NavText = styled.span`
  font-style: normal;
  font-weight: 300;
  line-height: 0.7rem;
  font-size: 0.58rem;
  margin: 0 0.35rem;
  color: ${props => props.disabled ? '#D4D4D4' : '#8F8F8F'};
`;

export const PageNumbers = styled.div`
  display: flex;
  gap: 0.88rem;
`;

export const PageNumberContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageNumber = styled.div`
  font-size: 0.58rem;
  color: ${props => props.isActive ? '#000' : '#8F8F8F'};
  font-weight: ${props => props.isActive ? '400' : '300'};
`;

export const PageIndicator = styled.div`
  position: absolute;
  top: 0.27rem;
  width: 0.53rem;
  height: 0rem;
  stroke-width: 2px;
  stroke: #000;
  border-bottom: 2px solid #000;
`;