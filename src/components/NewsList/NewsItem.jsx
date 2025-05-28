import React from "react";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../../assets/profile.svg"; // 기본 프로필 이미지 import
import defaultTeamLogo from "../../assets/good.svg"; // 기본 팀 로고로 일단 good.svg를 사용
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
  CommentIcon,
  Divider,
  ContentWrapper,
  TextContentWrapper,
  LeftInfo,
  RightInfo,
  TopSection
} from "./NewsItem.style";
import {timeAgo} from "../../utils/timeUtils.js";
import GoodIcon from "../../assets/good.svg";
import {stripHtml} from "../../utils/stripHtml.js";
import { increaseViewCount } from "../../utils/increaseViewCount";

const NewsItem = ({ pk, title, content, thumbnailUrl, user, createdAt, views, likes, replies, category, team, onNewsClick, isCompact }) => {
  const navigate = useNavigate();
  const plainTextContent = stripHtml(content).substring(0, isCompact ? 50 : 100) + (stripHtml(content).length > (isCompact ? 50 : 100) ? "..." : "");

  const handleClick = async () => {
    try {
      await increaseViewCount("news", pk);
      
      if (onNewsClick) {
        // 상세 뉴스 데이터를 객체로 전달
        onNewsClick({
          pk,
          title,
          content,
          thumbnailUrl,
          user,
          createdAt,
          views: views + 1, // 조회수 증가
          likes,
          replies,
          category,
          team
        });
      } else {
        navigate(`/news/${pk}`);
      }
    } catch (error) {
      console.error("조회수 증가 실패:", error);
      if (onNewsClick) {
        onNewsClick({
          pk,
          title,
          content,
          thumbnailUrl,
          user,
          createdAt,
          views,
          likes,
          replies,
          category,
          team
        });
      } else {
        navigate(`/news/${pk}`);
      }
    }
  };

  // 프로필 이미지가 없는 경우 기본 이미지 사용
  const profileImage = user.profileImageUrl || defaultProfileImage;

  return (
      <NewsItemContainer onClick={handleClick} className={isCompact ? 'news-item compact' : ''}>
        <ContentWrapper>
          <TextContentWrapper>
            <TopSection>
              <div>
                <NewsBadge>{category}</NewsBadge>
                <NewsTitle className="title">{title}</NewsTitle>
                <NewsContent className="content">{plainTextContent}</NewsContent>
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
              {thumbnailUrl && <Thumbnail className="thumbnail" src={thumbnailUrl} alt="Thumbnail" />}
            </TopSection>
            <RightInfo>
              <img src={GoodIcon} alt="좋아요" style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.1rem' }} />
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
