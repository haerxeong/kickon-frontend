import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
`;

export const TabSelector = styled.div`
  display: flex;
  width: auto;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 0.37rem;
  background: #FFF;
  font-size: 0.65rem;
  cursor: pointer;

  span {
    color: ${({ isActive }) => (isActive ? '#C00C0B' : '#000')};
    font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
    font-size: 0.7rem;
    font-style: normal;
    line-height: 0.7rem;
    margin-right: 0.2rem;
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