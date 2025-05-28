import React, { useEffect, useState } from "react";
import {
  NewsListContainer,
  NewsHeader,
  MoreLink,
  MoreIcon,
  NewsItemsWrapper,
} from "./NewsList.style";
import NewsItem from "./NewsItem";
import { Link } from "react-router-dom";
import { getHomeNewsList } from "../../apis/domains/main/getHomeNewsList.js";
import { useLeagueTeamStore } from "../../store/useLeagueTeamStore";
import NoData from "../../components/NoData/noData.jsx";
import LoadingSpinner from "../LoadingSpinner/loadingSpinner.jsx";

const NewsList = ({ type, onNewsClick, isCompact }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { selectedTeam } = useLeagueTeamStore();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const result = await getHomeNewsList(type || " ");
        console.log("뉴스 데이터 구조:", result);
        if (Array.isArray(result) && result.length > 0) {
          console.log("첫 번째 뉴스 아이템:", result[0]);
        }
        setNewsItems(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("뉴스 데이터 로딩 실패:", error);
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [type]);

  const getHeaderText = () => {
    if (type === "other") {
      return selectedTeam?.nameKr 
        ? <>함께 볼 만한 <span style={{ color: "red" }}>{selectedTeam.nameKr}</span> 뉴스</>
        : "함께 볼 만한 뉴스";
    }
    
    if (selectedTeam?.nameKr) {
      return (
          <>
            함께 볼 만한 <span style={{ color: "red" }}>{selectedTeam.nameKr}</span> 뉴스
          </>
      );
    }
    
    return "함께 볼 만한 뉴스";
  };

  if (loading) return <LoadingSpinner />;

  // 컴팩트 모드인 경우 표시할 뉴스 아이템 갯수 제한
  const displayItems = isCompact ? newsItems.slice(0, 3) : newsItems;

  return (
      <NewsListContainer className={isCompact ? 'compact' : ''}>
        <NewsHeader>
          <div className="title">{getHeaderText()}</div>
          {!onNewsClick && (
            <MoreLink as={Link} to="/news">
              더보기 <MoreIcon />
            </MoreLink>
          )}
        </NewsHeader>
        <NewsItemsWrapper>
          {displayItems.length === 0 ? (
              <NoData />
          ) : (
              displayItems.map((item) => (
                  <NewsItem 
                    key={item.pk} 
                    {...item} 
                    onNewsClick={onNewsClick}
                    isCompact={isCompact} 
                  />
              ))
          )}
        </NewsItemsWrapper>
      </NewsListContainer>
  );
};

export default NewsList;