import * as S from './comment.style.js';
import ProfileIcon from "../../assets/profile.svg";
import dayjs from "dayjs";
import RKickIcon from "../../assets/good_red.svg";
import KickIcon from "../../assets/good.svg";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import Pagination from "../Pagination/pagination.jsx";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getNewsCommentList} from "../../apis/domains/news/getNewsCommentList.js";
import {getCommunityCommentList} from "../../apis/domains/community/getCommunityCommentList.js";
import axiosInstance from "../../apis/axios-instance.js";
import LoadingSpinner from "../LoadingSpinner/loadingSpinner.jsx";

const Comment = ({postType, postPk, canComment}) => {

    const [activePage, setActivePage] = useState(1);
    const [likedComments, setLikedComments] = useState({});
    const [openReplyIds, setOpenReplyIds] = useState({});
    const [showReplies, setShowReplies] = useState({});
    const [commentInput, setCommentInput] = useState("");
    const [replyInputs, setReplyInputs] = useState({});

    // API 연동을 위한 상태 추가
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 댓글 API 연동을 위한 상태 추가
    const [comments, setComments] = useState([]);
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
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (postPk) fetchComments();
    }, [postPk, activePage]);

    // 댓글 입력 핸들러
    const handleCommentInputChange = (e) => {
        setCommentInput(e.target.value);
    };

    // 대댓글 입력 핸들러
    const handleReplyInputChange = (id, value) => {
        setReplyInputs(prev => ({
            ...prev,
            [id]: value
        }));
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

    // 대댓글 제출 핸들러
    const handleReplySubmit = async (parentId, parentType = 'comment') => {
        const replyText = replyInputs[parentId];
        if (!replyText || !replyText.trim()) return alert("답글을 입력해주세요.");

        try {
            const isNewsReply = location.pathname.includes('/news/');
            const url = isNewsReply ? "/api/news-reply" : "/api/board-reply";

            await axiosInstance.post(url, {
                [postType]: parseInt(postPk),
                contents: replyText,
                parentReply: parentId
            });

            // 입력 필드 초기화
            setReplyInputs(prev => ({
                ...prev,
                [parentId]: ""
            }));

            // 대댓글 입력 박스 닫기
            setOpenReplyIds(prev => ({
                ...prev,
                [parentId]: false
            }));

            // 해당 댓글의 답글 영역 열기
            if (parentType === 'comment') {
                setShowReplies(prev => ({
                    ...prev,
                    [parentId]: true
                }));
            }

            // 댓글 목록 새로고침
            fetchComments();
        } catch (err) {
            alert("답글 작성에 실패했습니다.");
        }
    };

    // 댓글/답글 킥(좋아요) 토글 함수
    const toggleKick = async (id) => {
        try {
            const currentKickState = likedComments[id] || false;

            // 낙관적 UI 업데이트를 위한 함수
            const updateCommentsData = (comments) => {
                return comments.map(comment => {
                    // 댓글 ID가 일치하는 경우
                    if (comment.pk === id) {
                        const newKickCount = currentKickState
                            ? Math.max(0, comment.kickCount - 1)
                            : (comment.kickCount || 0) + 1;
                        return { ...comment, kickCount: newKickCount, kicked: !currentKickState };
                    }

                    // 답글이 있는 경우 답글도 확인
                    if (comment.replies && comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: comment.replies.map(reply => {
                                // 답글 ID가 일치하는 경우
                                if (reply.pk === id) {
                                    const newKickCount = currentKickState
                                        ? Math.max(0, reply.kickCount - 1)
                                        : (reply.kickCount || 0) + 1;
                                    return { ...reply, kickCount: newKickCount, kicked: !currentKickState };
                                }

                                // 대댓글이 있는 경우 대댓글도 확인 (계층 구조 지원)
                                if (reply.replies && reply.replies.length > 0) {
                                    return {
                                        ...reply,
                                        replies: reply.replies.map(reReply => {
                                            if (reReply.pk === id) {
                                                const newKickCount = currentKickState
                                                    ? Math.max(0, reReply.kickCount - 1)
                                                    : (reReply.kickCount || 0) + 1;
                                                return { ...reReply, kickCount: newKickCount, kicked: !currentKickState };
                                            }
                                            return reReply;
                                        })
                                    };
                                }

                                return reply;
                            })
                        };
                    }

                    return comment;
                });
            };

            // 좋아요 상태 업데이트
            setLikedComments(prev => ({
                ...prev,
                [id]: !currentKickState
            }));

            // 댓글 데이터 업데이트
            setComments(prevComments => updateCommentsData(prevComments));

            // API 호출
            const isNewsReply = location.pathname.includes('/news/');
            const endpoint = isNewsReply ? "/api/news-reply-kick" : "/api/board-reply-kick";
            const body = { reply: id };
            await axiosInstance.post(endpoint, body);
        } catch (error) {
            // 오류 발생 시 UI 롤백
            setLikedComments(prev => ({
                ...prev,
                [id]: !(prev[id] || false)
            }));
            fetchComments(); // 데이터 다시 불러오기
        }
    };

    // 답글 입력 박스 토글 함수
    const toggleReplyBox = (id) => {
        setOpenReplyIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // 답글 표시/숨김 토글 함수
    const toggleReplies = (id) => {
        setShowReplies(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // 로딩 중일 때 표시
    if (loading) return <LoadingSpinner />;

    // 댓글 렌더링 함수 (재귀적으로 대댓글 처리)
    const renderReplies = (replies, parentId, level = 1) => {
        if (!replies || replies.length === 0) return null;

        return (
            <S.RepliesContainer level={level}>
                {replies.map(reply => (
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
                                <span style={{fontSize: "0.65rem", color: "#888"}}>
                                    {dayjs(reply.createdAt).format('YYYY.MM.DD HH:mm')}
                                </span>
                            </S.ReplyHeader>
                            <S.ReplyLikes
                                active={likedComments[reply.pk] || false}
                                onClick={() => toggleKick(reply.pk)}
                            >
                                <img
                                    src={likedComments[reply.pk] ? RKickIcon : KickIcon}
                                    alt="좋아요 아이콘"
                                    width={12}
                                    height={12}
                                />
                                {reply.kickCount || 0}
                            </S.ReplyLikes>
                        </S.ReplyHeaderWrapper>
                        <S.ReplyContent>{reply.contents}</S.ReplyContent>

                        {/* 답글 작성 버튼 및 입력 박스 */}
                        <S.ReplyActions>
                            {(location.pathname.includes('/community/') || canComment) && (
                                <S.ReplyActionButton
                                    isActive={openReplyIds[reply.pk]}
                                    onClick={() => toggleReplyBox(reply.pk)}
                                >
                                    답글
                                </S.ReplyActionButton>
                            )}
                            {openReplyIds[reply.pk] && (
                                <S.ReplyInputWrapper>
                                    <S.ReplyInput
                                        placeholder="답글을 입력하세요..."
                                        value={replyInputs[reply.pk] || ""}
                                        onChange={(e) => handleReplyInputChange(reply.pk, e.target.value)}
                                    />
                                    <S.ReplySubmitButton
                                        onClick={() => handleReplySubmit(reply.pk, 'reply')}
                                    >
                                        등록
                                    </S.ReplySubmitButton>
                                </S.ReplyInputWrapper>
                            )}

                            {/* 대댓글이 있는 경우 토글 버튼 표시 */}
                            {reply.replies && reply.replies.length > 0 && (
                                <S.MoreButton onClick={() => toggleReplies(reply.pk)}>
                                    {showReplies[reply.pk] ? (
                                        <>
                                            <MdExpandLess size={16}/> 답글 숨기기
                                        </>
                                    ) : (
                                        <>
                                            <MdExpandMore size={16}/> 답글 {reply.replies.length}개
                                        </>
                                    )}
                                </S.MoreButton>
                            )}
                        </S.ReplyActions>

                        {/* 대댓글 표시 (재귀적으로 처리) */}
                        {reply.replies && reply.replies.length > 0 && showReplies[reply.pk] && (
                            renderReplies(reply.replies, reply.pk, level + 1)
                        )}
                    </S.ReplyItem>
                ))}
            </S.RepliesContainer>
        );
    };

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

            {comments.length > 0 && (
                <S.CommentsSection>
                    <S.CommentsSectionTitle>댓글 {commentsCount}개</S.CommentsSectionTitle>

                    {comments.map((comment) => (
                        <S.CommentItem key={comment.pk}>
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
                                    active={likedComments[comment.pk] || false}
                                    onClick={() => toggleKick(comment.pk)}
                                >
                                    <img
                                        src={likedComments[comment.pk] ? RKickIcon : KickIcon}
                                        alt="좋아요 아이콘"
                                        width={12}
                                        height={12}
                                    />
                                    {comment.kickCount || 0}
                                </S.CommentLikes>
                            </S.CommentHeaderWrapper>
                            <S.CommentContent>{comment.contents}</S.CommentContent>
                            <S.CommentActions>
                                {(location.pathname.includes('/community/') || canComment) && (
                                    <S.ReplyButton
                                        isActive={openReplyIds[comment.pk]}
                                        onClick={() => toggleReplyBox(comment.pk)}
                                    >
                                        답글
                                    </S.ReplyButton>
                                )}

                                {/* 답글 입력 박스 */}
                                {openReplyIds[comment.pk] && (
                                    <S.ReplyInputWrapper>
                                        <S.ReplyInput
                                            placeholder="답글을 입력하세요..."
                                            value={replyInputs[comment.pk] || ""}
                                            onChange={(e) => handleReplyInputChange(comment.pk, e.target.value)}
                                        />
                                        <S.ReplySubmitButton
                                            onClick={() => handleReplySubmit(comment.pk, 'comment')}
                                        >
                                            등록
                                        </S.ReplySubmitButton>
                                    </S.ReplyInputWrapper>
                                )}

                                {/* 답글 토글 버튼 */}
                                {comment.replies && comment.replies.length > 0 && (
                                    <S.MoreButton onClick={() => toggleReplies(comment.pk)}>
                                        {showReplies[comment.pk] ? (
                                            <>
                                                <MdExpandLess size={16}/> 답글 숨기기
                                            </>
                                        ) : (
                                            <>
                                                <MdExpandMore size={16}/> 답글 {comment.replies.length}개
                                            </>
                                        )}
                                    </S.MoreButton>
                                )}
                            </S.CommentActions>

                            {/* 대댓글 표시 - 토글 상태에 따라 표시 */}
                            {comment.replies && comment.replies.length > 0 && showReplies[comment.pk] && (
                                renderReplies(comment.replies, comment.pk)
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