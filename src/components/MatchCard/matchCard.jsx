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
    TeamLeftContainer,
    TeamCenterContainer,
    TeamRightContainer,
    TeamNameContainer,
    TeamRightNameContainer, Divider
} from "./matchCard.style.js";
import chevronUp from "../../assets/chevron_up.svg";
import chevronDown from "../../assets/chevron_down.svg";
import chevronDownNon from "../../assets/chevron_down_non.svg";


const MatchCard = () => {
    const proceeding_data = {
        name: "K리그 1",
        games: [
            {
                homeTeam: {
                    name: "사우샘프턴",
                    logoUrl: "https://media.api-sports.io/football/teams/41.png"
                },
                awayTeam: {
                    name: "아스톤 빌라",
                    logoUrl: "https://media.api-sports.io/football/teams/66.png"
                },
                gameStatus: "예측 진행중",
                startAt: "2025-04-05T11:30:00",
                gambleResult: {
                    home: 50,
                    away: 45,
                    draw: 5,
                    participationNumber: 1204
                }
            },
            {
                homeTeam: {
                    name: "FC 서울",
                    logoUrl: "https://media.api-sports.io/football/teams/45.png"
                },
                awayTeam: {
                    name: "수원 FC",
                    logoUrl: "https://media.api-sports.io/football/teams/42.png"
                },
                gameStatus: "참여완료",
                startAt: "2025-04-05T11:30:00",
                gambleResult: {
                    home: 50,
                    away: 45,
                    draw: 5,
                    participationNumber: 1204
                }
            }
        ]
    };
    const finished_data = {
        name: "K리그 1",
        games: [
            {
                homeTeam: {
                    name: "사우샘프턴",
                    logoUrl: "https://media.api-sports.io/football/teams/41.png"
                },
                awayTeam: {
                    name: "아스톤 빌라",
                    logoUrl: "https://media.api-sports.io/football/teams/66.png"
                },
                gameStatus: "예측 진행중",
                startAt: "2025-04-05T11:30:00",
                gambleResult: {
                    home: 50,
                    away: 45,
                    draw: 5,
                    participationNumber: 1204
                }
            },
            {
                homeTeam: {
                    name: "FC 서울",
                    logoUrl: "https://media.api-sports.io/football/teams/45.png"
                },
                awayTeam: {
                    name: "수원 FC",
                    logoUrl: "https://media.api-sports.io/football/teams/42.png"
                },
                gameStatus: "참여완료",
                startAt: "2025-04-05T11:30:00",
                gambleResult: {
                    home: 50,
                    away: 45,
                    draw: 5,
                    participationNumber: 1204
                }
            }
        ]
    };

    const [selectedGames, setSelectedGames] = useState(proceeding_data.games.map(() => null));
    const [countsForGames, setCountsForGames] = useState(proceeding_data.games.map(() => ({ 0: 0, 2: 0 })));
    const [confirmedGames, setConfirmedGames] = useState(proceeding_data.games.map(() => false));

    const handleClick = (gameIndex, optionIndex) => {
        const newSelectedGames = [...selectedGames];

        if (optionIndex === 1) {
            const newCountsForGames = [...countsForGames];
            newCountsForGames[gameIndex] = { 0: 0, 2: 0 };
            setCountsForGames(newCountsForGames);
        }

        newSelectedGames[gameIndex] = newSelectedGames[gameIndex] === optionIndex ? null : optionIndex;
        setSelectedGames(newSelectedGames);
    };

    const handleContainerClick = (gameIndex) => {
        if (confirmedGames[gameIndex]) {
            const newConfirmedGames = [...confirmedGames];
            newConfirmedGames[gameIndex] = false;
            setConfirmedGames(newConfirmedGames);
        }
    };

    const incrementCount = (event, gameIndex, optionIndex) => {
        event.stopPropagation();

        const newCountsForGames = [...countsForGames];

        if (selectedGames[gameIndex] === 1) {
            newCountsForGames[gameIndex] = {
                ...newCountsForGames[gameIndex],
                0: newCountsForGames[gameIndex][0] + 1,
                2: newCountsForGames[gameIndex][2] + 1
            };
        } else {
            newCountsForGames[gameIndex] = {
                ...newCountsForGames[gameIndex],
                [optionIndex]: newCountsForGames[gameIndex][optionIndex] + 1
            };
        }

        setCountsForGames(newCountsForGames);
    };

    const decrementCount = (event, gameIndex, optionIndex) => {
        event.stopPropagation();

        const newCountsForGames = [...countsForGames];

        if (selectedGames[gameIndex] === 1) {
            newCountsForGames[gameIndex] = {
                ...newCountsForGames[gameIndex],
                0: Math.max(0, newCountsForGames[gameIndex][0] - 1),
                2: Math.max(0, newCountsForGames[gameIndex][2] - 1)
            };
        } else {
            newCountsForGames[gameIndex] = {
                ...newCountsForGames[gameIndex],
                [optionIndex]: Math.max(0, newCountsForGames[gameIndex][optionIndex] - 1)
            };
        }

        setCountsForGames(newCountsForGames);
    };

    const handleConfirm = (gameIndex) => {
        const newConfirmedGames = [...confirmedGames];
        newConfirmedGames[gameIndex] = true;
        setConfirmedGames(newConfirmedGames);
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

    const getCountDisplayColor = (gameIndex, optionIndex) => {
        const counts = countsForGames[gameIndex];
        if (counts[optionIndex] === 0) {
            return "#AFAFAF";
        }

        if (counts[0] === counts[2] && counts[0] > 0) {
            return "#C00C0B";
        }

        const maxCount = Math.max(counts[0], counts[2]);
        return counts[optionIndex] === maxCount ? "#C00C0B" : "#AFAFAF";
    };

    // Function to render a match card
    const renderMatchCard = (game, gameIndex, isFinished = false) => {
        const showCountControls = !isFinished && selectedGames[gameIndex] !== null;
        const isConfirmed = isFinished || confirmedGames[gameIndex];

        return (
            <MatchCardContainer key={`game-${isFinished ? "finished-" : ""}${gameIndex}`}>
                <StyledTopContainer>
                    <LeftText>{isFinished ? finished_data.name : proceeding_data.name}</LeftText>
                    <RightBadge>{isConfirmed ? "참여 완료" : game.gameStatus}</RightBadge>
                </StyledTopContainer>
                <RightText>마감 50분전</RightText>
                <TimeGuide>
                    <TimeTitle>경기 {isFinished ? "이후" : "전"}</TimeTitle>
                    <TimeText>{formatKoreanDate(game.startAt)}</TimeText>
                </TimeGuide>
                <MatchButtonContainer
                    onClick={() => !isFinished && handleContainerClick(gameIndex)}
                    style={{ cursor: (isConfirmed && !isFinished) ? 'pointer' : 'default' }}
                >
                    {[
                        {
                            name: game.homeTeam.name,
                            logo: game.homeTeam.logoUrl,
                            percentage: game.gambleResult.home,
                            value: game.gambleResult.home
                        },
                        {
                            name: "무승부",
                            logo: null,
                            percentage: game.gambleResult.draw,
                            value: game.gambleResult.draw
                        },
                        {
                            name: game.awayTeam.name,
                            logo: game.awayTeam.logoUrl,
                            percentage: game.gambleResult.away,
                            value: game.gambleResult.away
                        }
                    ].map((option, optionIndex) => (
                        <MatchButton
                            key={`game-${isFinished ? "finished-" : ""}${gameIndex}-option-${optionIndex}`}
                            aria-selected={!isFinished && selectedGames[gameIndex] === optionIndex}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isFinished) {
                                    handleClick(gameIndex, optionIndex);
                                }
                            }}
                            disabled={isConfirmed || isFinished}
                        >
                            {optionIndex === 0 && (
                                <TeamLeftContainer>
                                    {option.logo && (
                                        <TeamLogo
                                            src={option.logo}
                                            alt={option.name}
                                            small={(isFinished || selectedGames[gameIndex] !== null || isConfirmed)}
                                        />
                                    )}
                                    <TeamNameContainer>
                                        <TeamName small={(isFinished || selectedGames[gameIndex] !== null || isConfirmed)}>
                                            {option.name}
                                        </TeamName>
                                        {(isFinished || selectedGames[gameIndex] !== null || isConfirmed) && (
                                            <ParticipationPercentage>
                                                {option.percentage}%
                                            </ParticipationPercentage>
                                        )}
                                    </TeamNameContainer>
                                </TeamLeftContainer>
                            )}

                            {optionIndex === 1 && (
                                <TeamCenterContainer>
                                    <TeamName small={(isFinished || selectedGames[gameIndex] !== null || isConfirmed)}>
                                        {option.name}
                                    </TeamName>
                                    {(isFinished || selectedGames[gameIndex] !== null || isConfirmed) && (
                                        <ParticipationPercentage>
                                            {option.percentage}%
                                        </ParticipationPercentage>
                                    )}
                                </TeamCenterContainer>
                            )}

                            {optionIndex === 2 && (
                                <TeamRightContainer>
                                    <TeamRightNameContainer>
                                        <TeamName small={(isFinished || selectedGames[gameIndex] !== null || isConfirmed)}>
                                            {option.name}
                                        </TeamName>
                                        {(isFinished || selectedGames[gameIndex] !== null || isConfirmed) && (
                                            <ParticipationPercentage>
                                                {option.percentage}%
                                            </ParticipationPercentage>
                                        )}
                                    </TeamRightNameContainer>
                                    {option.logo && (
                                        <TeamLogo
                                            src={option.logo}
                                            alt={option.name}
                                            small={(isFinished || selectedGames[gameIndex] !== null || isConfirmed)}
                                        />
                                    )}
                                </TeamRightContainer>
                            )}

                            {(optionIndex === 0 || optionIndex === 2) && (
                                <CountDisplay
                                    isVisible={(isFinished || (showCountControls && !isConfirmed) || isConfirmed)}
                                    isLeft={optionIndex === 2}
                                    isZero={isFinished ? false : countsForGames[gameIndex][optionIndex] === 0}
                                    style={{
                                        backgroundColor: isFinished
                                            ? "#C00C0B"
                                            : getCountDisplayColor(gameIndex, optionIndex)
                                    }}
                                >
                                    {isFinished ? (optionIndex === 0 ? "1" : "0") : countsForGames[gameIndex][optionIndex]}
                                </CountDisplay>
                            )}
                            {optionIndex === 0 && !isFinished && !isConfirmed && (
                                <ExtraContentRight isVisible={showCountControls}>
                                    <CountButton onClick={(e) => incrementCount(e, gameIndex, optionIndex)}>
                                        <img src={chevronUp} alt="Increase" />
                                    </CountButton>
                                    <CountButton onClick={(e) => decrementCount(e, gameIndex, optionIndex)}>
                                        <img
                                            src={countsForGames[gameIndex][optionIndex] === 0 ? chevronDownNon : chevronDown}
                                            alt="Decrease"
                                        />
                                    </CountButton>
                                </ExtraContentRight>
                            )}
                            {optionIndex === 2 && !isFinished && !isConfirmed && (
                                <ExtraContentLeft isVisible={showCountControls}>
                                    <CountButton onClick={(e) => incrementCount(e, gameIndex, optionIndex)}>
                                        <img src={chevronUp} alt="Increase" />
                                    </CountButton>
                                    <CountButton onClick={(e) => decrementCount(e, gameIndex, optionIndex)}>
                                        <img
                                            src={countsForGames[gameIndex][optionIndex] === 0 ? chevronDownNon : chevronDown}
                                            alt="Decrease"
                                        />
                                    </CountButton>
                                </ExtraContentLeft>
                            )}
                        </MatchButton>
                    ))}
                </MatchButtonContainer>

                {!isFinished && selectedGames[gameIndex] !== null && !isConfirmed && (
                    <ConfirmButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm(gameIndex);
                        }}
                        disabled={
                            (selectedGames[gameIndex] === 1) && (countsForGames[gameIndex][0] !== countsForGames[gameIndex][2]) ||
                            (selectedGames[gameIndex] === 0) && (countsForGames[gameIndex][0] <= countsForGames[gameIndex][2]) ||
                            (selectedGames[gameIndex] === 2) && (countsForGames[gameIndex][0] >= countsForGames[gameIndex][2])
                        }
                    >선택 완료</ConfirmButton>
                )}
                <JoinedText>{game.gambleResult.participationNumber}명 참여</JoinedText>
            </MatchCardContainer>
        );
    };

    return (
        <>
            {/* Proceeding Games Section */}
            {proceeding_data.games.map((game, gameIndex) => renderMatchCard(game, gameIndex))}

            <Divider/>

            {/* Finished Games Section */}
            {finished_data.games.map((game, gameIndex) => renderMatchCard(game, gameIndex, true))}
        </>
    );
};

export default MatchCard;