import styled from "styled-components";


export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    gap: 0.5rem;
    align-items: center;
`;

export const PageButton = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: ${props => props.active ? '#f0f0f0' : 'transparent'};
    border-radius: 0.2rem;
    font-size: 0.7rem;
    color: ${props => props.active ? '#000' : '#676767'};
    cursor: pointer;
    
    &:hover {
        background: ${props => props.active ? '#f0f0f0' : '#f8f8f8'};
    }
`;

export const NavButton = styled.button`
    border: none;
    background: transparent;
    font-size: 0.7rem;
    color: #676767;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

export const NewsContainer = styled.div`
    width: 30rem;
    height: 55.625rem;
    flex-shrink: 0;
    border-radius: 0.45rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #F0F0F0;
    margin-bottom: 1rem;
`;

export const Tab = styled.div`
    color: ${props => props.active ? '#000' : '#676767'};
    font-family: Pretendard;
    font-size: 0.85rem;
    font-weight: ${props => props.active ? '600' : '400'};
    padding: 0.5rem 1rem;
    cursor: pointer;
    position: relative;
    &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${props => props.active ? '#E74C3C' : 'transparent'};
    }
`;

export const TableHeader = styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem 0;
    border-bottom: 0.0625rem solid #f0f0f0;
    color: #000;
    font-family: Pretendard;
    font-size: 0.7rem;
    font-weight: 400;
    .title {
        flex: 5;
        padding-left: 0.5rem;
    }
    
    .author {
        flex: 2;
        text-align: center;
    }
    .date {
        flex: 1.5;
        text-align: center;
    }
    
    .views {
        flex: 1;
        text-align: center;
    }
    
    .likes {
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
