import styled from 'styled-components';

export const ArticleContainer = styled.div`
    width: 100%;
    max-width: 600px; /* 가독성을 위해 너비 제한 */
    margin: 0 auto;
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const ArticleHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
`;

export const ArticleTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
`;

export const ArticleInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #666;
`;

export const AuthorIcon = styled.div`
    background: #ddd;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
`;

export const ArticleMeta = styled.div`
    margin-left: auto;
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
`;

export const ArticleContent = styled.div`
    margin-top: 1rem;
`;

export const ArticleImage = styled.img`
    width: 100%;
    max-height: 250px;
    object-fit: cover;
    border-radius: 8px;
`;

export const ArticleText = styled.p`
    margin-top: 1rem;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
`;

// 게시글 액션 (좋아요 등)
export const ArticleActions = styled.div`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  align-items: center;
`;

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E74C3C;
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;

  & svg {
    margin-right: 0.25rem;
  }
`;

// 게시글 추가 정보 박스
export const AdditionalInfoBox = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  margin: 0 1rem 1rem 1rem;
  border-radius: 0.3rem;
  font-size: 0.75rem;
  color: #666;
  line-height: 1.5;
`;

export const AdditionalInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const InfoButton = styled.button`
  background-color: #E74C3C;
  color: white;
  border: none;
  border-radius: 0.2rem;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
`;

// 댓글 섹션
export const CommentsSection = styled.div`
  padding: 0 1rem;
`;

export const CommentItem = styled.div`
  padding: 0.75rem 0;
  border-bottom: 1px solid #F0F0F0;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
`;

export const CommentContent = styled.div`
  font-size: 0.8rem;
  margin-left: 1.5rem;
  margin-bottom: 0.3rem;
`;

export const CommentActions = styled.div`
  display: flex;
  margin-left: 1.5rem;
  font-size: 0.7rem;
  color: #888;
  gap: 0.5rem;
`;

export const CommentLikes = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.active ? '#E74C3C' : '#888'};
  cursor: pointer;
  
  & svg {
    margin-right: 0.15rem;
  }
`;

export const ReplyButton = styled.button`
  background: none;
  border: none;
  font-size: 0.7rem;
  color: #888;
  padding: 0;
  cursor: pointer;
`;

// 페이지네이션
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  gap: 0.5rem;
  align-items: center;
`;

export const PageButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${props => props.active ? '#f0f0f0' : 'transparent'};
  border-radius: 0.2rem;
  font-size: 0.7rem;
  color: ${props => props.active ? '#000' : '#676767'};
  cursor: pointer;

  &:hover {
    background: ${props => props.active ? '#f0f0f0' : '#f8f8f8'};
  }
`;

export const NavButton = styled.button`
  border: none;
  background: transparent;
  font-size: 0.7rem;
  color: #676767;
  cursor: pointer;
  display: flex;
  align-items: center;
`;