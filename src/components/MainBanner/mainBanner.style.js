import styled from 'styled-components';

export const BannerContainer = styled.div`
    position: relative;
    //height: 25rem; /* 400px -> 25rem */
    aspect-ratio: 3.7 / 1;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1.25rem; /* 20px -> 1.25rem */
    
    @media (max-width: 950px) {
        padding-left: 0;
        justify-content: center;
    }
`;

export const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: white;
    font-size: clamp(1.5rem, 4vw, 3rem);  // 👉 여기서 크기 제어
    cursor: pointer;
    z-index: 10;
    padding: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 2em;
        height: 2em;
    }

    &:hover {
        color: rgba(255, 255, 255, 0.8);
    }
`;

export const LeftArrow = styled(ArrowButton)`
    left: 1.25rem; /* 20px -> 1.25rem */
`;

export const RightArrow = styled(ArrowButton)`
    right: 1.25rem; /* 20px -> 1.25rem */
`;

export const IndicatorContainer = styled.div`
    position: absolute;
    bottom: 0.9375rem; /* 15px -> 0.9375rem */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem; /* 8px -> 0.5rem */
`;

export const IndicatorDot = styled.div`
    width: ${props => (props.active ? '1.875rem' : '0.625rem')}; /* 30px -> 1.875rem, 10px -> 0.625rem */
    height: 0.625rem; /* 10px -> 0.625rem */
    background-color: white;
    border-radius: 0.3125rem; /* 5px -> 0.3125rem */
    transition: width 0.3s;
`;