import React, {useEffect, useRef, useState} from "react";
import {useParams, useLocation} from "react-router-dom"; // 추가된 부분
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
import { LuSiren } from "react-icons/lu";
import { openReportModal } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import { getNewsDetail } from "../../apis/domains/news/news.js";
import { getBoardDetail } from "../../apis/domains/community/community.js";
import { getNewsCommentList } from "../../apis/domains/news/getNewsCommentList.js"; // 뉴스 댓글 API 가져오기
import { getProfilecard } from "../../apis/domains/common/getProfilecard.js"; // 프로필 카드 정보 가져오기
import parse from 'html-react-parser';
import axiosInstance from "../../apis/axios-instance.js";

const PostDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [likedComments, setLikedComments] = useState({});
  const [likedReplies, setLikedReplies] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [openReplyIds, setOpenReplyIds] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [openReReplyIds, setOpenReReplyIds] = useState({});
  const [commentInput, setCommentInput] = useState(""); // 추가: 댓글 입력 상태

  // API 연동을 위한 상태 추가
  const [apiPost, setApiPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 댓글 API 연동을 위한 상태 추가
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [totalCommentPages, setTotalCommentPages] = useState(1);
  const [commentsCount, setCommentsCount] = useState(0);

  // 사용자 프로필 정보 상태 추가
  const [userProfile, setUserProfile] = useState(null);
  const [canComment, setCanComment] = useState(false);

  const menuRef = useRef(null);
  const dispatch = useDispatch();

  // 추가된 부분: URL 파라미터와 현재 경로 가져오기
  const { newsPk, boardPk } = useParams();
  const location = useLocation();
  const COMMENTS_PER_PAGE = 10; // 페이지당 댓글 수

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.more-button')) {
      setIsMenuOpen(false);
    }
  };

  const handleReport = () => {
    setIsMenuOpen(false); // 메뉴 닫기

    // 현재 경로에 따라 신고 타입 결정
    const reportType = location.pathname.includes('/news/') ? 'news' : 'board';
    const contentId = reportType === 'news' ? Number(newsPk) : Number(boardPk);

    // 신고 모달 열기
    dispatch(openReportModal({ type: reportType, id: contentId }));
  };

  const copyToClipboard = () => {
    const currentUrl = window.location.href;

    // 모던 브라우저에서는 Clipboard API 사용
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl)
          .then(() => {
            alert("URL이 클립보드에 복사되었습니다.");
          })
          .catch((err) => {
            console.error('클립보드 복사 실패:', err);
          });
    } else {
      // 구형 브라우저를 위한 대체 방법
      const tempInput = document.createElement('input');
      tempInput.value = currentUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert("URL이 클립보드에 복사되었습니다.");
    }
  };

  useEffect(() => {
    // 메뉴 닫기 이벤트 리스너 추가
    document.addEventListener('click', handleClickOutside);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 사용자 프로필 정보 가져오기
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getProfilecard();
        console.log("프로필 데이터:", profileData);
        setUserProfile(profileData);
      } catch (err) {
        console.error("프로필 정보 가져오기 실패:", err);
      }
    };

    fetchProfileData();
  }, []);

  // 게시글 상세 정보 가져오기
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        let response;

        console.log("현재 경로:", location.pathname);
        console.log("파라미터:", { newsPk, boardPk });

        if (location.pathname.includes('/news/') && newsPk) {
          console.log("뉴스 상세 조회 시도");
          response = await getNewsDetail(newsPk);
          console.log("뉴스 API 응답:", response);
        } else if (location.pathname.includes('/community/') && boardPk) {
          console.log("게시글 상세 조회 시도");
          response = await getBoardDetail(boardPk);
          console.log("게시글 API 응답:", response);
        }

        if (response) {
          console.log("API 응답 구조:", typeof response, Object.keys(response));

          if (response.data) {
            setApiPost(response.data);
            setIsLiked(response.data.isKicked || false);

            // 사용자의 팀 정보와 현재 게시글의 팀 정보 비교하여 댓글 작성 가능 여부 설정
            if (userProfile && userProfile.teamPk) {
              const postTeamPk = response.data.team?.pk;
              setCanComment(userProfile.teamPk === postTeamPk);
            }
          } else {
            console.error("API 응답에 data가 없음:", response);
          }
        } else {
          console.error("API 응답이 undefined입니다.");
        }
      } catch (err) {
        console.error("상세 정보 가져오기 실패:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [newsPk, boardPk, location.pathname, userProfile]);

  // 댓글 목록 가져오기
  const fetchComments = async () => {
    // 뉴스 경로이고 newsPk가 있을 때만 댓글 API 호출
    if (location.pathname.includes('/news/') && newsPk) {
      try {
        setCommentLoading(true);
        const response = await getNewsCommentList({
          news: newsPk,
          size: COMMENTS_PER_PAGE,
          page: activePage
        });

        console.log("댓글 API 응답:", response);

        if (response && response.data) {
          setComments(response.data);
          setTotalCommentPages(response.meta?.totalPages || 1);
          setCommentsCount(response.meta?.totalItems || 0);

          // 댓글 좋아요 상태 초기화
          const initialLikedComments = {};
          const initialLikedReplies = {};

          response.data.forEach(comment => {
            initialLikedComments[comment.pk] = comment.kicked || false;

            // 답글 좋아요 상태 초기화
            if (comment.replies && comment.replies.length > 0) {
              comment.replies.forEach(reply => {
                initialLikedReplies[reply.pk] = reply.kicked || false;
              });
            }
          });

          setLikedComments(initialLikedComments);
          setLikedReplies(initialLikedReplies);
        }
      } catch (err) {
        console.error("댓글 가져오기 실패:", err);
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
    if (!commentInput.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      // 현재 전체 댓글 수 계산
      const totalCommentsBeforeAdd = commentsCount;

      // 새 댓글이 위치할 페이지 계산
      const targetPage = Math.ceil((totalCommentsBeforeAdd + 1) / COMMENTS_PER_PAGE);

      // 실제 API 요청
      const response = await axiosInstance.post("/api/news-reply", {
        news: parseInt(newsPk),
        contents: commentInput
      });

      // 댓글 입력창 초기화
      setCommentInput("");

      // 댓글 카운트 업데이트
      setCommentsCount(prevCount => prevCount + 1);
      if (apiPost) {
        setApiPost(prev => ({
          ...prev,
          replies: prev.replies + 1
        }));
      }

      // 현재 페이지와 타겟 페이지 비교 후 필요시 페이지 변경
      if (activePage !== targetPage) {
        // 타겟 페이지로 이동 (페이지 상태 변경)
        setActivePage(targetPage);
        // fetchComments는 useEffect를 통해 activePage가 변경될 때 자동으로 호출됨
      } else {
        // 현재 페이지에 댓글이 추가되는 경우 현재 페이지 데이터만 다시 불러오기
        fetchComments();
      }

    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
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

  const toggleKick = async ({ isLiked, newsPk, boardPk }) => {
    try {
      if (newsPk) {
        // 뉴스 킥 API
        const endpoint = "/api/news-kick";
        const body = { news: newsPk };
        if (isLiked) {
          await axiosInstance.post(endpoint, body); // Create 킥
        } else {
          await axiosInstance.post(endpoint, body); // Delete 킥 (based on PK)
        }
      } else if (boardPk) {
        // 게시글 킥 API
        const endpoint = "/api/board-kick";
        const body = { board: boardPk };
        if (isLiked) {
          await axiosInstance.post(endpoint, body); // Create 킥
        } else {
          await axiosInstance.post(endpoint, body); // Delete 킥 (based on PK)
        }
      }
    } catch (error) {
      console.error("Failed to toggle 킥:", error);
    }
  };

  // 로딩 중일 때 표시
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!apiPost) return <div>데이터가 없습니다.</div>;

  // 댓글 데이터가 없을 경우 빈 배열 설정
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
                    <S.MenuItem onClick={copyToClipboard}>
                      <MdIosShare alt="공유 아이콘" size={15} />
                      공유하기
                    </S.MenuItem>
                    <S.MenuItem onClick={handleReport}>
                      <LuSiren alt="신고 아이콘" size={15} />
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
                  setIsLiked(!isLiked); // Toggle the local state
                  setApiPost((prev) => ({
                    ...prev,
                    likes: isLiked ? prev.likes - 1 : prev.likes + 1, // Update likes count
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
                          {location.pathname.includes('/community/') && canComment && (
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
                                          {location.pathname.includes('/community/') && canComment && (
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
                totalPages={location.pathname.includes('/news/') ? totalCommentPages : 10}
            />
        )}

      </S.ArticleContainer>
  );
};

export default PostDetail;