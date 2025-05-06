import * as S from './comment.style.js';
import ProfileIcon from "../../assets/profile.svg";
import dayjs from "dayjs";
import RKickIcon from "../../assets/good_red.svg";
import KickIcon from "../../assets/good.svg";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import Pagination from "../Pagination/pagination.jsx";
import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {getNewsCommentList} from "../../apis/domains/news/getNewsCommentList.js";
import {getCommunityCommentList} from "../../apis/domains/community/getCommunityCommentList.js";
import axiosInstance from "../../apis/axios-instance.js";

const Comment = ({postType, postPk, canComment}) => {

    const [activePage, setActivePage] = useState(1);
    const [likedComments, setLikedComments] = useState({});
    const [likedReplies, setLikedReplies] = useState({});
    const [openReplyIds, setOpenReplyIds] = useState({});
    const [showReplies, setShowReplies] = useState({});
    const [openReReplyIds, setOpenReReplyIds] = useState({});
    const [commentInput, setCommentInput] = useState("");

    // API 연동을 위한 상태 추가
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 댓글 API 연동을 위한 상태 추가
    const [comments, setComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentError, setCommentError] = useState(null);
    const [totalCommentPages, setTotalCommentPages] = useState(1);
    const [commentsCount, setCommentsCount] = useState(0);

    // 추가된 부분: URL 파라미터와 현재 경로 가져오기
    const location = useLocation();
    const COMMENTS_PER_PAGE = 10; // 페이지당 댓글 수

    // 댓글 목록 가져오기
    const fetchComments = async () => {
        try {
            setLoading(true);
            const fetcher = postType === 'news' ? getNewsCommentList : getCommunityCommentList;
            const response = await fetcher({ [postType]: postPk, page: activePage, size: COMMENTS_PER_PAGE });
            setComments(response.data);
            setCommentsCount(response.meta?.totalItems || 0);
            setTotalCommentPages(response.meta?.totalPages || 1);
        } catch (e) {
            setError("댓글을 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (postPk) fetchComments();
    }, [postPk, activePage]);

    // 답글 버튼 토글 함수
    const toggleReplyBox = (commentId) => {
        setOpenReplyIds((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    // 답글 표시/숨김 토글 함수
    const toggleReplies = (commentId) => {
        setShowReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    // 댓글 입력 핸들러
    const handleCommentInputChange = (e) => {
        setCommentInput(e.target.value);
    };

    // 댓글 제출 핸들러
    const handleCommentSubmit = async () => {
        if (!commentInput.trim()) return alert("댓글을 입력해주세요.");
        try {
            const url = postType === 'news' ? "/api/news-reply" : "/api/board-reply";
            await axiosInstance.post(url, {
                [postType]: parseInt(postPk),
                contents: commentInput
            });
            setCommentInput("");
            fetchComments();
        } catch (err) {
            alert("댓글 작성에 실패했습니다.");
        }
    };


    // 댓글 킥(좋아요) 토글 함수
    const toggleCommentKick = async (commentId) => {
        try {
            const currentKickState = likedComments[commentId] || false;
            const commentToUpdate = comments.find(comment => comment.pk === commentId);
            if (!commentToUpdate) return;
            const currentKickCount = commentToUpdate.kickCount || 0;

            // 낙관적 UI 업데이트
            setLikedComments(prev => ({
                ...prev,
                [commentId]: !currentKickState
            }));
            setComments(prevComments =>
                prevComments.map(comment => {
                    if (comment.pk === commentId) {
                        const newKickCount = currentKickState
                            ? Math.max(0, currentKickCount - 1)
                            : currentKickCount + 1;
                        return {
                            ...comment,
                            kickCount: newKickCount,
                            kicked: !currentKickState
                        };
                    }
                    return comment;
                })
            );

            // API 호출
            const isNewsReply = location.pathname.includes('/news/');
            const endpoint = isNewsReply ? "/api/news-reply-kick" : "/api/board-reply-kick";
            const body = { reply: commentId };
            await axiosInstance.post(endpoint, body);
        } catch (error) {
            // 오류 발생 시 UI 롤백
            const currentKickState = likedComments[commentId] || false;
            const commentToUpdate = comments.find(comment => comment.pk === commentId);
            if (commentToUpdate) {
                const currentKickCount = commentToUpdate.kickCount || 0;
                setLikedComments(prev => ({
                    ...prev,
                    [commentId]: currentKickState
                }));
                setComments(prevComments =>
                    prevComments.map(comment => {
                        if (comment.pk === commentId) {
                            return {
                                ...comment,
                                kickCount: currentKickCount,
                                kicked: currentKickState
                            };
                        }
                        return comment;
                    })
                );
            }
        }
    };

    // 답글 킥(좋아요) 토글 함수
    const toggleReplyKick = async (replyId) => {
        try {
            const currentKickState = likedReplies[replyId] || false;
            let targetReply = null;
            comments.find(comment =>
                    comment.replies && comment.replies.some(reply => {
                        if (reply.pk === replyId) {
                            targetReply = reply;
                            return true;
                        }
                        return false;
                    })
            );
            if (!targetReply) return;
            const currentKickCount = targetReply.kickCount || 0;

            // 낙관적 UI 업데이트
            setLikedReplies(prev => ({
                ...prev,
                [replyId]: !currentKickState
            }));
            setComments(prevComments =>
                prevComments.map(comment => {
                    if (comment.replies && comment.replies.some(reply => reply.pk === replyId)) {
                        return {
                            ...comment,
                            replies: comment.replies.map(reply => {
                                if (reply.pk === replyId) {
                                    const newKickCount = currentKickState
                                        ? Math.max(0, currentKickCount - 1)
                                        : currentKickCount + 1;
                                    return {
                                        ...reply,
                                        kickCount: newKickCount,
                                        kicked: !currentKickState
                                    };
                                }
                                return reply;
                            })
                        };
                    }
                    return comment;
                })
            );

            // API 호출
            const isNewsReply = location.pathname.includes('/news/');
            const endpoint = isNewsReply ? "/api/news-reply-kick" : "/api/board-reply-kick";
            const body = { reply: replyId };
            await axiosInstance.post(endpoint, body);
        } catch (error) {
            // 오류 발생 시 UI 롤백
            const currentKickState = likedReplies[replyId] || false;
            setLikedReplies(prev => ({
                ...prev,
                [replyId]: currentKickState
            }));
            setComments(prevComments =>
                prevComments.map(comment => {
                    if (comment.replies && comment.replies.some(reply => reply.pk === replyId)) {
                        return {
                            ...comment,
                            replies: comment.replies.map(reply => {
                                if (reply.pk === replyId) {
                                    return {
                                        ...reply,
                                        kicked: currentKickState
                                    };
                                }
                                return reply;
                            })
                        };
                    }
                    return comment;
                })
            );
        }
    };

    const toggleReReplyBox = (replyId) => {
        setOpenReReplyIds((prev) => ({
            ...prev,
            [replyId]: !prev[replyId],
        }));
    };

    // 로딩 중일 때 표시
    if (loading) return <div>로딩 중...</div>;

    const displayComments = comments;


    return (
        <S.CommentsSection>
            {(location.pathname.includes('/community/') || canComment) && (
                <S.CommentInputBox>
                    <S.CommentInputLabel>댓글 쓰기</S.CommentInputLabel>
                    <S.CommentInputContainer>
                        <S.CommentInput
                            placeholder="댓글을 입력하세요..."
                            value={commentInput}
                            onChange={handleCommentInputChange}
                        />
                        <S.SubmitButton onClick={handleCommentSubmit}>등록</S.SubmitButton>
                    </S.CommentInputContainer>
                </S.CommentInputBox>
            )}

            {displayComments.length > 0 && (
                <S.CommentsSection>
                    <S.CommentsSectionTitle>댓글 {commentsCount}개</S.CommentsSectionTitle>

                    {/* 댓글 로딩 중 표시 */}
                    {commentLoading && <div>댓글 로딩 중...</div>}
                    {commentError && <div>{commentError}</div>}

                    {/* 댓글이 없는 경우 빈 화면 표시 */}
                    {!commentLoading && !commentError && displayComments.length === 0 && (
                        <S.EmptyComments>댓글이 없습니다.</S.EmptyComments>
                    )}

                    {displayComments.length > 0 &&
                        displayComments.map((comment) => (
                            <S.CommentItem key={comment.pk || comment.id}>
                                <S.CommentHeaderWrapper>
                                    <S.CommentHeader>
                                        <img
                                            src={comment.user.profileImageUrl || ProfileIcon}
                                            alt="프로필 아이콘"
                                            width={20}
                                            height={20}
                                            style={{
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: "0.7rem",
                                                marginRight: "0.3rem",
                                                color: "#000",
                                            }}
                                        >
                                            {comment.user.nickname}
                                        </span>
                                        <span style={{fontSize: "0.7rem", color: "#888"}}>
                                            {dayjs(comment.createdAt).format('YYYY.MM.DD HH:mm')}
                                        </span>
                                    </S.CommentHeader>
                                    <S.CommentLikes
                                        key={comment.pk || comment.id}
                                        active={likedComments[comment.pk || comment.id] || false}
                                        onClick={() => toggleCommentKick(comment.pk || comment.id)}
                                    >
                                        <img
                                            src={likedComments[comment.pk || comment.id] ? RKickIcon : KickIcon}
                                            alt="좋아요 아이콘"
                                            width={12}
                                            height={12}
                                        />
                                        {comment.kickCount || 0}
                                    </S.CommentLikes>
                                </S.CommentHeaderWrapper>
                                <S.CommentContent>{comment.contents || comment.content}</S.CommentContent>
                                <S.CommentActions>
                                    {(location.pathname.includes('/community/') || canComment) && (
                                        <S.ReplyButton
                                            isActive={openReplyIds[comment.pk || comment.id]}
                                            onClick={() => toggleReplyBox(comment.pk || comment.id)}
                                        >
                                            답글
                                        </S.ReplyButton>
                                    )}
                                    {/* 답글 입력 박스 - 답글 버튼 클릭시 표시 */}
                                    {openReplyIds[comment.pk || comment.id] && (
                                        <S.ReplyInputWrapper>
                                            <S.ReplyInput placeholder="답글을 입력하세요..."/>
                                            <S.ReplySubmitButton>등록</S.ReplySubmitButton>
                                        </S.ReplyInputWrapper>
                                    )}
                                    {(comment.replies?.length ?? 0) > 0 && (
                                        <S.MoreButton onClick={() => toggleReplies(comment.pk || comment.id)}>
                                            {showReplies[comment.pk || comment.id] ? (
                                                <>
                                                    <MdExpandLess size={16}/> 답글 숨기기
                                                </>
                                            ) : (
                                                <>
                                                    <MdExpandMore size={16}/> 답글 {comment.replies.length}
                                                    개
                                                </>
                                            )}
                                        </S.MoreButton>
                                    )}
                                </S.CommentActions>

                                {/* 답글 표시 - 토글 상태에 따라 표시 */}
                                {comment.replies &&
                                    comment.replies.length > 0 &&
                                    showReplies[comment.pk || comment.id] && (
                                        <S.RepliesContainer>
                                            {comment.replies.map((reply) => (
                                                <S.ReplyItem key={reply.pk}>
                                                    <S.ReplyHeaderWrapper>
                                                        <S.ReplyHeader>
                                                            <img
                                                                src={reply.user.profileImageUrl || ProfileIcon}
                                                                alt="프로필 아이콘"
                                                                width={20}
                                                                height={20}
                                                                style={{
                                                                    borderRadius: "50%",
                                                                    objectFit: "cover",
                                                                }}
                                                            />
                                                            <span
                                                                style={{
                                                                    fontSize: "0.7rem",
                                                                    marginRight: "0.3rem",
                                                                    color: "#000",
                                                                }}
                                                            >
                                                                {reply.user.nickname}
                                                            </span>
                                                            <span
                                                                style={{fontSize: "0.65rem", color: "#888"}}
                                                            >
                                                                {dayjs(reply.createdAt).format('YYYY.MM.DD HH:mm')}
                                                            </span>
                                                        </S.ReplyHeader>
                                                        <S.ReplyLikes
                                                            key={reply.pk}
                                                            active={likedReplies[reply.pk] || false}
                                                            onClick={() => toggleReplyKick(reply.pk)}
                                                        >
                                                            <img
                                                                src={
                                                                    likedReplies[reply.pk] ? RKickIcon : KickIcon
                                                                }
                                                                alt="좋아요 아이콘"
                                                                width={12}
                                                                height={12}
                                                            />
                                                            {reply.kickCount || 0}
                                                        </S.ReplyLikes>
                                                    </S.ReplyHeaderWrapper>
                                                    <S.ReplyContent>{reply.contents}</S.ReplyContent>

                                                    {/* New ReplyActions component */}
                                                    <S.ReplyActions>
                                                        {(location.pathname.includes('/community/') || canComment) && (
                                                            <S.ReplyActionButton
                                                                isActive={openReReplyIds[reply.pk]}
                                                                onClick={() => toggleReReplyBox(reply.pk)}
                                                            >
                                                                답글
                                                            </S.ReplyActionButton>
                                                        )}
                                                        {/* Re-reply input box */}
                                                        {openReReplyIds[reply.pk] && (
                                                            <S.ReplyInputWrapper>
                                                                <S.ReplyInput placeholder="답글을 입력하세요..."/>
                                                                <S.ReplySubmitButton>등록</S.ReplySubmitButton>
                                                            </S.ReplyInputWrapper>
                                                        )}
                                                    </S.ReplyActions>
                                                </S.ReplyItem>
                                            ))}
                                        </S.RepliesContainer>
                                    )}
                            </S.CommentItem>
                        ))}
                </S.CommentsSection>
            )}
            {/* 댓글이 있을 때만 페이지네이션 표시 */}
            {commentsCount > 0 && (
                <Pagination
                    activePage={activePage}
                    setActivePage={setActivePage}
                    totalPages={totalCommentPages}
                />
            )}
        </S.CommentsSection>

    );
};

export default Comment;