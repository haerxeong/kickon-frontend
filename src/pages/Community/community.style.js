import styled from "styled-components";


export const NewsContainer = styled.div`
    width: 30rem;
    //min-height: 55.625rem;
    height: auto;
    flex-shrink: 0;
    border-radius: 0.45rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    display: flex;
    flex-direction: column;
    padding: 0.7rem;
`;

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #F0F0F0;
    margin-bottom: 0.5rem;
`;

export const Tab = styled.div`
    color: ${props => props.active ? '#C00C0B' : '#000'};
    font-family: Pretendard;
    font-size: 0.7rem;
    font-weight: ${props => props.active ? '500' : '400'};
    padding: 0.5rem 0.7rem;
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
    font-size: 0.6rem;
    font-weight: 400;
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

export const NoDataWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 7rem 0;
`;
