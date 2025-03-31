import styled from "styled-components";
import MoreSvg from "../../assets/more.png";
import ProfileSvg from "../../assets/profile.svg";

export const CommunityBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 33rem;
  padding: 1.875rem 1rem 1rem 1rem;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  border-radius: 0.625rem;
  border: 0.0625rem solid var(--Black-black_300, #DCDCDC);
  background: var(--sub1, #FFF);
`;

export const CommunityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 100%;
  margin-bottom: 1.5rem;
  font-family: "Pretendard";
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25rem;
  color: black;
  
  .title {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

export const MoreLink = styled.a`
  color: var(--Black-black_700, #676767);
  text-align: right;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const MoreIcon = styled.div`
  width: 1.125rem;
  height: 1.125rem;
  background-image: url(${MoreSvg});
  background-size: contain;
  background-repeat: no-repeat;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 0.0625rem solid #f0f0f0;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 138.462% */
  
  .title {
    flex: 5;
    padding-left: 0.5rem;
  }
  
  .author {
    flex: 2;
    text-align: center;
  }
  
  .date {
    flex: 2;
    text-align: center;
  }
  
  .likes {
    flex: 1;
    text-align: center;
  }
  
  .views {
    flex: 1;
    text-align: center;
  }
`;

export const TableHeaderItem = styled.div``;

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow-y: auto;
`;

export const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem 0;
  border-bottom: 0.0625rem solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const PostTitle = styled.div`
  flex: 5;
  font-size: 0.875rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.5rem;
  color: black;
  display: flex;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    margin-left: 4px;
    margin-right: 4px;
  }

  .reply-count {
    color: #8c8c8c;
    font-weight: normal;
  }
`;

export const PostAuthor = styled.div`
  flex: 2;
  font-size: 0.75rem;
  color: #8c8c8c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

export const PostDate = styled.div`
  flex: 2;
  font-size: 0.75rem;
  color: #8c8c8c;
  text-align: center;
`;

export const PostLikes = styled.div`
  flex: 1;
  font-size: 0.75rem;
  color: #8f8f8f;
  text-align: center;
`;

export const PostViews = styled.div`
  flex: 1;
  font-size: 0.75rem;
  color: #8f8f8f;
  text-align: center;
`;

export const ProfileIcon = styled.img.attrs({
  src: ProfileSvg,
  alt: "프로필"
})`
  width: 0.875rem;
  height: 0.875rem;
`;

export const GoodIcon = styled.img.attrs({
  src: "/src/assets/good.png",
  alt: "좋아요"
})`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
`;

export const TableHeaderSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f0f0f0;
  margin-bottom: 0px; /* 줄과 제목 간격 조정 */
`;