import React, { useState } from "react";
import {
    MatchButton,
    StyledTopContainer,
    LeftText,
    RightBadge,
    TimeGuide,
    TimeText,
    MatchButtonContainer,
    MatchCardContainer,
    ExtraContentRight,
    ExtraContentLeft,
    CountButton,
    CountDisplay,
    ConfirmButton,
    JoinedText, TimeTitle, RightText
} from "./matchCard.style.js";
import chevronUp from "../../assets/chevron_up.svg";
import chevronDown from "../../assets/chevron_down.svg";
import chevronDownNon from "../../assets/chevron_down_non.svg";

const MatchCard = () => {
    const [selected, setSelected] = useState(null);
    const [counts, setCounts] = useState({ 0: 0, 2: 0 });
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleClick = (index) => {
        setSelected((prev) => (prev === index ? null : index));
    };

    const incrementCount = (event, index) => {
        event.stopPropagation(); // MatchButton 클릭 방지
        setCounts((prev) => ({ ...prev, [index]: prev[index] + 1 }));
    };

    const decrementCount = (event, index) => {
        event.stopPropagation(); // MatchButton 클릭 방지
        setCounts((prev) => ({ ...prev, [index]: Math.max(0, prev[index] - 1) }));
    };

    const handleConfirm = () => {
        setIsConfirmed(true);
    };

    return (
        <MatchCardContainer>
            <StyledTopContainer>
                <LeftText>K리그 1</LeftText>
                <RightBadge>{isConfirmed ? "참여 완료" : "예측 진행 중"}</RightBadge>
            </StyledTopContainer>
            <RightText>마감 50분전</RightText>
            <TimeGuide>
                <TimeTitle>경기 전</TimeTitle>
                <TimeText>01.25 (토) 04:30</TimeText>
            </TimeGuide>
            <MatchButtonContainer>
                {["FC 서울", "무승부", "수원 FC"].map((option, index) => (
                    <MatchButton
                        key={index}
                        aria-selected={selected === index}
                        onClick={() => handleClick(index)}
                        style={{
                            position: "relative",
                            pointerEvents: isConfirmed ? "none" : "auto" // ❌ 선택 완료 후 클릭 방지
                        }}
                    >
                        {option}
                        {(index === 0 || index === 2) && (
                            <CountDisplay
                                isVisible={selected !== null} // ✅ 선택하면 항상 보이도록
                                isLeft={index === 2}
                                isZero={counts[index] === 0}
                            >
                                {counts[index]}
                            </CountDisplay>
                        )}
                        {index === 0 && !isConfirmed && ( // ❌ 참여 완료 후 CountButton 숨김
                            <ExtraContentRight isVisible={selected === index}>
                                <CountButton onClick={(e) => incrementCount(e, index)}>
                                    <img src={chevronUp} alt="Increase" />
                                </CountButton>
                                <CountButton onClick={(e) => decrementCount(e, index)}>
                                    <img
                                        src={counts[index] === 0 ? chevronDownNon : chevronDown}
                                        alt="Decrease"
                                    />
                                </CountButton>
                            </ExtraContentRight>
                        )}
                        {index === 2 && !isConfirmed && ( // ❌ 참여 완료 후 CountButton 숨김
                            <ExtraContentLeft isVisible={selected === index}>
                                <CountButton onClick={(e) => incrementCount(e, index)}>
                                    <img src={chevronUp} alt="Increase" />
                                </CountButton>
                                <CountButton onClick={(e) => decrementCount(e, index)}>
                                    <img
                                        src={counts[index] === 0 ? chevronDownNon : chevronDown}
                                        alt="Decrease"
                                    />
                                </CountButton>
                            </ExtraContentLeft>
                        )}
                    </MatchButton>
                ))}
            </MatchButtonContainer>

            {/* ✅ 선택한 버튼이 있고, 선택 완료 후에는 숨기기 */}
            {selected !== null && !isConfirmed && (
                <ConfirmButton onClick={handleConfirm}>선택 완료</ConfirmButton>
            )}
            <JoinedText>1,204명 참여</JoinedText>
        </MatchCardContainer>
    );
};

export default MatchCard;