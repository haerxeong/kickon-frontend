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
    JoinedText,
    TimeTitle,
    RightText,
    TeamName,
    TeamLogo,
    ParticipationPercentage,
    TeamContainer,
    TeamLeftContainer,
    TeamCenterContainer,
    TeamRightContainer,
    TeamNameContainer,
    TeamRightNameContainer
} from "./matchCard.style.js";
import chevronUp from "../../assets/chevron_up.svg";
import chevronDown from "../../assets/chevron_down.svg";
import chevronDownNon from "../../assets/chevron_down_non.svg";

const MatchCard = () => {
    const [selected, setSelected] = useState(null);
    const [counts, setCounts] = useState({ 0: 0, 2: 0 });
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleClick = (index) => {
        // Reset counts to 0 when the draw button (index 1) is clicked
        if (index === 1) {
            setCounts({ 0: 0, 2: 0 });
        }

        setSelected((prev) => (prev === index ? null : index));
    };

    const handleContainerClick = () => {
        // Allow editing by clicking on the container when confirmed
        if (isConfirmed) {
            setIsConfirmed(false);
        }
    };

    const incrementCount = (event, index) => {
        event.stopPropagation(); // MatchButton 클릭 방지

        // 무승부 선택 시 양 팀 카운트 동시에 증가
        if (selected === 1) {
            setCounts((prev) => ({
                ...prev,
                0: prev[0] + 1,
                2: prev[2] + 1
            }));
        } else {
            setCounts((prev) => ({ ...prev, [index]: prev[index] + 1 }));
        }
    };

    const decrementCount = (event, index) => {
        event.stopPropagation(); // MatchButton 클릭 방지

        // 무승부 선택 시 양 팀 카운트 동시에 감소
        if (selected === 1) {
            setCounts((prev) => ({
                ...prev,
                0: Math.max(0, prev[0] - 1),
                2: Math.max(0, prev[2] - 1)
            }));
        } else {
            setCounts((prev) => ({ ...prev, [index]: Math.max(0, prev[index] - 1) }));
        }
    };

    const handleConfirm = () => {
        setIsConfirmed(true);
    };

    const formatKoreanDate = (dateString) => {
        const date = new Date(dateString);

        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const daysKor = ["일", "월", "화", "수", "목", "금", "토"];
        const dayOfWeek = daysKor[date.getDay()];

        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${month}.${day} (${dayOfWeek}) ${hour}:${minute}`;
    };

    const data = {
        name: "K리그 1",
        games : {
            homeTeam : {
                "name" : "FC 서울",
                "logoUrl" : "https://media.api-sports.io/football/teams/45.png"
            },
            awayTeam : {
                "name" : "수원 FC",
                "logoUrl" : "https://media.api-sports.io/football/teams/42.png"
            },
            gameStatus: "예측 진행중",
            startAt: "2025-04-05T11:30:00",
            gambleResult: {
                home: 600,
                away: 500,
                draw: 104,
                participationNumber: 1204
            }
        }
    };

    // Calculate percentages for each option
    const calculatePercentage = (value) => {
        const total = data.games.gambleResult.home +
            data.games.gambleResult.draw +
            data.games.gambleResult.away;
        return ((value / total) * 100).toFixed(1);
    };

    const homePercentage = calculatePercentage(data.games.gambleResult.home);
    const drawPercentage = calculatePercentage(data.games.gambleResult.draw);
    const awayPercentage = calculatePercentage(data.games.gambleResult.away);

    // 항상 카운트 컨트롤이 보이도록 설정 (selected가 null이 아닐 때)
    const showCountControls = selected !== null;

    // CountDisplay의 배경색 결정 로직
    const getCountDisplayColor = (index) => {
        // 0점이면 회색
        if (counts[index] === 0) {
            return "#AFAFAF";
        }

        // 두 팀 점수가 같으면서 0이 아니면 둘 다 빨간색
        if (counts[0] === counts[2] && counts[0] > 0) {
            return "#C00C0B";
        }

        // 점수가 높은 팀만 빨간색
        const maxCount = Math.max(counts[0], counts[2]);
        return counts[index] === maxCount ? "#C00C0B" : "#AFAFAF";
    };

    return (
        <MatchCardContainer>
            <StyledTopContainer>
                <LeftText>{data.name}</LeftText>
                <RightBadge>{isConfirmed ? "참여 완료" : "예측 진행 중"}</RightBadge>
            </StyledTopContainer>
            <RightText>마감 50분전</RightText>
            <TimeGuide>
                <TimeTitle>경기 전</TimeTitle>
                <TimeText>{formatKoreanDate(data.games.startAt)}</TimeText>
            </TimeGuide>
            <MatchButtonContainer  onClick={handleContainerClick} style={{ cursor: isConfirmed ? 'pointer' : 'default' }}>
                {[
                    {
                        name: data.games.homeTeam.name,
                        logo: data.games.homeTeam.logoUrl,
                        percentage: homePercentage,
                        value: data.games.gambleResult.home
                    },
                    {
                        name: "무승부",
                        logo: null,
                        percentage: drawPercentage,
                        value: data.games.gambleResult.draw
                    },
                    {
                        name: data.games.awayTeam.name,
                        logo: data.games.awayTeam.logoUrl,
                        percentage: awayPercentage,
                        value: data.games.gambleResult.away
                    }
                ].map((option, index) => (
                    <MatchButton
                        key={index}
                        aria-selected={selected === index}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent container click event
                            handleClick(index);
                        }}
                        disabled={isConfirmed}
                    >
                        {/* 왼쪽 팀 (index === 0) */}
                        {index === 0 && (
                            <TeamLeftContainer>
                                {option.logo && (
                                    <TeamLogo
                                        src={option.logo}
                                        alt={option.name}
                                        small={selected !== null || isConfirmed}
                                    />
                                )}
                                <TeamNameContainer>
                                    <TeamName small={selected !== null || isConfirmed}>
                                        {option.name}
                                    </TeamName>
                                    {(selected !== null || isConfirmed) && (
                                        <ParticipationPercentage>
                                            {option.percentage}%
                                        </ParticipationPercentage>
                                    )}
                                </TeamNameContainer>
                            </TeamLeftContainer>
                        )}

                        {/* 중앙 (무승부) */}
                        {index === 1 && (
                            <TeamCenterContainer>
                                <TeamName small={selected !== null || isConfirmed}>
                                    {option.name}
                                </TeamName>
                                {(selected !== null || isConfirmed) && (
                                    <ParticipationPercentage>
                                        {option.percentage}%
                                    </ParticipationPercentage>
                                )}
                            </TeamCenterContainer>
                        )}

                        {/* 오른쪽 팀 (index === 2) */}
                        {index === 2 && (
                            <TeamRightContainer>
                                <TeamRightNameContainer>
                                    <TeamName small={selected !== null || isConfirmed}>
                                        {option.name}
                                    </TeamName>
                                    {(selected !== null || isConfirmed) && (
                                        <ParticipationPercentage>
                                            {option.percentage}%
                                        </ParticipationPercentage>
                                    )}
                                </TeamRightNameContainer>
                                {option.logo && (
                                    <TeamLogo
                                        src={option.logo}
                                        alt={option.name}
                                        small={selected !== null || isConfirmed}
                                    />
                                )}
                            </TeamRightContainer>
                        )}

                        {/* 카운트 표시 및 컨트롤 버튼 */}
                        {(index === 0 || index === 2) && (
                            <CountDisplay
                                isVisible={(showCountControls && !isConfirmed) || isConfirmed}
                                isLeft={index === 2}
                                isZero={counts[index] === 0}
                                style={{
                                    backgroundColor: getCountDisplayColor(index)
                                }}
                            >
                                {counts[index]}
                            </CountDisplay>
                        )}
                        {index === 0 && !isConfirmed && (
                            <ExtraContentRight isVisible={showCountControls}>
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
                        {index === 2 && !isConfirmed && (
                            <ExtraContentLeft isVisible={showCountControls}>
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

            {selected !== null && !isConfirmed && (
                <ConfirmButton
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent container click event
                        handleConfirm();
                    }}
                    disabled={
                        (selected === 1) && (counts[0] !== counts[2]) ||
                        (selected === 0) && (counts[0] <= counts[2]) ||
                        (selected === 2) && (counts[0] >= counts[2])
                    }
                >선택 완료</ConfirmButton>
            )}
            <JoinedText>{data.games.gambleResult.participationNumber}명 참여</JoinedText>
        </MatchCardContainer>
    );
};

export default MatchCard;