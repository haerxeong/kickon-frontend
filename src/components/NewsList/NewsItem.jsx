import React from "react";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../../assets/profile.svg"; // 기본 프로필 이미지 import

import {
  NewsItemContainer,
  NewsBadge,
  NewsTitle,
  NewsContent,
  NewsInfo,
  Nickname,
  StyledTime,
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
import {timeAgo} from "../../utils/timeUtils.js";

const stripHtml = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const NewsItem = ({ pk, title, content, thumbnailUrl, user, createdAt, views, likes, replies, category }) => {
  const navigate = useNavigate();
  const plainTextContent = stripHtml(content).substring(0, 100) + (stripHtml(content).length > 100 ? "..." : "");

  const handleClick = () => {
    navigate(`/news/${pk}`);
  };

  // 프로필 이미지가 없는 경우 기본 이미지 사용
  const profileImage = user.profileImageUrl || defaultProfileImage;

  return (
      <NewsItemContainer onClick={handleClick}>
        <ContentWrapper>
          <TextContentWrapper>
            <TopSection>
              <div>
                <NewsBadge>{category}</NewsBadge>
                <NewsTitle>{title}</NewsTitle>
                <NewsContent>{plainTextContent}</NewsContent>
                <LeftInfo>
                  <ProfileIcon src={profileImage} alt="Profile" />
                  <Nickname>{user.nickname}</Nickname>
                  <ProfileCheckIcon />
                  <StyledTime>{timeAgo(createdAt)}</StyledTime>
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
