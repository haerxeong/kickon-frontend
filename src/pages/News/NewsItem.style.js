import styled from "styled-components";
import { FaRegComment } from "react-icons/fa";
import { PiSoccerBallFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";

export const NewsItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 0 1rem 0;
  border-bottom: 0.0625rem solid #f0f0f0;
  cursor: pointer;
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

export const StyledTime = styled.span`
  margin-left: 0.7rem;
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
  margin: 1.3rem 0 0.5rem 1rem;
`;

export const ProfileIcon = styled.img`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.25rem;
`;

export const ProfileCheckIcon = styled(FaCheckCircle)`
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.25rem;
  
  & path:last-child {
    fill: #8f8f8f; 
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

export const LeftInfo = styled.div`
  display: flex;
  //gap: 0.5rem;
  align-items: center; /* Center vertically */
  justify-content: flex-start; /* Align to the left horizontally */
  font-size: 0.65rem;
  margin-top: 1rem;
  font-weight: 400;
`;

export const RightInfo = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: flex-end;
  align-self: flex-end;
  font-size: 0.63rem;
  margin-top: 0.3rem;
`;

export const GoodIcon = styled(PiSoccerBallFill)`
  width: 0.8rem;
  height: 0.8rem;
  color: #8f8f8f; 
`;

export const CommentIcon = styled(FaRegComment)`
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 0.2rem;
  color: #8f8f8f;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const TeamIcon = styled.img`
    width: 0.8rem;
    height: 0.8rem;
    object-fit: cover;
    margin-right: 0.25rem;
`;

export const TeamBadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
`;