import styled from "styled-components";

export const MatchCardContainer = styled.div`
    display: flex;
    width: 33.4rem; /* 41.75rem * 0.8 */
    padding: 1.1rem 0.8rem; /* 1.375rem * 0.8, 1rem * 0.8 */
    flex-direction: column;
    align-items: center;
    gap: 0.5rem; /* 0.625rem * 0.8 */
    border-radius: 0.5rem; /* 0.625rem * 0.8 */
    background: #FFF;
    box-shadow: 0px 0px 12.8px 0px rgba(0, 0, 0, 0.10); /* 16px * 0.8 */
    position: relative;
`;

export const StyledTopContainer = styled.div`
    position: absolute;
    top: 1.1rem; /* 1.38rem * 0.8 */
    left: 0.8rem; /* 1rem * 0.8 */
    display: flex;
    align-items: center;
    gap: 0.4rem; /* 0.5rem * 0.8 */
`;

export const LeftText = styled.span`
    color: #000;
    font-family: Pretendard;
    font-size: 0.7rem; /* 0.875rem * 0.8 */
    font-style: normal;
    font-weight: 600;
    line-height: 0.8rem; /* 1rem * 0.8 */
`;

export const RightBadge = styled.div`
    display: flex;
    height: 1rem; /* 1.25rem * 0.8 */
    padding: 0.1rem 0.4rem; /* 0.125rem * 0.8, 0.5rem * 0.8 */
    justify-content: center;
    align-items: center;
    gap: 0.5rem; /* 0.625rem * 0.8 */
    border-radius: 1rem; /* 1.25rem * 0.8 */
    background: #000;
    color: white;
    font-size: 0.6rem; /* 0.75rem * 0.8 */
    font-weight: 600;
`;

export const RightText = styled.span`
    position: absolute;
    left: 29.5rem; /* 36.87rem * 0.8 */
    top: 1.2rem; /* 1.5rem * 0.8 */
    color: #676767;
    text-align: right;
    font-family: Pretendard;
    font-size: 0.6rem; /* 0.75rem * 0.8 */
    font-style: normal;
    font-weight: 400;
    line-height: 0.8rem; /* 1rem * 0.8 */
`;

export const TimeGuide = styled.div`
    display: flex;
    width: 2.7rem; /* 3.375rem * 0.8 */
    height: 3.7rem; /* 4.625rem * 0.8 */
    align-items: center;
    gap: 0.5rem; /* 0.625rem * 0.8 */
    flex-shrink: 0;
    border-radius: 0.4rem; /* 0.5rem * 0.8 */
    border: 1px solid #F0F0F0;
    background: #FFF;

    position: absolute;
    left: 0.8rem; /* 1rem * 0.8 */
    top: 3rem; /* 3.8rem * 0.8 */
`;

export const TimeTitle = styled.span`
    width: 2.7rem; /* 3.375rem * 0.8 */
    position: absolute;
    top: 0.6rem; /* 0.75rem * 0.8 */
    left: 50%;
    transform: translateX(-50%);
    align-self: stretch;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.6rem; /* 0.75rem * 0.8 */
    font-style: normal;
    font-weight: 500;
    line-height: 0.8rem; /* 1rem * 0.8 */
`;

export const TimeText = styled.span`
    width: 2.7rem; /* 3.375rem * 0.8 */
    position: absolute;
    top: 1.5rem; /* 1.87rem * 0.8 */
    left: 50%;
    transform: translateX(-50%);
    align-self: stretch;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.5rem; /* 0.625rem * 0.8 */
    font-style: normal;
    font-weight: 400;
    line-height: 0.8rem; /* 1rem * 0.8 */
`;

export const MatchButtonContainer = styled.div`
    display: flex;
    width: 28.8rem; /* 36rem * 0.8 */
    height: 3.7rem; /* 4.625rem * 0.8 */
    flex-shrink: 0;
    border-radius: 0.4rem; /* 0.5rem * 0.8 */
    border: 1px solid #F0F0F0;
    background: #FFF;
    box-shadow: 0px 3.2px 8px 0px rgba(0, 0, 0, 0.10); /* 10px * 0.8 */
    margin-top: 2rem; /* 2.5rem * 0.8 */
    margin-left: 1.8rem; /* 2.3rem * 0.8 */
`;

