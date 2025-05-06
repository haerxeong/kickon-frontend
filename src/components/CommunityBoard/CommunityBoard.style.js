import styled from "styled-components";
import MoreSvg from "../../assets/more.png";
import ProfileSvg from "../../assets/profile.svg";

export const CommunityBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  padding: 1.3rem 0.7rem 0.7rem 0.7rem;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  border-radius: 0.625rem;
  border: 0.0425rem solid var(--Black-black_300, #DCDCDC);
  background: var(--sub1, #FFF);
`;

export const CommunityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 100%;
  margin-bottom: 1rem;
  font-family: "Pretendard";
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 0.85rem;
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
  font-size: 0.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const MoreIcon = styled.div`
  width: 0.75rem;
  height: 0.75rem;
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
  font-size: 0.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; /* 138.462% */

  .title {
    flex: 6;
    text-align: center;
  }

  .author {
    flex: 2.14;
    text-align: center;
  }
  .date {
    flex: 1.5;
    text-align: center;
  }

  .views {
    flex: 1;
    text-align: center;
  }

  .likes {
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

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
  padding: 0.55rem 0;
  border-bottom: 0.0625rem solid #f0f0f0;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

export const PostTitle = styled.div`
  flex: 5.5;
  font-size: 0.6rem;
  font-weight: 350;
  color: black;
  padding-left: 0.5rem;
  padding-right: 1.25rem;
  min-width: 0;

  .clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: normal;
    min-width: 0;
    max-width: 100%;
    flex: 4;
    font-size: 0.6rem;
    font-weight: 400;
    color: black;

    img {
      width: 0.6rem;
      height: 0.6rem;
      margin-left: 0.25rem;
    }

    .reply-count {
      color: #000;
      font-weight: normal;
      margin-left: 0.15rem;
      white-space: nowrap;
    }
`;

export const PostAuthor = styled.div`
  flex: 2.14;
  font-size: 0.55rem;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25rem;
  font-weight: 350;

  img {
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    object-fit: cover;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;


export const PostDate = styled.div`
  flex: 1.5;
  font-size: 0.55rem;
  color: #8c8c8c;
  text-align: center;
`;

export const PostLikes = styled.div`
  width: auto;
  flex: 1;
  min-width: 2rem;
  font-size: 0.55rem;
  color: #8f8f8f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PostViews = styled.div`
  width: auto;
  flex: 1;
  min-width: 2rem;
  font-size: 0.55rem;
  color: #8f8f8f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileIcon = styled.img.attrs({
  src: ProfileSvg,
  alt: "프로필"
})`
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.3rem;
`;

export const TableHeaderSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f0f0f0;
  margin-bottom: 0px; /* 줄과 제목 간격 조정 */
`;