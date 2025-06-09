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