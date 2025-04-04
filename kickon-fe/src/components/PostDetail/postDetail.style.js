import styled from 'styled-components';

export const ArticleContainer = styled.div`
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    background: #fff;
    border-radius: 0.625rem;
    border: 1px solid #DCDCDC;
    position: relative;
`;

export const ArticleLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2.37rem;
    margin-left: 1.3rem;
`
export const ArticleTeam = styled.img`
    display: flex;    
    width: 0.6rem;
    justify-content: center;
    align-items: center;
`
export const ArticleCategory = styled.div`
    display: flex;
    width: 1.83rem;
    height: 1.07rem;
    padding: 0.125rem 0.625rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    
    border-radius: 1.25rem;
    background: var(--Black-black_900, #000);

    color: var(--sub1, #FFF);
    /* Caption/cap1_Pre_m_12px */
    font-family: Pretendard;
    font-size: 0.53rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export const ArticleHeader = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-bottom: 1px solid #eee;
`;

export const ArticleTitle = styled.h1`
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0 0 12px 0;
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
    padding: 0 16px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
    background: ${({ isLiked }) => (isLiked ? 'rgba(192, 12, 11, 0.90)' : 'white')};
    box-shadow: ${({ isLiked }) => (isLiked ? '0px 2px 10px 0px rgba(217, 25, 32, 0.20)' : '0px 2px 10px 0px rgba(0, 0, 0, 0.20)')};
    font-size: 0.65rem;
    color: ${({ isLiked }) => (isLiked ? 'white' : 'black')};
    cursor: pointer;



    &:hover .likes {
        color: ${({ isLiked }) => (isLiked ? 'white' : 'var(--Primary-primary_900, #C00C0B)')};
    }

    & svg {
        margin-right: 6px;
    }
`;

export const TimeLabel = styled.span`
    font-size: 0.583rem;
    color: #888;
    margin-right: 5px;
`;

export const ViewLabel = styled.span`
    font-size: 0.583rem;
    color: #888;
    margin-left: 5px;
`;

export const MoreMenu = styled.ul`
    display: flex;
    padding: 0.625rem 1.25rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.25rem;

    border-radius: 0.5rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.16);
    position: absolute; /* 버튼 옆에 위치하도록 설정 */
    top: 100%; /* 버튼 바로 아래로 위치 */
    left: 0;
    z-index: 100; /* 다른 요소들보다 위에 표시되도록 */
`

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
    background: #F0F0F0;
    color: black;
`;

export const CommentInputLabel = styled.div`
    font-size: 0.628rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
`;

export const CommentInputContainer = styled.div`
    display: flex;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    align-items: flex-start;
    overflow: hidden;
`;

export const CommentInput = styled.textarea`
    width: 22.5rem;
    flex: 1;
    border: none;
    padding: 14px; /* 기존 12px -> 14px */
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
    background: rgba(192, 12, 11, 0.90);
    color: white;
    border: none;
    height: 64px; /* 기존 50px -> 64px (입력란과 동일) */
    font-size: 0.85rem; /* 기존 0.8rem -> 0.85rem */
    padding: 0 18px; /* 기존 16px -> 18px */
    cursor: pointer;
    font-weight: 500;
    white-space: nowrap;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CommentsSection = styled.div`
    padding: 0 16px;
    margin-top: 10rem;
`;

export const CommentsSectionTitle = styled.div`
    width: 30rem;
    stroke-width: 1px;
    stroke: #DCDCDC;
    color: #000;
    font-family: Pretendard;
    font-size: 0.628rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem;
`

export const CommentItem = styled.div`
    border-bottom: 1px solid #eee;
    padding: 12px 0;
`;

export const CommentHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
`

export const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 0.1rem;
`;
export const CommentLikes = styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    font-size: 0.75rem;
    color: ${props => props.active ? '#E74C3C' : '#888'};
    cursor: pointer;
    padding: 0;
`;

export const CommentContent = styled.div`
    font-size: 0.628rem;
    margin-left: 30px;
    margin-bottom: 8px;
    line-height: 1.4;
    color: #000
`;

export const CommentActions = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    margin-left: 30px;
`;


export const ReplyButton = styled.button`
    display: flex;
    height: 1.077rem;
    padding: 0.25rem 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.448rem;
    border: none;

    color: var(--Black-black_700, #676767);
    /* Button/btn5_Pre_r_12px */
    font-family: Pretendard;
    font-size: 0.538rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem; /* 133.333% */
    
    border-radius: 0.25rem;
    background: var(--Black-black_200, #F0F0F0);
`;

export const MoreButton = styled.button`
    background: none;
    border: none;
    font-size: 0.75rem;
    color: #888;
    cursor: pointer;
    padding: 0;

    color: var(--Black-black_700, #676767);
    /* Button/btn5_Pre_r_12px */
    font-family: Pretendard;
    font-size: 0.538rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem; /* 133.333% */
`;