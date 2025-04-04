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

const NewsItem = ({ title, content, thumbnailUrl, user, createdAt, views, likes, replies, category }) => {
  return (
      <NewsItemContainer>
        <ContentWrapper>
          <TextContentWrapper>
            <TopSection>
              <div>
                <NewsBadge>{category}</NewsBadge>
                <NewsTitle>{title}</NewsTitle>
                <NewsContent>{content}</NewsContent>
                <LeftInfo>
                  <ProfileIcon src={user.profileImageUrl} alt="Profile" />
                  <Nickname>{user.nickname}</Nickname>
                  <ProfileCheckIcon />
                  <Time>{createdAt}</Time>
                  <Divider>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="12" viewBox="0 0 2 12" fill="none">
                      <path d="M1 0V12" stroke="#8C8C8C" strokeLinejoin="round"/>
                    </svg>
                  </Divider>
                  <Reads>읽음 {views}</Reads>
                </LeftInfo>
              </div>
              {thumbnailUrl && <Thumbnail src={thumbnailUrl} alt="Thumbnail" />}
            </TopSection>
            <RightInfo>
              <GoodIcon />
              <Likes>{likes}</Likes>
              <CommentIcon />
              <Comments>{replies}</Comments>
            </RightInfo>
          </TextContentWrapper>
        </ContentWrapper>
      </NewsItemContainer>
  );
};

export default NewsItem;