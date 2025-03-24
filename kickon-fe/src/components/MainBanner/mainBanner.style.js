import styled from 'styled-components';

export const BannerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const TextContainer = styled.div`
    position: relative;
    color: white;
    text-align: left;
    margin-left: 120px;
`;

export const MainText = styled.h1`
    font-size: 6rem;
    font-weight: 1000;
    font-style: italic;
    margin-bottom: 5px;
`;

export const SubText = styled.p`
    font-size: 1.5rem;
    font-style: italic;
    margin-top: 0;
`;

export const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: white;
    font-size: 3rem;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
    padding: 10px;

    &:hover {
        color: rgba(255, 255, 255, 0.8);
    }
`;

export const LeftArrow = styled(ArrowButton)`
    left: 20px;
`;

export const RightArrow = styled(ArrowButton)`
    right: 20px;
`;

export const IndicatorContainer = styled.div`
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
`;

export const IndicatorDot = styled.div`
    width: ${props => (props.active ? '30px' : '10px')};
    height: 10px;
    background-color: white;
    border-radius: 5px;
    transition: width 0.3s;
`;