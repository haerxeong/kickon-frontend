import React, { useState } from "react";
import * as S from "./rankingTable.style";
import { League } from "../../mocks/league.js";
import { IoChevronDown } from "react-icons/io5";

const RankingTable = ({ title, rankings, type = "season" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("K리그 1");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league.krName);
    setIsOpen(false);
  };

  return (
    <S.TableContainer>
      <S.Title>{title}</S.Title>
      <S.Divider />
      <S.LeagueSelector onClick={toggleDropdown}>
        <span>{selectedLeague}</span>
        <IoChevronDown size="0.7rem" color="#8F8F8F" />
      </S.LeagueSelector>

      {isOpen && (
        <S.DropdownMenu>
          {League.map((league) => (
            <S.TabOption
              key={league.pk}
              onClick={() => handleLeagueSelect(league)}
            >
              <S.LeagueImage src={league.logoUrl} alt={league.krName} />
              <S.LeagueName>{league.krName}</S.LeagueName>
            </S.TabOption>
          ))}
        </S.DropdownMenu>
      )}

      <S.Divider />

      <S.Table>
        <thead>
          <S.HeaderRow type={type}>
            <S.TableHeader align="left">순위</S.TableHeader>
            <S.TableHeader align="center"></S.TableHeader>
            {type === "season" ? (
              <>
                <S.TableHeader align="center">경기</S.TableHeader>
                <S.TableHeader align="center">승점</S.TableHeader>
                <S.TableHeader align="center">득점</S.TableHeader>
              </>
            ) : (
              <>
                <S.TableHeader />
                <S.TableHeader align="center">경기</S.TableHeader>
                <S.TableHeader align="center">점수</S.TableHeader>
              </>
            )}
          </S.HeaderRow>
        </thead>
        <tbody>
          {rankings.slice(0, 10).map((item, index) => (
            <S.TableRow key={index}>
              <S.TableData>{item.rankOrder}</S.TableData>

              <S.TeamCell>
                <S.TeamLogo
                  src={item.teamLogoUrl}
                  alt={`${item.teamName} logo`}
                />
                <S.TableData>{item.teamName}</S.TableData>
              </S.TeamCell>

              {type === "season" ? (
                <>
                  <S.TableData>{item.gameNum}</S.TableData>
                  <S.TableData>{item.points}</S.TableData>
                  <S.TableData>{item.wonScores}</S.TableData>
                </>
              ) : (
                <>
                  <S.TableData />
                  <S.TableData>{item.gameNum}</S.TableData>
                  <S.TableData>{item.points}</S.TableData>
                </>
              )}
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>
    </S.TableContainer>
  );
};

export default RankingTable;
