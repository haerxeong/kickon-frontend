import React from "react";
import {
  NewsItemContainer,
  NewsBadge,
  NewsTitle,
  NewsContent,
  NewsInfo,
  Nickname,
  Time,
  Reads,
  Comments,
  Likes,
  Thumbnail,
  ProfileIcon,
  ProfileCheckIcon,
  GoodIcon,
  CommentIcon,
  Divider,
  ContentWrapper,
  TextContentWrapper,
  LeftInfo,
  RightInfo,
  TopSection
} from "./NewsItem.style";

const NewsItem = ({ badge, title, content, nickname, time, reads, comments, likes, thumbnail }) => {
  return (
      <NewsItemContainer>
        <ContentWrapper>
          <TextContentWrapper>
            <TopSection>
              <div>
                <NewsBadge>{badge}</NewsBadge>
                <NewsTitle>{title}</NewsTitle>
                <NewsContent>{content}</NewsContent>
                <LeftInfo>
                  <ProfileIcon />
                  <Nickname>{nickname}</Nickname>
                  <ProfileCheckIcon />
                  <Time>{time}</Time>
                  <Divider>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="12" viewBox="0 0 2 12" fill="none">
                      <path d="M1 0V12" stroke="#8C8C8C" strokeLinejoin="round"/>
                    </svg>
                  </Divider>
                  <Reads>읽음 {reads}</Reads>
                </LeftInfo>
              </div>
              {thumbnail && <Thumbnail src={thumbnail} alt="Thumbnail" />}
            </TopSection>
            <RightInfo>
              <GoodIcon />
              <Likes>{likes}</Likes>
              <CommentIcon />
              <Comments>{comments}</Comments>
            </RightInfo>
          </TextContentWrapper>
        </ContentWrapper>
      </NewsItemContainer>
  );
};

export default NewsItem;