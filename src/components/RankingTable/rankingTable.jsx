import React, { useState, useEffect } from "react";
import * as S from "./rankingTable.style";
import { IoChevronDown } from "react-icons/io5";
import {
  getActualSeasonRanking,
  getGambleSeasonRanking,
  getLeagueList,
} from "../../apis/domains/ranking/ranking.js";
import { getProfilecard } from "../../apis/domains/common/getProfilecard.js";
import NoData from "../NoData/noData.jsx"
import LoadingSpinner from "../LoadingSpinner/loadingSpinner.jsx";
import { RiQuestionLine } from "react-icons/ri";

const RankingTable = ({ title, type = "season" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 리그 목록과 사용자 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [leaguesResponse, userInfoResponse] = await Promise.all([
          getLeagueList(),
          getProfilecard()
        ]);

        console.log('리그 목록 응답:', leaguesResponse);
        console.log('사용자 정보 응답:', userInfoResponse);

        if (leaguesResponse && leaguesResponse.data) {
          setLeagues(leaguesResponse.data);
          
          // 사용자가 로그인되어 있고 선호 리그가 있는 경우
          if (userInfoResponse && userInfoResponse.leaguePk) {
            console.log('선호 리그 ID:', userInfoResponse.leaguePk);
            const preferredLeague = leaguesResponse.data.find(
              league => league.pk === userInfoResponse.leaguePk
            );
            console.log('찾은 선호 리그:', preferredLeague);
            if (preferredLeague) {
              setSelectedLeague(preferredLeague);
            } else {
              // 선호 리그를 찾지 못한 경우 첫 번째 리그를 기본값으로 설정
              setSelectedLeague(leaguesResponse.data[0]);
            }
          } else {
            // 로그인하지 않았거나 선호 리그가 없는 경우 첫 번째 리그를 기본값으로 설정
            setSelectedLeague(leaguesResponse.data[0]);
          }
        } else {
          setError("리그 목록을 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("데이터 가져오기 실패:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 순위 데이터 가져오기 (시즌 또는 승부예측)
  const fetchRankings = async (leagueId) => {
    if (!leagueId) return;

    try {
      setLoading(true);
      setError(null);

      console.log(`리그 ID: ${leagueId}, 타입: ${type} 데이터 요청 중...`);

      // 타입에 따라 다른 API 호출
      let response;
      if (type === "season") {
        response = await getActualSeasonRanking({ league: leagueId });
      } else if (type === "gamble") {
        response = await getGambleSeasonRanking({ league: leagueId });
      }

      console.log("받은 응답:", response);

      if (response && response.data) {
        if (Array.isArray(response.data)) {
          setRankings(response.data);
        } else if (Array.isArray(response.data.data)) {
          setRankings(response.data.data);
        } else {
          setRankings([]);
          setError("순위 데이터를 불러오는데 실패했습니다.");
        }
      } else {
        setRankings([]);
        setError("순위 데이터를 불러오는데 실패했습니다.");
      }
    } catch (err) {
      console.error("순위 데이터 가져오기 실패:", err);
      setError("순위 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 선택된 리그가 변경될 때 순위 데이터 가져오기
  useEffect(() => {
    if (selectedLeague) {
      fetchRankings(selectedLeague.pk);
    }
  }, [selectedLeague, type]); // type이 변경될 때도 데이터를 다시 가져오도록 의존성 배열에 추가

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league);
    setIsOpen(false);
  };

  return (
    <S.TableContainer>
      <S.Title>
        {title}
        {type === "gamble" && (
            <S.HelpWrapper>
              <RiQuestionLine size="0.8rem" color="#aaa" style={{ verticalAlign: "center" }}/>
              <S.Tooltip>
                승부예측은 경기 결과를 맞히는 기능입니다.<br />
                예측이 적중하면 포인트가 적립되고,<br />
                이 포인트를 기반으로 내가 응원하는 팀의<br />
                승부예측 순위가 결정됩니다.<br />
              </S.Tooltip>
            </S.HelpWrapper>
        )}
      </S.Title>
      <S.Divider />
      {selectedLeague && (
        <S.LeagueSelector onClick={toggleDropdown}>
          <span>{selectedLeague.nameKr}</span>
          <IoChevronDown size="0.7rem" color="#8F8F8F" />
        </S.LeagueSelector>
      )}

      {isOpen && (
        <S.DropdownMenu>
          {leagues.map((league) => (
            <S.TabOption
              key={league.pk}
              onClick={() => handleLeagueSelect(league)}
            >
              <S.LeagueImage src={league.logoUrl} alt={league.nameKr} />
              <S.LeagueName>{league.nameKr}</S.LeagueName>
            </S.TabOption>
          ))}
        </S.DropdownMenu>
      )}
      <S.Divider />
      <S.Table>
        <thead>
          <S.HeaderRow type={type}>
            <S.TableHeader>순위</S.TableHeader>
            <S.TableHeader></S.TableHeader>
            {type === "season" ? (
              <>
                <S.TableHeader>경기</S.TableHeader>
                <S.TableHeader>승점</S.TableHeader>
                <S.TableHeader>득점</S.TableHeader>
              </>
            ) : (
              <>
                <S.TableHeader>경기</S.TableHeader>
                <S.TableHeader>점수</S.TableHeader>
                <S.TableHeader />
              </>
            )}
          </S.HeaderRow>
        </thead>
        <tbody>
        {loading ? (
            <LoadingSpinner />
        ) : error ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem", color: "red" }}>
                {error}
              </td>
            </tr>
        ) : rankings.length === 0 ? (
            <tr>
              <td colSpan="6">
                <NoData onRetry={() => fetchRankings(selectedLeague.pk)} />
              </td>
            </tr>
        ) : (
            rankings.slice(0, 10).map((item) => (
                <S.TableRow key={item.rankOrder}>
                  <S.TableData>{item.rankOrder}</S.TableData>
                  <S.TeamCell>
                    <S.TeamLogo
                        src={item.teamLogoUrl}
                        alt={item.teamName}
                        onError={(e) => {
                          e.target.src = "/path/to/default-logo.png";
                        }}
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
                        <S.TableData>{item.gameNum}</S.TableData>
                        <S.TableData>
                          {type === "gamble"
                              ? (item.points / 1000).toFixed(3)
                              : item.points}
                        </S.TableData>
                        <S.TableData />
                      </>
                  )}
                </S.TableRow>
            ))
        )}
        </tbody>
      </S.Table>
    </S.TableContainer>
  );
};

export default RankingTable;
