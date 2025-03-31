import styled from "styled-components";

export const TableContainer = styled.div`
    width: 13.5rem; 
    margin-left: 3rem; 
    background-color: #ffffff;
    border-radius: 0.4rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05);
    padding: 1rem;
`;

export const Title = styled.p`
    margin: 0;
    font-size: 0.75rem;
    font-weight: bold;
    color: #333;
`;

export const Divider = styled.hr`
    border: 0;
    height: 0.0625rem;
    background-color: #eeeeee;
    margin: 0.75rem 0;
`;

export const LeagueSelector = styled.div` // k리그
    display: flex;
    align-items: center;
    font-size: 0.7rem;
    font-weight: 1000;
    color: #333;
    cursor: pointer;

    & > span {
        margin-left: 0.5rem; 
    }
`;

export const DropdownArrow = styled.span` // 수정
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    display: inline-block;
    font-size: 0.75rem;
    color: #666;
`;

export const Table = styled.table` // 각 행
    width: 100%;
    border-collapse: collapse;
`;

export const HeaderRow = styled.tr`
    display: grid;
    grid-template-columns: 2.5rem 1fr 2rem 2rem 2rem;
    padding: 0.25rem 0;
    color: #666;
    font-size: 0.7rem;
`;

export const TableHeader = styled.th`
    text-align: ${props => props.align || 'center'};
    font-weight: normal;
    color: #666;
    font-size: 0.7rem;
`;

export const TableRow = styled.tr`
    display: grid;
    grid-template-columns: 1rem 1fr 2rem 2rem 1.5rem;
    align-items: center;
    padding: 0.25rem 0;
`;

export const TableData = styled.td`
    text-align: ${props => props.align || 'left'};
    font-size: 0.7rem; 
    width: ${props => props.width || 'auto'};
`;

export const TeamCell = styled.td`
    display: flex;
    align-items: center;
    padding: 0;
`;

export const TeamLogo = styled.img`
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
    object-fit: contain;
`;

export const TeamName = styled.span`
    font-size: 0.7rem;
`;