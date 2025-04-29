import React, { useState, useEffect } from "react";
import * as S from "./rankingTable.style";
import { IoChevronDown } from "react-icons/io5";
import { 
  getActualSeasonRanking, 
  getGambleSeasonRanking, 
  getLeagueList 
} from "../../apis/domains/ranking/ranking.js";

const RankingTable = ({ title, type = "season" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 리그 목록 가져오기
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        const response = await getLeagueList();
        
        if (response && response.data) {
          setLeagues(response.data);
          // 첫 번째 리그를 기본값으로 설정
          if (response.data.length > 0 && !selectedLeague) {
            setSelectedLeague(response.data[0]);
          }
        } else {
          setError("리그 목록을 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("리그 목록 가져오기 실패:", err);
        setError("리그 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
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
      
      console.log('받은 응답:', response);
      
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
      <S.Title>{title}</S.Title>
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
        <S.HeaderRow>
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
            </>
          )}
        </S.HeaderRow>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>로딩 중...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '1rem', color: 'red' }}>{error}</div>
        ) : (
          rankings.slice(0, 10).map((item) => (
            <S.TableRow key={item.rankOrder}>
              <S.TableData>{item.rankOrder}</S.TableData>
              <S.TeamCell>
                <S.TeamLogo 
                  src={item.teamLogoUrl} 
                  alt={item.teamName}
                  onError={(e) => {e.target.src = '/path/to/default-logo.png'}}
                />
                <S.TeamName>{item.teamName}</S.TeamName>
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
                  <S.TableData>{item.points}</S.TableData>
                </>
              )}
            </S.TableRow>
          ))
        )}
      </S.Table>
    </S.TableContainer>
  );
};

export default RankingTable;
