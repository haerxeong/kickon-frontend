import React, { useState } from 'react';
import {
    ArticleContainer,
    ArticleHeader,
    ArticleTitle,
    ArticleInfo,
    AuthorIcon,
    ArticleMeta,
    ArticleContent,
    ArticleImage,
    ArticleText,
    ArticleActions,
    LikeButton,
    AdditionalInfoBox,
    AdditionalInfoHeader,
    InfoButton,
    CommentsSection,
    CommentItem,
    CommentHeader,
    CommentContent,
    CommentActions,
    CommentLikes,
    ReplyButton,
    Pagination,
    PageButton,
    NavButton
} from './newsDetail.style';

const newsDetail = () => {
    const [activeComments, setActiveComments] = useState([]);

    const toggleLike = (commentId) => {
        if (activeComments.includes(commentId)) {
            setActiveComments(activeComments.filter(id => id !== commentId));
        } else {
            setActiveComments([...activeComments, commentId]);
        }
    };

    // 댓글 데이터
    const comments = Array(15).fill().map((_, index) => ({
        id: index,
        author: '닉네임',
        date: '2025.01.20 10:42',
        content: index % 5 === 2 ? '잘보고 가요! 손흥민 선수 응원합니다!' : '서울은 강해 손흥민이 짱이다',
        likes: index % 2 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
        isLiked: false
    }));

    return (
        <ArticleContainer>
            {/* 게시글 헤더 */}
            <ArticleHeader>
                <ArticleTitle>(속보) 손흥민 부상 ㄷㄷ</ArticleTitle>
                <ArticleInfo>
                    <AuthorIcon>닉</AuthorIcon>
                    닉네임 • 부산FC • 캐릭터 LEVEL3
                    <ArticleMeta>
                        <span>👁️ 97</span>
                        <span>💬 13</span>
                    </ArticleMeta>
                </ArticleInfo>
            </ArticleHeader>

            {/* 게시글 내용 */}
            <ArticleContent>
                <ArticleImage src="/api/placeholder/400/250" alt="경기장 이미지" />
                <ArticleText>
                    전북현대와의 경기가 거기서도 졌다 우리는 문제다.

                    전북은 3경기 경기 4골 반면 이건아마도영등은 홈에 보신만, 구제불, 창닫불, 바보팀, 게닫불을 좀 봐도되
                    불 자신한 축출안지도좀 유치 도가틀시.

                    기존 노베로 밀리 이휘손 에니시 차진산이면서 고는 2012년 수렴차 우슈관로드는 PKdusj 코로 미진현 삼천
                    미 20만년 프로경비년 ㅈ두억 여연좌의 콩칩을 영어틀.

                    국세 파므좀 몸오 고는 2007년 언차락미스느지 홈액 수모도후 애역이 골림만돼 쿨게 심자어캄 에디스
                    질 대부누는 질므불 작야다말지만 이제 그는 2010시포 포포 후 장폭적 작싹골덴 영나 작품 울리말.

                    만족봄서 골여진만 방족 상걸영단 관저 살마 사봄올 파크미녀 대부날 박싹 문바닝 방야미녀 업인 불체
                    닝 타닥울 카다진다. 자니 시속 롤역는 가네에 머니지 악양니.

                    스딧 자텔는 뇨더가나 지암기에 율가에개 좀 쇳도날얼 가체어만 수추바는 다만 디영 울진만 남재배줄어간
                    고 고자 차이 형생냥 카이선 기봉을 검각냄 먹 만누스어트 동라재 어노재녀는 분액니.
                </ArticleText>
            </ArticleContent>

            {/* 게시글 액션 */}
            <ArticleActions>
                <LikeButton>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                    </svg>
                    67
                </LikeButton>
            </ArticleActions>

            {/* 게시글 추가 정보 */}
            <AdditionalInfoBox>
                <AdditionalInfoHeader>
                    Lorem ipsum ipsum futrues...
                    <InfoButton>전문</InfoButton>
                </AdditionalInfoHeader>
                Lorem ipsum suspinme futrues, eisi pinstulat pikstadpt ful nakregastdi maltbonk!
                koresalptil dt gigadok. Trup torulaspetri koventrulastep norkedip siptrusal latkni
                uselptrik sorlowspetri venlorit di eisliptrin koventrulastip...
            </AdditionalInfoBox>

            {/* 댓글 섹션 */}
            <CommentsSection>
                {comments.map((comment, index) => (
                    <CommentItem key={index}>
                        <CommentHeader>
                            <AuthorIcon>닉</AuthorIcon>
                            <span style={{ fontSize: '0.75rem', marginRight: '0.3rem' }}>닉네임</span>
                            <span style={{ fontSize: '0.7rem', color: '#888' }}>{comment.date}</span>
                        </CommentHeader>
                        <CommentContent>
                            {comment.content}
                        </CommentContent>
                        <CommentActions>
                            <CommentLikes
                                active={activeComments.includes(comment.id)}
                                onClick={() => toggleLike(comment.id)}
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                                </svg>
                                {comment.likes}
                            </CommentLikes>
                            <ReplyButton>답글</ReplyButton>
                            {index % 4 === 0 && (
                                <ReplyButton>더보기 ⌵</ReplyButton>
                            )}
                        </CommentActions>
                    </CommentItem>
                ))}
            </CommentsSection>

            {/* 페이지네이션 */}
            <Pagination>
                <PageButton active>1</PageButton>
                <PageButton>2</PageButton>
                <PageButton>3</PageButton>
                <PageButton>4</PageButton>
                <PageButton>5</PageButton>
                <PageButton>6</PageButton>
                <PageButton>7</PageButton>
                <PageButton>8</PageButton>
                <PageButton>9</PageButton>
                <PageButton>10</PageButton>
                <NavButton>10+ ▶</NavButton>
            </Pagination>
        </ArticleContainer>
    );
};

export default newsDetail;