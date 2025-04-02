import styled from "styled-components";
import ProfileSvg from "../../assets/profile.svg";

export const NewsItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 0.0625rem solid #f0f0f0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
  gap: 1rem;
  width: 100%;
`;

export const TextContentWrapper = styled.div`
  flex: 1;
`;

export const NewsBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.625rem;
  background-color: #f0f0f0;
  border-radius: 1.25rem;
  font-size: 0.75rem;
  font-family: "Pretendard";
  font-weight: 500;
  color: #363636;
  margin-bottom: 0.5rem;
`;

export const NewsTitle = styled.h3`
  color: black;
  font-size: 1.25rem;
  font-family: "Pretendard";
  font-weight: 600;
  margin: 0.5rem 0;
`;

export const NewsContent = styled.p`
  color: black;
  font-size: 0.8125rem;
  font-family: "Pretendard";
  font-weight: normal;
  line-height: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const Nickname = styled.span`
  color: black;
`;

export const Time = styled.span`
  color: #8c8c8c;
`;

export const Reads = styled.span`
  color: #8c8c8c;
`;

export const Comments = styled.span`
  color: #8f8f8f;
`;

export const Likes = styled.span`
  color: #8f8f8f;
`;

export const Thumbnail = styled.img`
  width: 10rem;
  height: 6.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  object-fit: cover; // 이미지 비율 유지를 위해 추가
`;

export const ProfileIcon = styled.img.attrs({
  src: ProfileSvg,
  alt: "프로필"
})`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
`;

export const ProfileCheckIcon = styled.img.attrs({
  src: "/src/assets/profile_check.svg",
  alt: "인증된 프로필"
})`
  width: 1rem;
  height: 1rem;
  margin-left: 0.25rem;
`;

export const Divider = styled.div`
  width: 0;
  height: 0.75rem;
  stroke-width: 0.0625rem;
  stroke: #8C8C8C;
  margin: 0 0.25rem;
  svg {
    width: 0.125rem;
    height: 0.75rem;
  }
`;

export const NewsInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.8125rem;
  width: 100%;
`;

export const GoodIcon = styled.img.attrs({
  src: "/src/assets/good.png",
  alt: "좋아요"
})`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
`;

export const CommentIcon = styled.img.attrs({
  src: "/src/assets/comment.png",
  alt: "댓글"
})`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;
