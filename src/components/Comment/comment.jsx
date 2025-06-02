import * as S from './comment.style.js';
import ProfileIcon from "../../assets/profile.svg";
import dayjs from "dayjs";
import RKickIcon from "../../assets/good_red.svg";
import KickIcon from "../../assets/good.svg";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import Pagination from "../Pagination/pagination.jsx";
import React, {useEffect, useState, useRef} from "react";
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
    const [replyTargets, setReplyTargets] = useState({}); // 답글 대상 저장
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [totalCommentPages, setTotalCommentPages] = useState(1);
    const [commentsCount, setCommentsCount] = useState(0);

    const location = useLocation();
    const COMMENTS_PER_PAGE = 10;

    // 답글 입력창 ref 관리
    const replyInputRefs = useRef({});

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

    // HTML을 일반 텍스트로 변환
    const getPlainTextFromHTML = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };

    // @멘션을 포함한 HTML을 서버 전송용 텍스트로 변환
    const formatContentForServer = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        // span 태그 내의 @멘션을 일반 텍스트로 변환
        const spans = div.querySelectorAll('span[style*="color: #C00C0B"]');
        spans.forEach(span => {
            const textNode = document.createTextNode(span.textContent);
            span.parentNode.replaceChild(textNode, span);
        });
        return div.textContent || div.innerText || '';
    };

    // @닉네임 패턴을 찾아서 스타일 적용
    const formatContentForDisplay = (content) => {
        if (!content) return content;
        return content.replace(/@(\S+)/g, '<span style="color: #C00C0B; font-weight: 500;">@$1</span>');
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

    // 답글 등록 - replyId와 rootCommentId를 구분해서 처리
    const handleReplySubmit = async (replyId, rootCommentId, parentType = 'comment') => {
        if (!canComment) return alert("같은 팀만 답글을 작성할 수 있습니다.");
        const el = replyInputRefs.current[replyId];
        const replyHTML = el ? el.innerHTML : "";
        if (!replyHTML || !getPlainTextFromHTML(replyHTML).trim()) return alert("답글을 입력해주세요.");

        try {
            const isNewsReply = location.pathname.includes('/news/');
            const url = isNewsReply ? "/api/news-reply" : "/api/board-reply";
            const contentForServer = formatContentForServer(replyHTML);

            await axiosInstance.post(url, {
                [postType]: parseInt(postPk),
                contents: contentForServer,
                parentReply: rootCommentId // 항상 최상위 댓글의 pk를 사용
            });

            // 입력창 비우기
            if (el) el.innerHTML = "";

            setOpenReplyIds(prev => ({
                ...prev,
                [replyId]: false
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

    // 좋아요 토글
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

    // 답글창 열기/닫기 및 멘션 세팅
    const toggleReplyBox = (commentId, targetNickname) => {
        setOpenReplyIds(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));

        if (!openReplyIds[commentId]) {
            setReplyTargets(prev => ({
                ...prev,
                [commentId]: targetNickname
            }));
            // 멘션 HTML 준비
            setTimeout(() => {
                const el = replyInputRefs.current[commentId];
                if (el) {
                    const mentionHtml = `<span style="color: #C00C0B; font-weight: 500;">@${targetNickname}</span>&nbsp;`;
                    el.innerHTML = mentionHtml;
                    // 커서를 맨 끝으로 이동
                    const range = document.createRange();
                    range.selectNodeContents(el);
                    range.collapse(false);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    el.focus();
                }
            }, 0);
        }
    };

    const toggleReplies = (id) => {
        setShowReplies(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (loading) return <LoadingSpinner />;

    // 답글 렌더링 - rootCommentId를 전달하여 올바른 parentReply 설정
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
                        <S.ReplyContent
                            dangerouslySetInnerHTML={{
                                __html: formatContentForDisplay(reply.contents)
                            }}
                        />
                        <S.ReplyActions>
                            {canComment && (
                                <S.ReplyActionButton
                                    isActive={openReplyIds[reply.pk]}
                                    onClick={() => toggleReplyBox(reply.pk, reply.user.nickname)}
                                >
                                    답글
                                </S.ReplyActionButton>
                            )}
                            {openReplyIds[reply.pk] && (
                                <S.ReplyInputWrapper>
                                    <S.EditableReplyInput
                                        contentEditable
                                        suppressContentEditableWarning={true}
                                        ref={el => replyInputRefs.current[reply.pk] = el}
                                        onInput={() => {/* 동기화 불필요! */}}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleReplySubmit(reply.pk, rootCommentId, 'reply');
                                            }
                                        }}
                                        onPaste={(e) => {
                                            e.preventDefault();
                                            const text = e.clipboardData.getData('text/plain');
                                            document.execCommand('insertText', false, text);
                                        }}
                                        style={{direction: "ltr", textAlign: "left"}}
                                    />
                                    <S.ReplySubmitButton
                                        onClick={() => handleReplySubmit(reply.pk, rootCommentId, 'reply')}
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
                    {comments.map(comment => (
                        <S.CommentItem key={comment.pk}>
                            <S.CommentHeaderWrapper>
                                <S.CommentHeader>
                                    <img
                                        src={comment.user.profileImageUrl || ProfileIcon}
                                        alt="프로필 아이콘"
                                        width={24}
                                        height={24}
                                        style={{
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: "0.8rem",
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
                                        width={14}
                                        height={14}
                                    />
                                    {comment.kickCount || 0}
                                </S.CommentLikes>
                            </S.CommentHeaderWrapper>
                            <S.CommentContent
                                dangerouslySetInnerHTML={{
                                    __html: formatContentForDisplay(comment.contents)
                                }}
                            />
                            <S.CommentActions>
                                {canComment && (
                                    <S.ReplyButton
                                        isActive={openReplyIds[comment.pk]}
                                        onClick={() => toggleReplyBox(comment.pk, comment.user.nickname)}
                                    >
                                        답글
                                    </S.ReplyButton>
                                )}
                                {openReplyIds[comment.pk] && (
                                    <S.ReplyInputWrapper>
                                        <S.EditableReplyInput
                                            contentEditable
                                            suppressContentEditableWarning={true}
                                            ref={el => replyInputRefs.current[comment.pk] = el}
                                            onInput={() => {/* 동기화 불필요! */}}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleReplySubmit(comment.pk, comment.pk, 'comment');
                                                }
                                            }}
                                            onPaste={(e) => {
                                                e.preventDefault();
                                                const text = e.clipboardData.getData('text/plain');
                                                document.execCommand('insertText', false, text);
                                            }}
                                            style={{direction: "ltr", textAlign: "left"}}
                                        />
                                        <S.ReplySubmitButton
                                            onClick={() => handleReplySubmit(comment.pk, comment.pk, 'comment')}
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
                                renderReplies(comment.replies, comment.pk, 1)
                            )}
                        </S.CommentItem>
                    ))}
                </S.CommentsSection>
            )}

            {totalCommentPages > 1 && (
                <Pagination
                    totalPages={totalCommentPages}
                    currentPage={activePage}
                    onPageChange={setActivePage}
                />
            )}
        </S.CommentsSection>
    );
};

export default Comment;