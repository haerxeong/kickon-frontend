import styled from "styled-components";
import ProfileSvg from "../../assets/profile.svg";

export const NewsItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 1rem;
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
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const NewsBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem 0.5rem;
  background-color: #f0f0f0;
  border-radius: 1.25rem;
  font-size: 0.53rem;
  font-family: "Pretendard";
  font-weight: 400;
  color: #363636;
  //margin-bottom: 0.5rem;
`;

export const NewsTitle = styled.h3`
  color: black;
  font-size: 0.9rem;
  font-family: "Pretendard";
  font-weight: 500;
  margin: 0.45rem 0;
`;

export const NewsContent = styled.p`
  color: black;
  font-size: 0.583rem;
  font-family: "Pretendard";
  font-weight: normal;
  line-height: 1rem;
  margin-bottom: 0.8rem;
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
  width: 7.2rem;
  height: 4.67rem;
  flex-shrink: 0;
  border-radius: 0.36rem;
  object-fit: cover; // 이미지 비율 유지를 위해 추가
  margin: 2rem 0 0 1rem;
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
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.25rem;
  margin-right: 0.7rem;
`;

export const Divider = styled.div`
  width: 0;
  height: 0.53rem;
  stroke-width: 0.0625rem;
  stroke: #8C8C8C;
  margin: 0 0.36rem;
  svg {
    width: 0.1rem;
    height: 0.53rem;
  }
`;

export const NewsInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8125rem;
  //justify-content: space-between;
  width: 100%;
`;

export const LeftInfo = styled.div`
  display: flex;
  //gap: 0.5rem;
  align-items: center; /* Center vertically */
  justify-content: flex-start; /* Align to the left horizontally */
  font-size: 0.583rem;
  margin-top: 0.8rem;
`;

export const RightInfo = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: flex-end;
  align-self: flex-end;
  font-size: 0.63rem;
`;

export const GoodIcon = styled.img.attrs({
  src: "/src/assets/good.png",
  alt: "좋아요"
})`
  width: 0.8rem;
  height: 0.8rem;
  //margin-right: 0.25rem;
`;

export const CommentIcon = styled.img.attrs({
  src: "/src/assets/comment.png",
  alt: "댓글"
})`
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 0.2rem;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;