import styled from "styled-components";

export const ArticleContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  background: #fff;
  border-radius: 0.625rem;
  border: 0.0625rem solid #dcdcdc;
  position: relative;
`;

export const ArticleLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.37rem;
  margin-left: 1.3rem;
`;
export const ArticleTeam = styled.img`
  display: flex;
  width: 0.6rem;
  justify-content: center;
  align-items: center;
`;
export const ArticleCategory = styled.div`
  display: flex;
  height: 1.07rem;
  padding: 0.125rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1.25rem;
  background: var(--Black-black_900, #000);

  color: var(--sub1, #fff);
  /* Caption/cap1_Pre_m_12px */
  font-family: Pretendard;
  font-size: 0.53rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-bottom: 0.0625rem solid #eee;
`;

export const ArticleTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0 0 0.75rem 0;
  color: black;
`;

export const ArticleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.583rem;
  color: #666;
`;

export const ArticleMeta = styled.div`
    margin-left: auto;
    display: flex;
    gap: 0.5rem;
    font-size: 0.583rem;
    color: #777;
    position: relative;
`;

export const ArticleContent = styled.div`
  padding: 0;
  overflow: hidden;
`;

export const ArticleImage = styled.img`
  width: 28.5rem;
  height: 14.14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 0.625rem;
  margin: 0.7rem;
`;

export const ArticleText = styled.div`
  margin: 0.7rem;
  margin-bottom: 5.38rem;
  font-size: 0.718rem;
  line-height: 1.6;
  color: #333;
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0.7rem auto;
    border-radius: 0.625rem;
    object-fit: contain;
  }
`;


export const ArticleActions = styled.div`
  padding: 0 1rem 2.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

export const LikeButton = styled.button`
  display: flex;
  height: 1.68rem;
  padding: 0.125rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.5rem;
  background: ${({ isLiked }) =>
    isLiked ? "rgba(192, 12, 11, 0.90)" : "white"};
  box-shadow: ${({ isLiked }) =>
    isLiked
      ? "0 0.125rem 0.625rem 0 rgba(217, 25, 32, 0.20)"
      : "0 0.125rem 0.625rem 0 rgba(0, 0, 0, 0.20)"};
  font-size: 0.65rem;
  color: ${({ isLiked }) => (isLiked ? "white" : "black")};
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 10px 0px rgba(217, 25, 32, 0.2);

    .likes {
      color: ${({ isLiked }) =>
        isLiked ? "white" : "var(--Primary-primary_900, #C00C0B)"};
    }
  }

  & svg {
    margin-right: 0.375rem;
  }
`;

export const TimeLabel = styled.span`
  font-size: 0.583rem;
  color: #888;
  margin-right: 0.3125rem;
`;

export const ViewLabel = styled.span`
  font-size: 0.583rem;
  color: #888;
  margin-left: 0.3125rem;
`;

export const MoreMenu = styled.div`
    width: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 0.5rem;
    border: 0.0625rem solid #dcdcdc;
    background: #fff;
    box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.16);

    position: absolute; /* 버튼 옆에 위치하도록 설정 */
    top: calc(100% + 0.2rem);
    left: calc(100% - 0.6rem);
    z-index: 100; /* 다른 요소들보다 위에 표시되도록 */
`;

export const MenuItem = styled.div`
    width: 100%;
    display: flex; /* 이모티콘과 텍스트를 수평 배치 */
    align-items: center; /* 수직 정렬 */
    padding: 0.42rem 0.89rem;
    gap: 0.5rem; /* 이모티콘과 텍스트 간 간격 */
    font-size: 0.7rem; /* 글자 크기 */
    font-weight: 500;
    color: #333;

    cursor: pointer;


    &:hover {
        background-color: #f9f9f9;
    }

    &:first-child:hover {
        border-radius: 0.5rem 0.5rem 0 0;
    }

    &:last-child:hover {
        border-radius: 0 0 0.5rem 0.5rem;
    }
    img, svg {
        display: block; /* 이미지와 아이콘이 올바르게 표시되도록 설정 */
        width: auto;
        height: auto;
        vertical-align: middle; /* 텍스트와 아이콘 정렬 */
        margin-right: auto;
    }
`;

export const YoutubeResponsive = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100% !important;
    height: 100% !important;
    border: 0;
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
`;