import React, { useState } from "react";
import {
    MatchButton, StyledTopContainer, LeftText, RightBadge,
    TimeGuide, TimeText, MatchButtonContainer, MatchCardContainer,
    ExtraContentRight, ExtraContentLeft, CountButton, CountDisplay,
    ConfirmButton, JoinedText, TimeTitle, RightText,
    TeamName, TeamLogo, ParticipationPercentage, TeamLeftContainer,
    TeamCenterContainer, TeamRightContainer, TeamNameContainer,
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
                gameStatus: "                                                                             ",
                startAt: "2025-04-05T11:30:00",
                gambleResult: {
                    home: 50,
                    away: 45,
                    draw: 5,
                    participationNumber: 1204
                },
                myGambleResult: {
                    homeScore: 1,
                    awayScore: 1,
                    result: "HOME",
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
                },
                myGambleResult: null,
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
                },
                homeScore: 0,
                awayScore: 3,
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
                },
                homeScore: 1,
                awayScore: 1,
            }
        ]
    };

    // Initialize with myGambleResult scores or default to 0
    const initialCountsForGames = proceeding_data.games.map((game) => {
        if (game.myGambleResult) {
            return {
                0: game.myGambleResult.homeScore,
                2: game.myGambleResult.awayScore
            };
        }
        return { 0: 0, 2: 0 };
    });

    const [selectedGames, setSelectedGames] = useState(proceeding_data.games.map(() => null));
    const [countsForGames, setCountsForGames] = useState(initialCountsForGames);
    const [confirmedGames, setConfirmedGames] = useState(proceeding_data.games.map((game) =>
        game.myGambleResult !== null
    ));

    // To track if a user has edited an existing prediction
    const [editedGames, setEditedGames] = useState(proceeding_data.games.map(() => false));

    const handleClick = (gameIndex, optionIndex) => {
        const newSelectedGames = [...selectedGames];
        const newEditedGames = [...editedGames];
        newEditedGames[gameIndex] = true;
        setEditedGames(newEditedGames);

        // Reset scores to 0 when a user starts editing
        if (optionIndex === 1) {
            const newCountsForGames = [...countsForGames];
            newCountsForGames[gameIndex] = { 0: 0, 2: 0 };
            setCountsForGames(newCountsForGames);
        } else if (!newEditedGames[gameIndex]) {
            // Reset scores to 0 on first edit
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

            // Reset counts to 0 when reopening a confirmed prediction
            const newCountsForGames = [...countsForGames];
            newCountsForGames[gameIndex] = { 0: 0, 2: 0 };
            setCountsForGames(newCountsForGames);

            // Mark as edited
            const newEditedGames = [...editedGames];
            newEditedGames[gameIndex] = true;
            setEditedGames(newEditedGames);
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

    const getScoreValue = (game, gameIndex, optionIndex, isFinished) => {
        if (isFinished) {
            //경기끝났을때(구분선아래)
            return optionIndex === 0 ? game.homeScore : game.awayScore;
        } else {
            //경기전(구분선 위)
            return countsForGames[gameIndex][optionIndex];
        }
    };

    // Function to get the color for score display in finished games
    const getFinishedScoreColor = (game, optionIndex) => {
        const homeScore = game.homeScore;
        const awayScore = game.awayScore;

        if (homeScore > awayScore && optionIndex === 0) {
            return "#C00C0B";
        } else if (awayScore > homeScore && optionIndex === 2) {
            return "#C00C0B";
        } else {
            return "#AFAFAF";
        }
    };

    // Function to get background color for match buttons in finished games
    const getFinishedMatchBackground = (game, optionIndex) => {
        const homeScore = game.homeScore;
        const awayScore = game.awayScore;

        if (homeScore > awayScore && optionIndex === 0) {
            return "rgba(192, 12, 11, 0.20)";
        } else if (awayScore > homeScore && optionIndex === 2) {
            return "rgba(192, 12, 11, 0.20)";
        } else if (homeScore === awayScore && optionIndex === 1) {
            return "rgba(192, 12, 11, 0.20)";
        } else {
            return "#F0F0F0";
        }
    };

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
                            style={{
                                background: isFinished
                                    ? getFinishedMatchBackground(game, optionIndex)
                                    : undefined,
                                color: "#676767"
                            }}
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
                                        <TeamName
                                            small={(isFinished || selectedGames[gameIndex] !== null || isConfirmed)}
                                            style={{ color: "#676767" }}
                                        >
                                            {option.name}
                                        </TeamName>
                                        {(isFinished || selectedGames[gameIndex] !== null || isConfirmed) && (
                                            <ParticipationPercentage style={{ color: "#676767" }}>
                                                {option.percentage}%
                                            </ParticipationPercentage>
                                        )}
                                    </TeamNameContainer>
                                </TeamLeftContainer>
                            )}

                            {optionIndex === 1 && (
                                <TeamCenterContainer>
                                    <TeamName
                                        small={(isFinished || selectedGames[gameIndex] !== null || isConfirmed)}
                                        style={{ color: "#676767" }}
                                    >
                                        {option.name}
                                    </TeamName>
                                    {(isFinished || selectedGames[gameIndex] !== null || isConfirmed) && (
                                        <ParticipationPercentage style={{ color: "#676767" }}>
                                            {option.percentage}%
                                        </ParticipationPercentage>
                                    )}
                                </TeamCenterContainer>
                            )}

                            {optionIndex === 2 && (
                                <TeamRightContainer>
                                    <TeamRightNameContainer>
                                        <TeamName
                                            small={(isFinished || selectedGames[gameIndex] !== null || isConfirmed)}
                                            style={{ color: "#676767" }}
                                        >
                                            {option.name}
                                        </TeamName>
                                        {(isFinished || selectedGames[gameIndex] !== null || isConfirmed) && (
                                            <ParticipationPercentage style={{ color: "#676767" }}>
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
                                    isZero={isFinished ? false : getScoreValue(game, gameIndex, optionIndex, isFinished) === 0}
                                    style={{
                                        backgroundColor: isFinished
                                            ? getFinishedScoreColor(game, optionIndex)
                                            : getCountDisplayColor(gameIndex, optionIndex)
                                    }}
                                >
                                    {getScoreValue(game, gameIndex, optionIndex, isFinished)}
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
            {proceeding_data.games.map((game, gameIndex) => renderMatchCard(game, gameIndex))}

            <Divider/>

            {finished_data.games.map((game, gameIndex) => renderMatchCard(game, gameIndex, true))}
        </>
    );
};

export default MatchCard;