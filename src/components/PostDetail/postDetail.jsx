import React, {useEffect, useRef, useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import dayjs from 'dayjs';
import * as S from "./postDetail.style.js";
import RKickIcon from "../../assets/good_red.svg";
import BKickIcon from "../../assets/good_black.svg";
import KickIcon from "../../assets/good.svg";
import ProfileIcon from "../../assets/profile.svg";
import SirenIcon from "../../assets/report.svg";
import { FaRegComment, FaCheckCircle } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import Pagination from "../Pagination/pagination";
import { MdExpandMore, MdExpandLess, MdIosShare } from "react-icons/md";
import { openReportModal } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import { getNewsDetail } from "../../apis/domains/news/news.js";
import { getBoardDetail } from "../../apis/domains/community/community.js";
import { getNewsCommentList } from "../../apis/domains/news/getNewsCommentList.js";
import { getProfilecard } from "../../apis/domains/common/getProfilecard.js";
import parse from 'html-react-parser';
import axiosInstance from "../../apis/axios-instance.js";

const PostDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [openReplyIds, setOpenReplyIds] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [openReReplyIds, setOpenReReplyIds] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [apiPost, setApiPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [totalCommentPages, setTotalCommentPages] = useState(1);
  const [commentsCount, setCommentsCount] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [canComment, setCanComment] = useState(false);

  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const { newsPk, boardPk } = useParams();
  const location = useLocation();
  const COMMENTS_PER_PAGE = 10;

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.more-button')) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getProfilecard();
        setUserProfile(profileData);
      } catch (err) {
        console.error("프로필 정보 가져오기 실패:", err);
      }
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        let response;
        if (location.pathname.includes('/news/') && newsPk) {
          response = await getNewsDetail(newsPk);
        } else if (location.pathname.includes('/community/') && boardPk) {
          response = await getBoardDetail(boardPk);
        }
        if (response && response.data) {
          setApiPost(response.data);
          setIsLiked(response.data.isKicked || false);
          if (userProfile && userProfile.teamPk) {
            const postTeamPk = response.data.team?.pk;
            setCanComment(userProfile.teamPk === postTeamPk);
          }
        }
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [newsPk, boardPk, location.pathname, userProfile]);

  // 댓글 목록 가져오기
  const fetchComments = async () => {
    if (location.pathname.includes('/news/') && newsPk) {
      try {
        setCommentLoading(true);
        const response = await getNewsCommentList({
          news: newsPk,
          size: COMMENTS_PER_PAGE,
          page: activePage
        });
        if (response && response.data) {
          setComments(response.data);
          setTotalCommentPages(response.meta?.totalPages || 1);
          setCommentsCount(response.meta?.totalItems || 0);
        }
      } catch (err) {
        setCommentError("댓글을 불러오는데 실패했습니다.");
      } finally {
        setCommentLoading(false);
      }
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/news/') && newsPk) {
      fetchComments();
    }
  }, [newsPk, activePage, location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleReplyBox = (commentId) => {
    setOpenReplyIds((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  // 댓글 등록
  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      const tempComment = {
        pk: `temp-${Date.now()}`,
        user: userProfile,
        contents: commentInput,
        replies: [],
        kicked: false,
        kickCount: 0,
        createdAt: new Date().toISOString()
      };
      setComments(prevComments => [tempComment, ...prevComments]);
      setCommentsCount(prevCount => prevCount + 1);
      setCommentInput("");
      if (apiPost) {
        setApiPost(prev => ({
          ...prev,
          replies: prev.replies + 1
        }));
      }
      const response = await axiosInstance.post("/api/news-reply", {
        news: parseInt(newsPk),
        contents: tempComment.contents
      });
      if (response.data) {
        setComments(prevComments => prevComments.map(comment =>
            comment.pk === tempComment.pk
                ? { ...response.data, user: userProfile, replies: [] }
                : comment
        ));
        fetchComments();
      }
    } catch (error) {
      setComments(prevComments =>
          prevComments.filter(comment => !comment.pk.toString().startsWith('temp-'))
      );
      setCommentsCount(prevCount => Math.max(0, prevCount - 1));
      if (apiPost) {
        setApiPost(prev => ({
          ...prev,
          replies: Math.max(0, prev.replies - 1)
        }));
      }
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 게시글 킥(좋아요) 토글 (기존과 동일)
  const toggleKick = async ({ isLiked, newsPk, boardPk }) => {
    try {
      if (newsPk) {
        const endpoint = "/api/news-kick";
        const body = { news: newsPk };
        await axiosInstance.post(endpoint, body);
      } else if (boardPk) {
        const endpoint = "/api/board-kick";
        const body = { board: boardPk };
        await axiosInstance.post(endpoint, body);
      }
    } catch (error) {
      console.error("Failed to toggle 킥:", error);
    }
  };

  // 댓글 킥(좋아요) 토글 (toggleKick과 동일 패턴)
  const toggleCommentKick = async (commentId) => {
    const commentToUpdate = comments.find(comment => comment.pk === commentId);
    if (!commentToUpdate) return;

    const originalKicked = commentToUpdate.kicked;
    const originalKickCount = commentToUpdate.kickCount;

    // 낙관적 UI
    setComments(prevComments =>
        prevComments.map(comment =>
            comment.pk === commentId
                ? {
                  ...comment,
                  kicked: !comment.kicked,
                  kickCount: comment.kicked
                      ? comment.kickCount - 1
                      : comment.kickCount + 1
                }
                : comment
        )
    );

    try {
      const isNewsReply = location.pathname.includes('/news/');
      const endpoint = isNewsReply ? "/api/news-reply-kick" : "/api/board-reply-kick";
      await axiosInstance.post(endpoint, { reply: commentId });
    } catch (error) {
      // 실패 시 원상 복구
      setComments(prevComments =>
          prevComments.map(comment =>
              comment.pk === commentId
                  ? {
                    ...comment,
                    kicked: originalKicked,
                    kickCount: originalKickCount
                  }
                  : comment
          )
      );
      console.error("댓글 좋아요 토글 실패:", error);
    }
  };

  // 답글 킥(좋아요) 토글도 동일 패턴 적용
  const toggleReplyKick = async (replyId) => {
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

    const originalKicked = targetReply.kicked;
    const originalKickCount = targetReply.kickCount;

    setComments(prevComments =>
        prevComments.map(comment => {
          if (comment.replies && comment.replies.some(reply => reply.pk === replyId)) {
            return {
              ...comment,
              replies: comment.replies.map(reply =>
                  reply.pk === replyId
                      ? {
                        ...reply,
                        kicked: !reply.kicked,
                        kickCount: reply.kicked
                            ? reply.kickCount - 1
                            : reply.kickCount + 1
                      }
                      : reply
              ),
            };
          }
          return comment;
        })
    );

    try {
      const isNewsReply = location.pathname.includes('/news/');
      const endpoint = isNewsReply ? "/api/news-reply-kick" : "/api/board-reply-kick";
      await axiosInstance.post(endpoint, { reply: replyId });
    } catch (error) {
      setComments(prevComments =>
          prevComments.map(comment => {
            if (comment.replies && comment.replies.some(reply => reply.pk === replyId)) {
              return {
                ...comment,
                replies: comment.replies.map(reply =>
                    reply.pk === replyId
                        ? {
                          ...reply,
                          kicked: originalKicked,
                          kickCount: originalKickCount
                        }
                        : reply
                ),
              };
            }
            return comment;
          })
      );
      console.error("답글 좋아요 토글 실패:", error);
    }
  };

  const toggleReReplyBox = (replyId) => {
    setOpenReReplyIds((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!apiPost) return <div>데이터가 없습니다.</div>;

  const displayComments = location.pathname.includes('/news/')
      ? comments
      : [];

  return (
      <S.ArticleContainer>
        {location.pathname.includes('/news/') && (
            <S.ArticleImage src={apiPost.thumbnailUrl || apiPost.image} alt="뉴스 이미지"/>
        )}
        {apiPost.hasImage && (
            <S.ArticleImage src={apiPost.imageUrl} alt="게시글 이미지"/>
        )}
        {location.pathname.includes('/news/') && (
            <S.ArticleLabel>
              <S.ArticleTeam src={apiPost.team?.logoUrl} alt={apiPost.team?.nameKr}/>
              <S.ArticleCategory>
                {apiPost.category}
              </S.ArticleCategory>
            </S.ArticleLabel>
        )}
        <S.ArticleHeader>
          <S.ArticleTitle>{apiPost.title}</S.ArticleTitle>
          <S.ArticleInfo>
            <img
                src={apiPost.user.profileImageUrl || ProfileIcon}
                alt="프로필 아이콘"
                width={24}
                height={24}
                style={{borderRadius: '50%'}}
            />
            {apiPost.user?.nickname}
            <FaCheckCircle/>
            <S.TimeLabel>
              {new Date(apiPost.createdAt).toLocaleString()}
            </S.TimeLabel>{" "}
            | <S.ViewLabel>읽음 {apiPost.views}</S.ViewLabel>
            <S.ArticleMeta>
              <img src={KickIcon} alt="좋아요수 아이콘" width={10} height={10}/>{" "}
              {apiPost.likes}
              <FaRegComment alt="댓글수 아이콘"/> {apiPost.replies}
              <FiMoreHorizontal
                  className="more-button"
                  alt="더보기 버튼"
                  onClick={toggleMenu}
                  style={{cursor: "pointer"}}
              />
              {isMenuOpen && (
                  <S.MoreMenu ref={menuRef}>
                    <S.MenuItem>
                      <MdIosShare size={16}/>
                      공유하기
                    </S.MenuItem>
                    <S.MenuItem onClick={() => dispatch(openReportModal())}>
                      <img src={SirenIcon} alt="신고 아이콘" width={16} height={16}/>
                      신고하기
                    </S.MenuItem>
                  </S.MoreMenu>
              )}
            </S.ArticleMeta>
          </S.ArticleInfo>
        </S.ArticleHeader>

        <S.ArticleContent>
          {location.pathname.includes('/community/') && apiPost.hasImage &&
              <S.ArticleImage src={apiPost.image}/>
          }
          <S.ArticleText>{parse(apiPost.content)}</S.ArticleText>
        </S.ArticleContent>

        <S.ArticleActions>
          <S.LikeButton
              isLiked={isLiked}
              onClick={async () => {
                try {
                  await toggleKick({ isLiked: !isLiked, newsPk, boardPk });
                  setIsLiked(!isLiked);
                  setApiPost((prev) => ({
                    ...prev,
                    likes: isLiked ? prev.likes - 1 : prev.likes + 1,
                  }));
                } catch (error) {
                  console.error("Failed to toggle 킥:", error);
                }
              }}
          >
            <img src={isLiked ? RKickIcon : BKickIcon} alt="킥 아이콘" width={14} height={14} />
            <span>킥</span>
            <span className="likes">{apiPost.likes}</span>
          </S.LikeButton>
        </S.ArticleActions>

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

        {displayComments.length > 0 && (
            <S.CommentsSection>
              <S.CommentsSectionTitle>댓글 {commentsCount}개</S.CommentsSectionTitle>
              {commentLoading && <div>댓글 로딩 중...</div>}
              {commentError && <div>{commentError}</div>}
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
                                width={24}
                                height={24}
                                style={{
                                  borderRadius: '50%',
                                  objectFit: 'cover'
                                }}
                            />
                            <span
                                style={{
                                  fontSize: "0.75rem",
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
                              key={comment.pk}
                              active={comment.kicked}
                              onClick={() => toggleCommentKick(comment.pk)}
                          >
                            <img
                                src={comment.kicked ? RKickIcon : KickIcon}
                                alt="좋아요 아이콘"
                                width={12}
                                height={12}
                            />
                            {comment.kickCount || 0}
                          </S.CommentLikes>
                        </S.CommentHeaderWrapper>
                        <S.CommentContent>{comment.contents || comment.content}</S.CommentContent>
                        <S.CommentActions>
                          {location.pathname.includes('/community/') && canComment && (
                              <S.ReplyButton
                                  isActive={openReplyIds[comment.pk]}
                                  onClick={() => toggleReplyBox(comment.pk)}
                              >
                                답글
                              </S.ReplyButton>
                          )}
                          {openReplyIds[comment.pk] && (
                              <S.ReplyInputWrapper>
                                <S.ReplyInput placeholder="답글을 입력하세요..."/>
                                <S.ReplySubmitButton>등록</S.ReplySubmitButton>
                              </S.ReplyInputWrapper>
                          )}
                          {(comment.replies?.length ?? 0) > 0 && (
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
                        {comment.replies &&
                            comment.replies.length > 0 &&
                            showReplies[comment.pk] && (
                                <S.RepliesContainer>
                                  {comment.replies.map((reply) => (
                                      <S.ReplyItem key={reply.pk}>
                                        <S.ReplyHeaderWrapper>
                                          <S.ReplyHeader>
                                            <img
                                                src={reply.user.profileImageUrl || ProfileIcon}
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
                                              active={reply.kicked}
                                              onClick={() => toggleReplyKick(reply.pk)}
                                          >
                                            <img
                                                src={reply.kicked ? RKickIcon : KickIcon}
                                                alt="좋아요 아이콘"
                                                width={12}
                                                height={12}
                                            />
                                            {reply.kickCount || 0}
                                          </S.ReplyLikes>
                                        </S.ReplyHeaderWrapper>
                                        <S.ReplyContent>{reply.contents}</S.ReplyContent>
                                        <S.ReplyActions>
                                          {location.pathname.includes('/community/') && canComment && (
                                              <S.ReplyActionButton
                                                  isActive={openReReplyIds[reply.pk]}
                                                  onClick={() => toggleReReplyBox(reply.pk)}
                                              >
                                                답글
                                              </S.ReplyActionButton>
                                          )}
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
        {commentsCount > 0 && (
            <Pagination
                activePage={activePage}
                setActivePage={setActivePage}
                totalPages={location.pathname.includes('/news/') ? totalCommentPages : 10}
            />
        )}
      </S.ArticleContainer>
  );
};

export default PostDetail;
