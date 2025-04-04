import React from "react";
import { NewsListContainer, NewsHeader, MoreLink, MoreIcon, NewsItemsWrapper } from "./NewsList.style";
import NewsItem from "./NewsItem";

const NewsList = () => {
  const initialNewsItems = [
    {
      badge: "부상",
      title: "제주SK, FC서울 상대로 다음 달 '홈 개막전'",
      content:
        "프로축구 K리그1 제주SK가 다음 달 15일 FC서울과의 홈 개막전을 시작으로 2025시즌에 돌입합니다. 한국프로축구연맹이 발표한 2025시즌 일정표를 보면 제주는 다음 달 15일 오후 3시 30분 제주월드컵경...",
      nickname: "닉네임",
      time: "1시간 전",
      reads: "1,204",
      comments: "56",
      likes: "20",
      thumbnail: "/src/assets/thumbnail.png",
    },
    {
      badge: "부상",
      title: "제주SK, FC서울 상대로 다음 달 '홈 개막전'",
      content:
        "프로축구 K리그1 제주SK가 다음 달 15일 FC서울과의 홈 개막전을 시작으로 2025시즌에 돌입합니다. 한국프로축구연맹이 발표한 2025시즌 일정표를 보면 제주는 다음 달 15일 오후 3시 30분 제주월드컵경...",
      nickname: "닉네임",
      time: "1시간 전",
      reads: "1,204",
      comments: "56",
      likes: "20",
      thumbnail: "/src/assets/thumbnail.png",
    },
    {
      badge: "부상",
      title: "제주SK, FC서울 상대로 다음 달 '홈 개막전'",
      content:
        "프로축구 K리그1 제주SK가 다음 달 15일 FC서울과의 홈 개막전을 시작으로 2025시즌에 돌입합니다. 한국프로축구연맹이 발표한 2025시즌 일정표를 보면 제주는 다음 달 15일 오후 3시 30분 제주월드컵경...",
      nickname: "닉네임",
      time: "1시간 전",
      reads: "1,204",
      comments: "56",
      likes: "20",
      thumbnail: "/src/assets/thumbnail.png",
    },
  ];

  return (
    <NewsListContainer>
      <NewsHeader>
        <div className="title">
          <span>함께 볼 만한</span>
          <span>FC 서울</span>
          <span>뉴스</span>
        </div>
        <MoreLink>
          더 보기
          <MoreIcon />
        </MoreLink>
      </NewsHeader>
      <NewsItemsWrapper>
        {initialNewsItems.map((item, index) => (
          <NewsItem key={index} {...item} />
        ))}
      </NewsItemsWrapper>
    </NewsListContainer>
  );
};

export default NewsList;
