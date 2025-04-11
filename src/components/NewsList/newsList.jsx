import React from "react";
import { NewsListContainer, NewsHeader, MoreLink, MoreIcon, NewsItemsWrapper } from "./NewsList.style";
import NewsItem from "./NewsItem";
import {newsList} from "../../mocks/newsList.js";
import { Link } from "react-router-dom";

const NewsList = ({ type }) => {
  return (
    <NewsListContainer>
      <NewsHeader>
          <div className="title">
              {type === "other" ? ( // 다른 팀 뉴스 상세에서는 <CommunityBoard type="other" />로 사용
                  "함께 볼 만한 뉴스"
              ) : (
                  <>
                      <span>함께 볼 만한</span> <span>FC 서울</span> <span>뉴스</span>
                  </>
              )}
          </div>
        <MoreLink as={Link} to="/news">
          더 보기
          <MoreIcon />
        </MoreLink>
      </NewsHeader>
      <NewsItemsWrapper>
        {newsList.slice(0, 3).map((item, index) => (
          <NewsItem key={index} {...item} />
        ))}
      </NewsItemsWrapper>
    </NewsListContainer>
  );
};

export default NewsList;
