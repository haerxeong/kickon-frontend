import styled from "styled-components";

export const NewsContainer = styled.div`
    //width: 30rem;
    //min-height: 55.625rem;
    width: 100%;
    height: auto;
    flex-shrink: 0;
    border-radius: 0.45rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    display: flex;
    flex-direction: column;
    padding: 0.7rem;
`;

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #F0F0F0;
    margin-bottom: 0.5rem;
`;

export const Tab = styled.div`
    color: ${props => props.active ? '#C00C0B' : '#000'};
    font-family: Pretendard;
    font-size: 0.7rem;
    font-weight: ${props => props.active ? '500' : '400'};
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    position: relative;
    &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${props => props.active ? '#C00C0B' : 'transparent'};
    }
`;

// 검색창 관련 스타일 추가
export const SearchContainer = styled.div`
    margin-bottom: 1rem;
`;

export const SearchInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 0.8rem;
    padding: 0.6rem 0.8rem;
    transition: all 0.2s ease;
    margin-top: 0.5rem;
    &:focus-within {
        border-color: #C00C0B;
        background: white;
        box-shadow: 0 0 0 2px rgba(192, 12, 11, 0.1);
    }

    svg {
        color: #8c8c8c;
        margin-right: 0.5rem;
        flex-shrink: 0;
    }
`;

export const SearchInput = styled.input`
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 0.7rem;
    font-family: Pretendard;
    color: #333;

    &::placeholder {
        color: #8c8c8c;
    }
`;

export const SearchClearButton = styled.button`
    background: none;
    border: none;
    color: #8c8c8c;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    margin-left: 0.5rem;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
        background: #f0f0f0;
        color: #333;
    }
`;

export const MarketplaceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    width: 100%;
    padding: 0.5rem 0;
`;

export const MarketplaceItem = styled.div`
    border: 1px solid #f0f0f0;
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    background: white;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }
`;

export const MarketplaceImage = styled.div`
    width: 100%;
    height: 8rem;
    background-color: #f5f5f5;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img.normal-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    img.logo-image {
        width: 80px;
        height: 80px;
        object-fit: contain;
    }
`;

export const MarketplaceContent = styled.div`
    padding: 0.7rem;
`;

export const MarketplaceTitle = styled.h3`
    font-size: 0.65rem;
    font-weight: 500;
    color: #000;
    margin: 0 0 0.3rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
`;

export const MarketplacePrice = styled.div`
    font-size: 0.7rem;
    font-weight: 600;
    color: #C00C0B;
    margin-bottom: 0.4rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
`;

export const MarketplaceInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.5rem;
    color: #8c8c8c;
`;

export const MarketplaceAuthor = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;

    img {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        object-fit: cover;
    }
`;

export const MarketplaceStats = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    span {
        display: flex;
        align-items: center;
        gap: 0.15rem;
    }
`;

export const StatusBadge = styled.span`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background: ${props => props.status === 'sold' ? '#666' : '#C00C0B'};
    color: white;
    font-size: 0.45rem;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-weight: 500;
`;

export const CategoryDropdown = styled.div`
    position: relative;
    display: inline-block;
`;

export const DropdownButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.4rem 0.6rem;
    background: white;
    border: none;
    border-radius: 0.25rem;
    color: #000;
    font-size: 0.65rem;
    font-family: Pretendard;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 4rem;
    
    &:hover {
        border-color: #C00C0B;
        background: #fafafa;
    }
    
    svg {
        transition: transform 0.2s ease;
        transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #DCDCDC;
    border-radius: 0.25rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    min-width: 6rem;
    margin-top: 0.2rem;
`;

export const DropdownItem = styled.div`
    padding: 0.5rem 0.7rem;
    font-size: 0.65rem;
    font-family: Pretendard;
    color: ${props => props.selected ? '#C00C0B' : '#333'};
    background: ${props => props.selected ? '#fff5f5' : 'white'};
    cursor: pointer;
    transition: all 0.15s ease;
    
    &:hover {
        background: ${props => props.selected ? '#fff5f5' : '#f8f8f8'};
        color: #C00C0B;
    }
    
    &:first-child {
        border-radius: 0.25rem 0.25rem 0 0;
    }
    
    &:last-child {
        border-radius: 0 0 0.25rem 0.25rem;
    }
    
    & + & {
        border-top: 1px solid #f0f0f0;
    }
`;

export const MobileWrite = styled.button`
    display: none;
    position: absolute;
    height: 1.7rem;
    padding: 0.4375rem 0.7875rem;
    margin-right: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.4375rem;
    border-radius: 0.875rem;
    border: 1px solid #c00c0b;
    background: #c00c0b;
    color: #fff;
    text-align: right;
    font-size: 0.7875rem;
    font-style: normal;
    font-weight: 400;
    text-decoration: none;

    @media (max-width: 1200px) {
        right: 2rem;
    }
    @media (max-width: 768px) {
        right: 1rem;
        height: 1.3rem;
        font-size: 0.65rem;
        padding: 0.3rem 0.5rem;
    }
    @media (max-width: 960px) {
        display: flex; /* 960px 이하일 때만 보임 */
    }
`;