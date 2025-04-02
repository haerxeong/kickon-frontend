import React, {useEffect, useRef, useState} from 'react';
import {
    ArticleContainer, ArticleHeader, ArticleTitle, ArticleInfo,
    VerifiedIcon, ArticleMeta, ArticleContent, ArticleImage,
    ArticleText, ArticleActions, LikeButton, TimeLabel, ViewLabel,
    CommentInputBox, CommentInputLabel, CommentInput, SubmitButton,
    CommentsSection, CommentItem, CommentHeader, CommentContent,
    CommentActions, CommentLikes, ReplyButton, PaginationWrapper,
    PageButton, NavButton, CommentInputContainer, CommentsSectionTitle, CommentHeaderWrapper, MoreButton
} from './postDetail.style.js';
import RKickIcon from "../../assets/good_red.svg"
import BKickIcon from "../../assets/good_black.svg"
import KickIcon from "../../assets/good.png"
import ProfileIcon from "../../assets/profile.svg"
import { FaRegComment } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdExpandMore } from "react-icons/md";


const PostDetail = () => {
    const [commentText, setCommentText] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [likedComments, setLikedComments] = useState({});
    const menuRef = useRef(null);

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.more-button')) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        // 클릭했을 때 메뉴를 닫도록 이벤트 리스너 추가
        document.addEventListener('click', handleClickOutside);

        // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleLike = (commentId) => {
        setLikedComments((prev) => ({
            ...prev,
            [commentId]: !prev[commentId], // 클릭한 댓글만 토글
        }));
    };

    // 댓글 데이터
    const comments = Array(15).fill().map((_, index) => ({
        id: index,
        author: '닉네임',
        date: '2025.01.20 10:42',
        content: index % 5 === 2 ? '잘보고 가요! 손흥민 선수 응원합니다!' : '서울은 전북 노인네들만 영입하냐',
        likes: index % 2 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
        isLiked: false
    }));

    return (
        <ArticleContainer>
            <ArticleHeader>
                <ArticleTitle>(속보) 손흥민 부상 ㄷㄷ</ArticleTitle>
                <ArticleInfo>
                    <img src={ProfileIcon} alt="프로필 아이콘" width={24} height={24} />
                    닉네임
                    <VerifiedIcon>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5c-1.51 0-2.816.917-3.437 2.25-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" fill="currentColor" />
                        </svg>
                    </VerifiedIcon>
                    <TimeLabel>1시간 전</TimeLabel> • <ViewLabel>읽음 1,204</ViewLabel>
                    <ArticleMeta>
                        <img src={KickIcon} alt="좋아요수 아이콘" width={14} height={14} />56
                        <FaRegComment alt="댓글수 아이콘" />20
                    </ArticleMeta>
                    <FiMoreHorizontal
                        className="more-button"
                        onClick={() => {
                            console.log("Button clicked"); // 클릭 확인용 로그
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        alt="더보기 아이콘"
                    />
                </ArticleInfo>
            </ArticleHeader>

            {/* 게시글 내용 */}
            <ArticleContent>
                <ArticleImage src="/api/placeholder/400/250" alt="경기장 이미지" />
                <ArticleText>
                    전북현대(이하 전북)가 국가대표 출신 측면 윙어 문선민과 작별했다.

                </ArticleText>
            </ArticleContent>

            {/* 게시글 액션 */}
            <ArticleActions>
                <LikeButton>
                    <img src={BKickIcon} alt="킥 아이콘" width={14} height={14} />
                    킥
                </LikeButton>
            </ArticleActions>

            <CommentInputBox>
                <CommentInputLabel>댓글 쓰기</CommentInputLabel>
                <CommentInputContainer>
                    <CommentInput
                        placeholder="댓글을 입력하세요..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <SubmitButton>등록</SubmitButton>
                </CommentInputContainer>
            </CommentInputBox>

            {/* 댓글 섹션 */}
            <CommentsSection>
                <CommentsSectionTitle>댓글 14개</CommentsSectionTitle>
                {comments.map((comment, index) => (
                    <CommentItem key={index}>
                        <CommentHeaderWrapper>
                            <CommentHeader>
                                <img src={ProfileIcon} alt="프로필 아이콘" width={24} height={24} />
                                <span style={{ fontSize: '0.75rem', marginRight: '0.3rem', color: '#000' }}>닉네임</span>
                                <span style={{ fontSize: '0.7rem', color: '#888' }}>{comment.date}</span>
                            </CommentHeader>
                            <CommentLikes
                                key={comment.id}
                                active={likedComments[comment.id] || false} // 개별적으로 관리
                                onClick={() => toggleLike(comment.id)}
                            >
                                <img
                                    src={likedComments[comment.id] ? RKickIcon : KickIcon} // 개별 상태 반영
                                    alt="좋아요 아이콘"
                                    width={12}
                                    height={12}
                                    style={{ cursor: "pointer" }}
                                />
                                {comment.likes}
                            </CommentLikes>
                        </CommentHeaderWrapper>
                        <CommentContent>
                            {comment.content}
                        </CommentContent>
                        <CommentActions>
                            <ReplyButton>답글</ReplyButton>
                            {index % 4 === 0 && (
                                <MoreButton> <MdExpandMore width={20} height={20}/>  답글 2개</MoreButton>
                            )}
                        </CommentActions>
                    </CommentItem>
                ))}
            </CommentsSection>

            <PaginationWrapper>
                <NavButton onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}>
                    {'<'} 이전
                </NavButton>
                {Array.from({ length: 10 }, (_, i) => (
                    <PageButton
                        key={i + 1}
                        active={activePage === i + 1}
                        onClick={() => setActivePage(i + 1)}
                    >
                        {i + 1}
                    </PageButton>
                ))}
                <NavButton onClick={() => setActivePage(prev => Math.min(prev + 1, 10))}>
                    다음 {'>'}
                </NavButton>
            </PaginationWrapper>
        </ArticleContainer>
    );
};

export default PostDetail;