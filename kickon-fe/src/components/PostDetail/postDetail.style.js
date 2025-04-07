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

export const ArticleText = styled.p`
  margin: 0.7rem;
  margin-bottom: 5.38rem;
  font-size: 0.718rem;
  line-height: 1.6;
  color: #333;
`;

export const ArticleActions = styled.div`
  padding: 0 1rem 1rem;
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
    top: calc(100% + 0.5rem); /* 버튼 바로 아래로 위치 */
    left: calc(100%);
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
        background-color: #f9f9f9; /* 호버 시 배경색 변경 */
        border-radius: 0.25rem;
    }

    img, svg {
        display: block; /* 이미지와 아이콘이 올바르게 표시되도록 설정 */
        width: auto;
        height: auto;
        vertical-align: middle; /* 텍스트와 아이콘 정렬 */
        margin-right: auto;
    }
`;

export const CommentInputBox = styled.div`
  position: absolute;
  left: 0.8rem;
  display: flex;
  width: 28rem;
  padding: 0.8rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 0.625rem;
  background: #f0f0f0;
  color: black;
`;

export const CommentInputLabel = styled.div`
  font-size: 0.628rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
`;

export const CommentInputContainer = styled.div`
  display: flex;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  background: #fff;
  align-items: flex-start;
  overflow: hidden;
`;

export const CommentInput = styled.textarea`
  width: 22.5rem;
  flex: 1;
  border: none;
  padding: 0.875rem; /* 기존 12px -> 14px */
  font-size: 0.583rem;
  background: transparent;
  min-height: 4rem; /* 기존 50px -> 64px */
  max-height: 10rem; /* 기존 150px -> 160px */
  overflow-y: auto;
  resize: none;

  &:focus {
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  background: rgba(192, 12, 11, 0.9);
  color: white;
  border: none;
  height: 4rem; /* 기존 50px -> 64px (입력란과 동일) */
  font-size: 0.85rem; /* 기존 0.8rem -> 0.85rem */
  padding: 0 1.125rem; /* 기존 16px -> 18px */
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CommentsSection = styled.div`
  margin-top: 10rem;
`;

export const CommentsSectionTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 0.628rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem;
  padding: 0.45rem 1rem;
  border-top: 0.0625rem solid #eee;
  border-bottom: 0.0625rem solid #eee;
`;

export const CommentItem = styled.div`
  border-bottom: 0.0625rem solid #eee;
  //padding: 0.75rem 1rem;
`;

export const CommentHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.375rem;
  padding: 0.75rem 1rem 0 1rem;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.1rem;
`;
export const CommentLikes = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  font-size: 0.75rem;
  color: ${(props) => (props.active ? "#000" : "#888")};
  cursor: pointer;
  padding: 0 1rem;
`;

export const CommentContent = styled.div`
  font-size: 0.628rem;
  margin-left: 1.875rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  color: #000;
  padding: 0 1rem;
`;

export const CommentActions = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1.875rem;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
`;

export const ReplyButton = styled.button`
  display: flex;
  height: 1.077rem;
  padding: 0.25rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.448rem;
  border: none;

  color: ${(props) =>
    props.isActive
      ? "var(--Black-black_100, #F8F8F8)"
      : "var(--Black-black_700, #676767)"};
  font-family: Pretendard;
  font-size: 0.538rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; /* 133.333% */

  border-radius: 0.25rem;
  background: ${(props) =>
    props.isActive
      ? "var(--Black-black_500, #AFAFAF)"
      : "var(--Black-black_200, #F0F0F0)"};
  cursor: pointer;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 0.75rem;
  color: #888;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  color: var(--Black-black_700, #676767);
  /* Button/btn5_Pre_r_12px */
  font-family: Pretendard;
  font-size: 0.538rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; /* 133.333% */
`;

// 새로 추가된 스타일 컴포넌트
export const ReplyInputWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  background: #fff;
  align-items: flex-start;
  overflow: hidden;
  width: calc(100%);
`;

export const ReplyInput = styled.textarea`
  flex: 1;
  border: none;
  padding: 0.625rem;
  font-size: 0.583rem;
  background: transparent;
  min-height: 2.5rem;
  max-height: 5rem;
  overflow-y: auto;
  resize: none;
  background: var(--Black-black_100, #f8f8f8);

  &:focus {
    outline: none;
  }
`;

export const ReplySubmitButton = styled.button`
  background: rgba(192, 12, 11, 0.9);
  color: white;
  border: none;
  font-size: 0.75rem;
  padding: 0 0.875rem;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RepliesContainer = styled.div``;

export const ReplyItem = styled.div`
  padding: 1rem 1rem 1rem 2.875rem;
  border-bottom: 0.0625rem solid #eee;

  &:first-of-type {
    border-top: 0.0625rem solid #eee;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

export const ReplyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const ReplyContent = styled.div`
  font-size: 0.628rem;
  margin-left: 1.625rem;
  line-height: 1.4;
  color: #000;
  margin-bottom: 0.25rem;
`;

export const ReplyLikes = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  font-size: 0.75rem;
  color: ${(props) => (props.active ? "#000" : "#888")};
  cursor: pointer;
  padding: 0 1rem;
`;

export const ReplyHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.375rem;
`;

export const ReplyActions = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1.625rem; // Aligned with ReplyContent's margin-left
`;

// Adding a ReplyActionButton styled component for buttons within ReplyActions
export const ReplyActionButton = styled.button`
  display: flex;
  height: 1.077rem;
  padding: 0.25rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.448rem;
  border: none;

  color: ${(props) =>
    props.isActive
      ? "var(--Black-black_100, #F8F8F8)"
      : "var(--Black-black_700, #676767)"};
  font-family: Pretendard;
  font-size: 0.538rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; /* 133.333% */

  border-radius: 0.25rem;
  background: ${(props) =>
    props.isActive
      ? "var(--Black-black_500, #AFAFAF)"
      : "var(--Black-black_200, #F0F0F0)"};
  cursor: pointer;
`;