export const MatchButton = styled.button`
    flex: 1;
    height: 100%;
    border: none;
    background: #FFF;
    font-size: 0.8rem; /* 1rem * 0.8 */
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:not(:last-child) {
        border-right: 1px solid #F0F0F0;
    }

    &:hover {
        background: rgba(192, 12, 11, 0.05);
        box-shadow: 0px 1.6px 8px 0px rgba(217, 25, 32, 0.40); /* 10px * 0.8 */
    }

    &[aria-selected="true"] {
        background: rgba(192, 12, 11, 0.30);
        box-shadow: 0px 1.6px 8px 0px rgba(217, 25, 32, 0.40); /* 10px * 0.8 */
    }

    &:first-child {
        border-radius: 0.4rem 0rem 0rem 0.4rem; /* 0.5rem * 0.8 */
    }

    &:last-child {
        border-radius: 0rem 0.4rem 0.4rem 0rem; /* 0.5rem * 0.8 */
    }

    &:not(:first-child):not(:last-child) {
        border-radius: 0;
    }
`;

export const ExtraContentRight = styled.div`
    position: absolute;
    top: 0.7rem; /* 0.92rem * 0.8 */
    right: 1.4rem; /* 1.7rem * 0.8 */
    display: flex;
    width: 0.8rem; /* 1rem * 0.8 */
    height: 1.9rem; /* 2.375rem * 0.8 */
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;

export const ExtraContentLeft = styled.div`
    position: absolute;
    top: 0.7rem; /* 0.92rem * 0.8 */
    left: 0.8rem; /* 1rem * 0.8 */
    display: flex;
    width: 0.8rem; /* 1rem * 0.8 */
    height: 1.9rem; /* 2.375rem * 0.8 */
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;

export const CountButton = styled.button`
    width: 0.8rem; /* 1rem * 0.8 */
    height: 0.8rem; /* 1rem * 0.8 */
    flex-shrink: 0;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    filter: drop-shadow(0px 0px 3.2px rgba(0, 0, 0, 0.10)); /* 4px * 0.8 */
`;

export const CountDisplay = styled.div`
    position: absolute;
    top: 50%;
    ${({ isLeft }) => (isLeft ? "left: -0.4rem;" : "right: -0.25rem;")} /* -0.5rem * 0.8, -0.3rem * 0.8 */
    transform: translate(${({ isLeft }) => (isLeft ? "-8px" : "8px")}, -50%); /* -10px * 0.8, 10px * 0.8 */
    display: flex;
    width: 1.6rem; /* 2rem * 0.8 */
    height: 1.6rem; /* 2rem * 0.8 */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem; /* 0.625rem * 0.8 */
    flex-shrink: 0;
    border-radius: 0.4rem; /* 0.5rem * 0.8 */
    background: ${({ isZero }) => (isZero ? "#AFAFAF" : "#C00C0B")};
    color: white;
    font-weight: bold;
    font-size: 0.8rem; /* 1rem * 0.8 */
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
    z-index: 10;
`;

export const ConfirmButton = styled.button`
    display: flex;
    width: 28.8rem; /* 36rem * 0.8 */
    height: 1.5rem; /* 1.875rem * 0.8 */
    padding: 0.6rem 1.2rem; /* 0.75rem * 0.8, 1.5rem * 0.8 */
    justify-content: center;
    align-items: center;
    gap: 0.5rem; /* 0.625rem * 0.8 */
    margin-left: 1.8rem; /* 2.3rem * 0.8 */

    border-radius: 0.3rem; /* 0.375rem * 0.8 */
    border: 1px solid #F0F0F0;
    background:  #FFF;
    box-shadow: 0px 3.2px 8px 0px rgba(0, 0, 0, 0.10); /* 10px * 0.8 */
    cursor: pointer;

    color: #000;
    text-align: right;
    font-family: Pretendard;
    font-size: 0.6rem; /* 0.75rem * 0.8 */
    font-style: normal;
    font-weight: 500;
    line-height: 0.8rem; /* 1rem * 0.8 */
`;

export const JoinedText = styled.p`
    color: #676767;
    text-align: right;
    font-family: Pretendard;
    font-size: 0.6rem; /* 0.75rem * 0.8 */
    font-style: normal;
    font-weight: 400;
    line-height: 0.8rem; /* 1rem * 0.8 */
    right: 0.8rem; /* 1rem * 0.8 */
    top: 0.55rem; /* 0.69rem * 0.8 */
    margin: 0;
`;