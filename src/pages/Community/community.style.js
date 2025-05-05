import styled from "styled-components";


export const NewsContainer = styled.div`
    width: 30rem;
    min-height: 55.625rem;
    flex-shrink: 0;
    border-radius: 0.45rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    display: flex;
    flex-direction: column;
    padding: 1.33rem 0.7rem 1.77rem 0.7rem;;
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0.66rem 1rem;
  gap: 1rem;
`;

export const TabButton = styled.div`
    // 전체, 인기 등 탭 버튼
  margin-right: 0.7rem;
  text-align: center;
  font-size: 0.7rem;
  font-style: normal;
  line-height: 0.7rem;
  font-weight: ${props => props.isActive ? '500' : '400'};
  color: ${props => props.isActive ? '#C00C0B' : '#000'};
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0;
  flex-shrink: 0;
  stroke-width: 1px;
  stroke: #DCDCDC;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.20));
  border-bottom: 1px solid #DCDCDC;
  position: relative;
`;

export const ActiveIndicator = styled.div`
    position: absolute;
    top: -1px;
    width: 2rem;
    height: 0;
    stroke-width: 2px;
    stroke: #C00C0B;
    border-bottom: 2px solid #C00C0B;
    left: ${props => props.left};
`;

export const TableHeader = styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem 0;
    border-bottom: 0.0625rem solid #f0f0f0;
    color: #000;
    font-family: Pretendard;
    font-size: 0.6rem;
    font-weight: 400;
    .title {
        flex: 4;
        text-align: center;
    }
    
    .author {
        flex: 2;
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
`;

export const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem 0;
  border-bottom: 0.0625rem solid #f0f0f0;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const PostTitle = styled.div`
    flex: 4;
    font-size: 0.65rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 0.5rem;
    color: black;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 최대 2줄까지 표시 */
    -webkit-box-orient: vertical;
    word-break: break-word;

  img {
    width: 0.6rem;
    height: 0.6rem;
    margin-left: 0.25rem;
  }

  .reply-count {
    color: #000;
    font-weight: normal;
    margin-left: 0.25rem
  }
`;

export const PostAuthor = styled.div`
  flex: 2;
  font-size: 0.6rem;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-weight: 350;

  img {
      width: 0.85rem; 
      height: 0.85rem;
      border-radius: 50%;
      object-fit: cover;
  }
`;

export const PostDate = styled.div`
  flex: 2;
  font-size: 0.6rem;
  color: #8c8c8c;
  text-align: center;
`;

export const PostLikes = styled.div`
  flex: 1;
  font-size: 0.6rem;
  color: #8f8f8f;
  text-align: center;
`;

export const PostViews = styled.div`
  flex: 1;
  font-size: 0.6rem;
  color: #8f8f8f;
  text-align: center;
`;
