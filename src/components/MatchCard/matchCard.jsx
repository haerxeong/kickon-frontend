import React, {useEffect, useState} from "react";
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
import {fetchMatchData} from "../../apis/domains/common/getMatchList.js";
import {getProfilecard} from "../../apis/domains/common/getProfilecard.js";
import {postMatchPrediction} from "../../apis/domains/common/postGamble.js";
import {patchMatchPrediction} from "../../apis/domains/common/patchGamble.js";
import LoadingSpinner from "../LoadingSpinner/loadingSpinner.jsx";


const MatchCard = ({league}) => {
    const [proceedingData, setProceedingData] = useState({
        name: "",
        games: []
    });

    const [finishedData, setFinishedData] = useState({
        name: "",
        games: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize state for selected games, counts, and confirmations
    const [selectedGames, setSelectedGames] = useState([]);
    const [countsForGames, setCountsForGames] = useState([]);
    const [confirmedGames, setConfirmedGames] = useState([]);
    const [editedGames, setEditedGames] = useState([]);

    // Fetch both proceeding and finished data on component mount
    useEffect(() => {
        const loadMatchData = async () => {
            try {
                setLoading(true);

                const profileData = await getProfilecard();
                const leaguePk = profileData?.leaguePk;

                if (!leaguePk) {
                    throw new Error('League information not found in user profile');
                }
                // Fetch proceeding matches
                const proceedingResult = await fetchMatchData(leaguePk, "proceeding");
                setProceedingData(proceedingResult || { name: "", games: [] });

                // Fetch finished matches
                const finishedResult = await fetchMatchData(leaguePk, "finished");
                setFinishedData(finishedResult || { name: "", games: [] });

                // Initialize state arrays based on the number of proceeding games
                const games = proceedingResult?.games || [];
                const initialCountsForGames = games.map((game) => {
                    if (game?.myGambleResult) {
                        return {
                            0: game.myGambleResult.homeScore,
                            2: game.myGambleResult.awayScore
                        };
                    }
                    return { 0: 0, 2: 0 };
                });

                setCountsForGames(initialCountsForGames);
                setSelectedGames(games.map(() => null));
                setConfirmedGames(games.map((game) => game?.myGambleResult !== null));
                setEditedGames(games.map(() => false));

                console.log("Proceeding data:", proceedingResult);
                console.log("Proceeding games:", proceedingResult?.games);
                console.log("Finished data:", finishedResult);
                console.log("Finished games:", finishedResult?.games);

                setError(null);
            } catch (err) {
                console.error("데이터 로딩 중 오류 발생:", err);
                setError("매치 데이터를 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        loadMatchData();
    }, [league]);

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

    const getRemainingTime = (dateString) => {
        const now = new Date();
        const targetDate = new Date(dateString);

        // 밀리초 단위의 차이를 계산
        const diffMs = targetDate - now;

        // 음수면 이미 지난 시간이므로 빈 문자열 반환
        if (diffMs <= 0) {
            return "";
        }

        // 분, 시간 단위로 변환
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours >= 24) {
            const diffDays = Math.floor(diffHours / 24);
            return `마감 ${diffDays}일 전`;
        } else if (diffHours >= 1) {
            return `마감 ${diffHours}시간 전`;
        } else {
            return `마감 ${diffMinutes}분 전`;
        }
    };

    const handleConfirm = async (gameIndex) => {
        const game = proceedingData.games[gameIndex];
        const counts = countsForGames[gameIndex];

        try {
            // 이미 예측이 있으면 PATCH, 없으면 POST
            if (game.myGambleResult) {
                // PATCH: myGambleResult.gamble이 gambleId임
                const gambleId = game.myGambleResult.id;
                const result = await patchMatchPrediction(
                    gambleId,
                    counts[0],
                    counts[2]
                );
                if (typeof result === 'string') {
                    alert(result);
                } else {
                    // 성공 처리 후 UI 업데이트
                    updateUIAfterConfirmation(gameIndex, counts);
                }
            } else {
                // POST
                const result = await postMatchPrediction(
                    game.pk, // 또는 game.id
                    counts[0],
                    counts[2]
                );
                if (typeof result === 'string') {
                    alert(result);
                } else {
                    // 성공 처리 후 UI 업데이트
                    updateUIAfterConfirmation(gameIndex, counts);
                }
            }
        } catch (error) {
            console.error("예측 제출 중 오류 발생:", error);
            alert("예측 제출 중 오류가 발생했습니다.");
        }
    };

    // API 호출 성공 후 UI 업데이트를 위한 함수
    const updateUIAfterConfirmation = (gameIndex, counts) => {
        // 확인 상태 업데이트
        const newConfirmedGames = [...confirmedGames];
        newConfirmedGames[gameIndex] = true;
        setConfirmedGames(newConfirmedGames);

        // proceedingData 업데이트 (깊은 복사)
        const newProceedingData = JSON.parse(JSON.stringify(proceedingData));

        // 해당 게임의 myGambleResult 업데이트
        if (!newProceedingData.games[gameIndex].myGambleResult) {
            newProceedingData.games[gameIndex].myGambleResult = {
                homeScore: counts[0],
                awayScore: counts[2]
            };
        } else {
            newProceedingData.games[gameIndex].myGambleResult.homeScore = counts[0];
            newProceedingData.games[gameIndex].myGambleResult.awayScore = counts[2];
        }

        setProceedingData(newProceedingData);

        // 편집 상태 초기화
        const newEditedGames = [...editedGames];
        newEditedGames[gameIndex] = false;
        setEditedGames(newEditedGames);

        // 선택 상태 초기화
        const newSelectedGames = [...selectedGames];
        newSelectedGames[gameIndex] = null;
        setSelectedGames(newSelectedGames);
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
        // Check if "미참여" status
        if (game.myGambleResult === null) {
            return "#AFAFAF"; // Gray color for "미참여"
        }

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

    // Function to determine the status text for RightBadge
    const getStatusText = (game, isFinished) => {
        // For all games (both proceeding and finished)
        if (game.gameStatus === "PENDING" && !isFinished) {
            return "예측 진행중";
        }

        // For both proceeding and finished games
        return game.myGambleResult !== null ? "참여 완료" : "미참여";
    };

    // Function to determine the badge styles
    const getBadgeStyles = (game, isFinished) => {
        // For "미참여" status
        if (game.myGambleResult === null && !(game.gameStatus === "PENDING" && !isFinished)) {
            return {
                backgroundColor: "#AFAFAF",
                color: "#FFFFFF"
            };
        }
        return {}; // Default styles
    };

    const renderMatchCard = (game, gameIndex, isFinished = false) => {
        const showCountControls = !isFinished && selectedGames[gameIndex] !== null;
        const isConfirmed = isFinished || confirmedGames[gameIndex];
        const isNotParticipated = game.myGambleResult === null && !(game.gameStatus === "PENDING" && !isFinished);

        return (
            <MatchCardContainer key={`game-${isFinished ? "finished-" : ""}${gameIndex}`}>
                <StyledTopContainer>
                    <LeftText>{isFinished ? finishedData.name : proceedingData.name}</LeftText>
                    <RightBadge style={getBadgeStyles(game, isFinished)}>
                        {getStatusText(game, isFinished)}
                    </RightBadge>
                </StyledTopContainer>
                {!isFinished && <RightText>{getRemainingTime(game.startAt)}</RightText>}
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
                                            : getCountDisplayColor(gameIndex, optionIndex),
                                        color: isNotParticipated && isFinished ? "#FFFFFF" : undefined
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

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <></>;
    }

    return (
        <>
            {console.log("Rendering with proceeding games:", proceedingData)}
            {console.log("Rendering with finished games:", finishedData.games)}

            {proceedingData.games.map((game, gameIndex) => renderMatchCard(game, gameIndex))}

            <Divider/>

            {finishedData.games.map((game, gameIndex) => renderMatchCard(game, gameIndex, true))}
        </>
    );
};

export default MatchCard;