import React from "react";
import * as S from "./NewsItem.style";
import {timeAgo} from "../../utils/timeUtils.js";
import { truncateText } from "../../utils/textUtils.js";
import ProfileSvg from "../../assets/profile.svg";
import GoodIcon from "../../assets/good.svg"
import { stripHtml } from "../../utils/stripHtml.js";
import { increaseViewCount } from "../../utils/increaseViewCount.js";

const NewsItem = ({ title, content, onClick, ...props }) => {
  const handleClick = async () => {
    await increaseViewCount("news", props.pk);
    if (onClick) onClick();
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
              <img src={GoodIcon} alt="좋아요" style={{ width: '0.8rem', height: '0.8rem'}} />
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