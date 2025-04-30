import styled from "styled-components";

export const TableContainer = styled.div`
  width: 15rem;
  background-color: #fff;
  border-radius: 0.45rem;
  border: 1px solid #dcdcdc;
  padding-bottom: 0.75rem;
  gap: 0.75rem;
`;

export const Title = styled.p`
  // 순위 이름
  font-size: 0.75rem;
  font-weight: 600;
  color: #000;
  font-style: normal;
  line-height: 1rem;
  margin: 0;
  padding: 0.75rem 0.75rem 0 0.75rem;
`;

export const Divider = styled.hr`
  height: 0;
  border: 0;
  border-top: 1px solid #f0f0f0;
  margin: 0.7rem 0;
`;

export const LeagueSelector = styled.div`
  // k리그
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 1000;
  color: #000;
  cursor: pointer;
  gap: 0.28rem;
  padding: 0 0.75rem;

  & > span {
    font-size: 0.6475rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem;
  }
`;

export const DropdownMenu = styled.div`
  // 드롭다운 컨테이너
  position: absolute;
  width: 8.8rem;
  z-index: 10;
  margin: 0.4rem 0 0 0.4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  align-self: stretch;
  border-radius: 0.4375rem;
  border: 0.7px solid #f0f0f0;
  background: #fff;
  box-shadow: 0 3px 11px 0 rgba(0, 0, 0, 0.2);
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
  font-weight: 400;
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
    background-color: #f0f0f0;

    ${LeagueName} {
      font-weight: 400;
    }
  }

  & + & {
    border-top: 1px solid #f0f0f0;
  }
`;

export const Table = styled.table`
  // 각 행
  width: 100%;
  display: flex;
  border-collapse: collapse;
  flex-direction: column;
  align-self: stretch;
  padding: 0 0.75rem;
`;

export const HeaderRow = styled.tr`
  display: grid;
  grid-template-columns: 1.66rem auto 1.2rem 1.2rem 1.2rem; // ✅ 데이터와 같은 너비
  align-items: center;
  padding: 0.25rem 0;
  column-gap: 0.35rem;
`;

export const TableHeader = styled.th`
  text-align: center;
  font-weight: normal;
  color: #676767;
  font-size: 0.62rem;
  padding-bottom: 0.75rem;
`;

export const TableRow = styled.tr`
  display: grid;
  grid-template-columns: 1.66rem auto 1.2rem 1.2rem 1.2rem;
  align-items: center;
  padding: 0.2rem 0;
  column-gap: 0.35rem;
`;

export const TableData = styled.td`
  color: #000;
  font-size: 0.65rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  text-align: center;
`;

export const TeamCell = styled.td`
  display: flex;
  align-items: center;
  padding: 0;
  justify-content: start;
`;

export const TeamLogo = styled.img`
  width: 0.7875rem;
  height: 0.7875rem;
  margin-right: 0.5rem;
  object-fit: contain;
`;