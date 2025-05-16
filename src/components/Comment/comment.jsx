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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [totalCommentPages, setTotalCommentPages] = useState(1);
    const [commentsCount, setCommentsCount] = useState(0);

    const location = useLocation();
    const COMMENTS_PER_PAGE = 10;

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

    const handleCommentInputChange = (e) => {
        setCommentInput(e.target.value);
    };

    const handleReplyInputChange = (id, value) => {
        setReplyInputs(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCommentSubmit = async () => {
        if (!canComment) return alert("같은 팀만 댓글을 작성할 수 있습니다.");
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

    // parentId를 항상 rootCommentId로 받도록 수정
    const handleReplySubmit = async (rootCommentId, parentType = 'comment') => {
        if (!canComment) return alert("같은 팀만 답글을 작성할 수 있습니다.");
        const replyText = replyInputs[rootCommentId];
        if (!replyText || !replyText.trim()) return alert("답글을 입력해주세요.");

        try {
            const isNewsReply = location.pathname.includes('/news/');
            const url = isNewsReply ? "/api/news-reply" : "/api/board-reply";

            await axiosInstance.post(url, {
                [postType]: parseInt(postPk),
                contents: replyText,
                parentReply: rootCommentId
            });

            setReplyInputs(prev => ({
                ...prev,
                [rootCommentId]: ""
            }));

            setOpenReplyIds(prev => ({
                ...prev,
                [rootCommentId]: false
            }));

            if (parentType === 'comment') {
                setShowReplies(prev => ({
                    ...prev,
                    [rootCommentId]: true
                }));
            }

            fetchComments();
        } catch (err) {
            alert("답글 작성에 실패했습니다.");
        }
    };

    const toggleKick = async (id) => {
        try {
            const currentKickState = likedComments[id] || false;
            const updateCommentsData = (comments) => {
                return comments.map(comment => {
                    if (comment.pk === id) {
                        const newKickCount = currentKickState
                            ? Math.max(0, comment.kickCount - 1)
                            : (comment.kickCount || 0) + 1;
                        return { ...comment, kickCount: newKickCount, kicked: !currentKickState };
                    }
                    if (comment.replies && comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: comment.replies.map(reply => {
                                if (reply.pk === id) {
                                    const newKickCount = currentKickState
                                        ? Math.max(0, reply.kickCount - 1)
                                        : (reply.kickCount || 0) + 1;
                                    return { ...reply, kickCount: newKickCount, kicked: !currentKickState };
                                }
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

            setLikedComments(prev => ({
                ...prev,
                [id]: !currentKickState
            }));

            setComments(prevComments => updateCommentsData(prevComments));

            const isNewsReply = location.pathname.includes('/news/');
            const endpoint = isNewsReply ? "/api/news-reply-kick" : "/api/board-reply-kick";
            const body = { reply: id };
            await axiosInstance.post(endpoint, body);
        } catch (error) {
            setLikedComments(prev => ({
                ...prev,
                [id]: !(prev[id] || false)
            }));
            fetchComments();
        }
    };

    const toggleReplyBox = (id) => {
        setOpenReplyIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const toggleReplies = (id) => {
        setShowReplies(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (loading) return <LoadingSpinner />;

    // rootCommentId를 추가로 받아서 항상 최상위 댓글 pk를 parentId로 넘김
    const renderReplies = (replies, rootCommentId, level = 1) => {
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
                                    {dayjs(reply.createdAt).add(9, 'hour').format('YYYY.MM.DD HH:mm')}
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
                        <S.ReplyActions>
                            {canComment && (
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
                                        value={replyInputs[rootCommentId] || ""}
                                        onChange={(e) => handleReplyInputChange(rootCommentId, e.target.value)}
                                    />
                                    <S.ReplySubmitButton
                                        onClick={() => handleReplySubmit(rootCommentId, 'reply')}
                                    >
                                        등록
                                    </S.ReplySubmitButton>
                                </S.ReplyInputWrapper>
                            )}
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
                        {reply.replies && reply.replies.length > 0 && showReplies[reply.pk] && (
                            renderReplies(reply.replies, rootCommentId, level + 1)
                        )}
                    </S.ReplyItem>
                ))}
            </S.RepliesContainer>
        );
    };

    return (
        <S.CommentsSection>
            {canComment && (
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
                                        {dayjs(comment.createdAt).add(9, 'hour').format('YYYY.MM.DD HH:mm')}
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
                                {canComment && (
                                    <S.ReplyButton
                                        isActive={openReplyIds[comment.pk]}
                                        onClick={() => toggleReplyBox(comment.pk)}
                                    >
                                        답글
                                    </S.ReplyButton>
                                )}
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
                            {comment.replies && comment.replies.length > 0 && showReplies[comment.pk] && (
                                renderReplies(comment.replies, comment.pk)
                            )}
                        </S.CommentItem>
                    ))}
                </S.CommentsSection>
            )}

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
