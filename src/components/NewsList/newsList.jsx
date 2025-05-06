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

const NewsList = ({ type }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { selectedTeam } = useLeagueTeamStore();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const result = await getHomeNewsList(type || " ");
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
    if (type === "other") return "함께 볼 만한 뉴스";
    if (selectedTeam?.nameKr)
      return (
          <>
            함께 볼 만한 <span style={{ color: "red" }}>{selectedTeam.nameKr}</span> 뉴스
          </>
      );
    return "함께 볼 만한 뉴스";
  };

  if (loading) return <div>로딩 중...</div>;

  return (
      <NewsListContainer>
        <NewsHeader>
          <div className="title">{getHeaderText()}</div>
          <MoreLink as={Link} to="/news">
            더보기 <MoreIcon />
          </MoreLink>
        </NewsHeader>
        <NewsItemsWrapper>
          {newsItems.length === 0 ? (
              <NoData />
          ) : (
              newsItems.map((item) => (
                  <NewsItem key={item.pk} {...item} />
              ))
          )}
        </NewsItemsWrapper>
      </NewsListContainer>
  );
};

export default NewsList;