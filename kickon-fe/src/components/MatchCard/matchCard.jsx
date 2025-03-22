// matchCard.jsx
import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 12px;
`;

const LeagueInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const LeagueName = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

const LeagueTag = styled.span`
  background-color: #333;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 12px;
  margin-left: 8px;
`;

const MatchDate = styled.div`
  font-size: 12px;
  color: #666;
`;

const MatchContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;

const TeamLogo = styled.img`
  width: 36px;
  height: 36px;
  margin-bottom: 8px;
`;

const TeamName = styled.div`
  font-size: 12px;
  text-align: center;
`;

const TeamScore = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.highlight ? '#ff0000' : '#333'};
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MatchStatus = styled.div`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 8px;
`;

const MatchCard = () => {
    return (
        <CardContainer>
            <LeagueInfo>
                <LeagueName>
                    K리그1 <LeagueTag>경기 전</LeagueTag>
                </LeagueName>
                <MatchDate>03/24 20:00</MatchDate>
            </LeagueInfo>

            <MatchContent>
                <Team>
                    <TeamLogo src="/fc-seoul.png" alt="FC 서울" />
                    <TeamName>FC 서울</TeamName>
                </Team>

                <ScoreContainer>
                    <TeamScore highlight={true}>1</TeamScore>
                    <span>:</span>
                    <TeamScore>0</TeamScore>
                </ScoreContainer>

                <Team>
                    <TeamLogo src="/suwon-fc.png" alt="수원FC" />
                    <TeamName>수원FC</TeamName>
                </Team>
            </MatchContent>

            <MatchStatus>1:30분 진행 중</MatchStatus>
        </CardContainer>
    );
};

export default MatchCard;