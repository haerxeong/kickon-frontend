import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const NewsContainer = styled.div`
  width: 30rem;
  height: 116.2rem;
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
  margin-right: 0.7rem;
  text-align: center;
  font-size: 0.7rem;
  font-style: normal;
  line-height: 0.7rem;
  font-weight: ${props => props.isActive ? '500' : '400'};
  color: ${props => props.isActive ? '#C00C0B' : '#000'};
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 0.663rem;
  font-style: normal;
  line-height: 0.7rem;
  font-weight: 400;
  color: #000;
  
  span {
    margin-right: 0.7rem;
  }
`;

export const DropdownMenu = styled.div`
  width: 8.8rem;
  position: absolute;
  z-index: 10;
  top: 0.44rem;
  left: 0;
  background: white;
  border: 1px solid #DCDCDC;
  border-radius: 0.2rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.20);
  display: flex;
  height: 10rem;
  padding: 0.35rem 0rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.35rem;
  align-self: stretch;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.35rem 0;
  width: 100%;
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
  height: 0rem;
  stroke-width: 2px;
  stroke: #C00C0B;
  border-bottom: 2px solid #C00C0B;
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