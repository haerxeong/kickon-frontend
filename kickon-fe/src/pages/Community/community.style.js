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
    padding: 1rem;
`;

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #F0F0F0;
    margin-bottom: 1rem;
`;

export const Tab = styled.div`
    color: ${props => props.active ? '#C00C0B' : '#676767'};
    font-family: Pretendard;
    font-size: 0.85rem;
    font-weight: ${props => props.active ? '600' : '400'};
    padding: 0.5rem 1rem;
    cursor: pointer;
    position: relative;
    &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${props => props.active ? '#C00C0B' : 'transparent'};
    }
`;

export const TableHeader = styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem 0;
    border-bottom: 0.0625rem solid #f0f0f0;
    color: #000;
    font-family: Pretendard;
    font-size: 0.7rem;
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
