import styled from "styled-components";

export const MatchCardContainer = styled.div`
    display: flex;
    width: 30rem;
    padding: 1.0rem 0.7rem;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    background: #FFF;
    box-shadow: 0px 0px 12.8px 0px rgba(0, 0, 0, 0.10);
    position: relative;
`;

export const StyledTopContainer = styled.div`
    position: absolute;
    top: 1.0rem;
    left: 0.7rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
`;

export const LeftText = styled.span`
    color: #000;
    font-family: Pretendard;
    font-size: 0.7rem;
    font-style: normal;
    font-weight: 600;
    line-height: 0.8rem;
`;

export const RightBadge = styled.div`
    display: flex;
    height: 0.9rem;
    padding: 0.1rem 0.4rem;
    justify-content: center;
    align-items: center;
    gap: 0.45rem;
    border-radius: 1rem;
    background: #000;
    color: white;
    font-size: 0.54rem;
    font-weight: 600;
`;

export const RightText = styled.span`
    position: absolute;
    left: 26.6rem;
    top: 1.1rem;
    color: #676767;
    text-align: right;
    font-family: Pretendard;
    font-size: 0.54rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.8rem;
`;

export const TimeGuide = styled.div`
    display: flex;
    width: 2.4rem;
    height: 3.3rem;
    align-items: center;
    gap: 0.45rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    border: 1px solid #F0F0F0;
    background: #FFF;

    position: absolute;
    left: 0.7rem;
    top: 2.7rem;
`;

export const TimeTitle = styled.span`
    width: 2.4rem;
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    align-self: stretch;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.54rem;
    font-style: normal;
    font-weight: 500;
    line-height: 0.8rem;
`;

export const TimeText = styled.span`
    width: 2.4rem;
    position: absolute;
    top: 1.4rem;
    left: 50%;
    transform: translateX(-50%);
    align-self: stretch;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.45rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.8rem;
`;

export const MatchButtonContainer = styled.div`
    display: flex;
    width: 25.9rem;
    height: 3.3rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    border: 1px solid #F0F0F0;
    background: #FFF;
    box-shadow: 0px 3.2px 8px 0px rgba(0, 0, 0, 0.10);
    margin-top: 1.8rem;
    margin-left: 1.6rem;
`;

export const MatchButton = styled.button`
    flex: 1;
    height: 100%;
    border: none;
    background: #FFF;
    font-size: 0.72rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:not(:last-child) {
        border-right: 1px solid #F0F0F0;
    }

    &:hover {
        background: rgba(192, 12, 11, 0.05);
        box-shadow: 0px 1.44px 7.2px 0px rgba(217, 25, 32, 0.40);
    }

    &[aria-selected="true"] {
        background: rgba(192, 12, 11, 0.30);
        box-shadow: 0px 1.44px 7.2px 0px rgba(217, 25, 32, 0.40);
    }

    &:first-child {
        border-radius: 0.4rem 0rem 0rem 0.4rem;
    }

    &:last-child {
        border-radius: 0rem 0.4rem 0.4rem 0rem;
    }

    &:not(:first-child):not(:last-child) {
        border-radius: 0;
    }
`;

export const ExtraContentRight = styled.div`
    position: absolute;
    top: 0.6rem;
    right: 1.3rem;
    display: flex;
    width: 0.7rem;
    height: 1.7rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;

export const ExtraContentLeft = styled.div`
    position: absolute;
    top: 0.6rem;
    left: 0.7rem;
    display: flex;
    width: 0.7rem;
    height: 1.7rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;

export const CountButton = styled.button`
    width: 0.7rem;
    height: 0.7rem;
    flex-shrink: 0;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    filter: drop-shadow(0px 0px 2.9px rgba(0, 0, 0, 0.10));
`;

export const CountDisplay = styled.div`
    position: absolute;
    top: 50%;
    ${({ isLeft }) => (isLeft ? "left: -0.4rem;" : "right: -0.2rem;")}
    transform: translate(${({ isLeft }) => (isLeft ? "-7px" : "7px")}, -50%);
    display: flex;
    width: 1.4rem;
    height: 1.4rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.45rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    background: ${({ isZero }) => (isZero ? "#AFAFAF" : "#C00C0B")};
    color: white;
    font-weight: bold;
    font-size: 0.72rem;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
    z-index: 10;
`;

export const ConfirmButton = styled.button`
    display: flex;
    width: 25.9rem;
    height: 1.4rem;
    padding: 0.5rem 1.1rem;
    justify-content: center;
    align-items: center;
    gap: 0.45rem;
    margin-left: 1.6rem;

    border-radius: 0.3rem;
    border: 1px solid #F0F0F0;
    background: #FFF;
    box-shadow: 0px 3.2px 8px 0px rgba(0, 0, 0, 0.10);
    cursor: pointer;

    color: #000;
    text-align: right;
    font-family: Pretendard;
    font-size: 0.54rem;
    font-style: normal;
    font-weight: 500;
    line-height: 0.8rem;
`;

export const JoinedText = styled.p`
    color: #676767;
    text-align: right;
    font-family: Pretendard;
    font-size: 0.54rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.8rem;
    right: 0.7rem;
    top: 0.5rem;
    margin: 0;
`;
