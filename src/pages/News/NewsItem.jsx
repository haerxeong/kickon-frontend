import React from "react";
import * as S from "./NewsItem.style";
import {timeAgo} from "../../utils/timeUtils.js";
import { truncateText } from "../../utils/textUtils.js";
import ProfileSvg from "../../assets/profile.svg";
import axiosInstance from "../../apis/axios-instance";
import { stripHtml} from "../../utils/stripHtml.js";

const NewsItem = ({ title, content, onClick, ...props }) => {
  const handleClick = async () => {
    try {
      // Call the API to increase the view count
      await axiosInstance.post('/api/news-view-history', { news: props.pk });
      console.log(`View count increased for news ID: ${props.pk}`);

      // Navigate to the news detail page
      if (onClick) onClick();
    } catch (error) {
      console.error('Failed to increase view count:', error);
    }
  };

  return (
      <S.NewsItemContainer onClick={handleClick}>
        <S.ContentWrapper>
          <S.TextContentWrapper>
            <S.TopSection>
              <div>
                <S.TeamBadgeWrapper>
                  {props.team?.logoUrl && (
                      <S.TeamIcon src={props.team.logoUrl} alt={`${props.team.nameKr} Logo`} />
                  )}
                <S.NewsBadge>{props.category}</S.NewsBadge>
                </S.TeamBadgeWrapper>
                <S.NewsTitle>{title}</S.NewsTitle>
                <S.NewsContent>{stripHtml(truncateText(content))}</S.NewsContent>
                <S.LeftInfo>
                  <S.ProfileIcon src={props.user.profileImageUrl || ProfileSvg} alt="Profile" />
                  <S.Nickname>{props.user.nickname}</S.Nickname>
                  {/*<ProfileCheckIcon />*/}
                  <S.StyledTime>{timeAgo(props.createdAt)}</S.StyledTime>
                  <S.Divider>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="12" viewBox="0 0 2 12" fill="none">
                      <path d="M1 0V12" stroke="#8C8C8C" strokeLinejoin="round"/>
                    </svg>
                  </S.Divider>
                  <S.Reads>읽음 {props.views}</S.Reads>
                </S.LeftInfo>
              </div>
              {props.thumbnailUrl && <S.Thumbnail src={props.thumbnailUrl} alt="Thumbnail" />}
            </S.TopSection>
            <S.RightInfo>
              <S.GoodIcon />
              <S.Likes>{props.likes}</S.Likes>
              <S.CommentIcon />
              <S.Comments>{props.replies}</S.Comments>
            </S.RightInfo>
          </S.TextContentWrapper>
        </S.ContentWrapper>
      </S.NewsItemContainer>
  );
};

export default NewsItem;