import React, { useState, useEffect } from "react";
import { NewsListContainer, NewsHeader, MoreLink, MoreIcon, NewsItemsWrapper } from "./NewsList.style";
import NewsItem from "./NewsItem";
import { Link } from "react-router-dom";
import axiosInstance from "../../apis/axios-instance";
import { getUserInfo } from "../../apis/domains/main/getUserInfo";
import { useLeagueTeamStore } from "../../store/useLeagueTeamStore"; // 추가된 import
import { getHomeNewsList } from "../../apis/domains/main/getHomeNewsList.js";

const NewsList = ({ type }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [userInfo, setUserInfo] = useState({ isLoggedIn: false });
  const [loading, setLoading] = useState(true);
  const { selectedTeam } = useLeagueTeamStore(); // Zustand 스토어에서 선택된 팀 정보 가져오기

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const userInfoResponse = await getUserInfo();
        setUserInfo(userInfoResponse);

        const newsItems = await getHomeNewsList(type || ' ');
        setNewsItems(Array.isArray(newsItems) ? newsItems : []);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  // 헤더 텍스트 생성 함수
  const getHeaderText = () => {
    if (type === "other") {
      return "함께 볼 만한 뉴스";
    }

    if (selectedTeam && selectedTeam.nameKr) {
      return (
          <>
            함께 볼 만한 <span style={{ color: 'red' }}>{selectedTeam.nameKr}</span> 뉴스
          </>
      );
    }

    return "함께 볼 만한 뉴스";
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <NewsListContainer>
      <NewsHeader>
        <div className="title">
          {getHeaderText()}
        </div>
        <MoreLink as={Link} to="/news">
          더보기 <MoreIcon />
        </MoreLink>
      </NewsHeader>
      <NewsItemsWrapper>
        {newsItems.map((item, index) => (
          <NewsItem
            key={index}
            pk={item.pk}
            title={item.title}
            content={item.content}
            thumbnailUrl={item.thumbnailUrl}
            user={item.user}
            createdAt={item.createdAt}
            views={item.views}
            likes={item.likes}
            replies={item.replies}
            category={item.category}
          />
        ))}
      </NewsItemsWrapper>
    </NewsListContainer>
  );
};

export default NewsList;
