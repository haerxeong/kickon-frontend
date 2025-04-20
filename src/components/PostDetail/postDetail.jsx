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
import { openReportModal } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import { getNewsDetail } from "../../apis/domains/news/news.js"; // 추가된 부분
import { getBoardDetail } from "../../apis/domains/community/community.js";
import parse from 'html-react-parser';

const PostDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [likedComments, setLikedComments] = useState({});
  const [likedReplies, setLikedReplies] = useState({}); // 별도의 답글 좋아요 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [openReplyIds, setOpenReplyIds] = useState({}); // 답글 입력창이 열린 댓글 ID 관리
  const [showReplies, setShowReplies] = useState({}); // 답글 표시/숨김 상태 관리
  const [openReReplyIds, setOpenReReplyIds] = useState({});
  
  // API 연동을 위한 상태 추가
  const [apiPost, setApiPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const menuRef = useRef(null);
  const dispatch = useDispatch();
  
  // 추가된 부분: URL 파라미터와 현재 경로 가져오기
  const { newsPk, boardPk } = useParams();
  const location = useLocation();

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.more-button')) {
      setIsMenuOpen(false);
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

// API
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
        // API 응답 구조 확인
        console.log("API 응답 구조:", typeof response, Object.keys(response));
        
        if (response.data) {
          setApiPost(response.data);
          setIsLiked(response.data.isKicked || false);
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
}, [newsPk, boardPk, location.pathname]);


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

  // 답글 좋아요 토글 함수
  const toggleReplyLike = (replyId) => {
    setLikedReplies((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  const toggleReReplyBox = (replyId) => {
    setOpenReReplyIds((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  // API 데이터와 기존 하드코딩된 데이터 병합
  const post = apiPost || {
    title:
      '[충격] 쿠르투아는 시메오네를 향해 쏘아붙인다: "저는 그런 피해자 의식에 지쳤어요. 늘 울기만 하거든요."',
    user: {
      nickname: "하늘천사랑",
      profileImageUrl: ProfileIcon,
    },
    team: {
      pk: 1,
      nameKr: "전남드래곤즈",
      nameEn: "Jeonnam Dragons",
      logoUrl: "https://media.api-sports.io/football/teams/40.png",
    },
    badge: "부상",
    createdAt: "2025-04-03T15:11:07.010Z",
    views: 120,
    likes: 45,
    replies: 3,
    image:
      "https://premierskillsenglish.britishcouncil.org/sites/default/files/styles/main_large/public/learning/1850/image/gerrardcelebrates.jpg?itok=LQ1fKFIj",
    content:
      '벨기에 선수가 혼합 구역에서 콜로 선수의 페널티 거부에 대한 항의에 응답하고 있다.\n\n티보 쿠르투아는 기자 회견에서 시메오네 가 화를 내자 혼합 구역에서 반응하며, 승부차기에서 훌리안 알바레즈 가 페널티킥을 두 번 터치하는 것을 기자가 봤는지 큰 소리로 물었다 . 벨기에인은 시메오네에 대해 엄하게 말했다. "저는 그런 피해자 의식에 질렸어요. 항상 이런 일에 대해 울부짖어요. 심판은 스페인이나 유럽에서도 팀에 이로운 일을 하고 싶어하지 않아요. 그들은 그것을 분명히 보고 그렇게 말했어요. 그들은 인간이고, 기술을 통해 그것을 분명히 봤어요. 첫 번째 분에 1-0으로 이기고 두 번째 분에 가지 않는다면, 그것은 그들의 경기의 잘못이에요."앞서 Movistar 에서 그는 경기를 분석했습니다. "결국 복권이었습니다. 더블인 것 같아서 심판에게 말했습니다. 보기 쉽지 않고 그들에게는 불운입니다. 그리고 코레아가 골을 넣지 못한 것은 저에게 불운이었습니다. 우리는 최고의 경기를 하지 못했지만, 통과했고, 그것이 중요합니다."\n\n그리고 그는 총격전을 어떻게 공부했는지 분석했습니다. "우리는 이번 주에 무엇을 했는지에 대해 이야기했고, 그 다음에는 스트라이커에 따라 다릅니다... 소를로트는 슛을 할 때 항상 바뀌었습니다. 저는 그가 바뀔 것이라고 생각했습니다. 훌리안의 경우, 저는 의심했습니다. 그가 중앙에서 슛을 할 것이라고 생각하지 않았습니다. 우리는 요렌테에 대한 정보가 없었지만, 훈련에서 그는 오른쪽으로 슛하는 것을 좋아했고, 그는 멀리 떨어진 슛을 쳤습니다."',
  };

  // 로딩 중일 때 표시
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const comments = Array(15)
    .fill()
    .map((_, index) => ({
      id: index,
      user: {
        nickname: "닉네임",
        profileImageUrl: ProfileIcon,
      },
      createdAt: "2025-01-20T10:42:00.000Z",
      content:
        index % 5 === 2
          ? "잘보고 가요! 손흥민 선수 응원합니다!"
          : "서울은 전북 노인네들만 영입하냐",
      likes: index % 2 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
      isLiked: false,
      replies: [
        {
          pk: `reply-${index}-1`,
          id: `reply-${index}-1`,
          contents: "1번에 진짜 진짜로 대댓글 달거에요!",
          user: {
            nickname: "민서짱9",
            profileImageUrl:
              "http://k.kakaocdn.net/dn/SqOdc/btsJfbXF7qx/YjK50HoO6xXX2f6lP6z1mk/img_640x640.jpg",
          },
          createdAt: "2025-03-18T22:20:40",
          kickCount: 1,
          replies: null,
          kicked: false,
        },
        {
          pk: `reply-${index}-2`,
          id: `reply-${index}-2`,
          contents: "1번에 진짜 진짜로 대댓글 달거에요!",
          user: {
            nickname: "민서짱9",
            profileImageUrl:
              "http://k.kakaocdn.net/dn/SqOdc/btsJfbXF7qx/YjK50HoO6xXX2f6lP6z1mk/img_640x640.jpg",
          },
          createdAt: "2025-03-18T22:20:40",
          kickCount: 1,
          replies: null,
          kicked: false,
        },
      ],
    }));

  return (
    <S.ArticleContainer>
      {location.pathname.includes('/news/') && (
        <S.ArticleImage src={post.thumbnailUrl || post.image} alt="뉴스 이미지" />
      )}
      {post.hasImage && (
        <S.ArticleImage src={post.imageUrl} alt="게시글 이미지" />
      )}
      {location.pathname.includes('/news/') && (
        <S.ArticleLabel>
          <S.ArticleTeam src={post.team?.logoUrl} alt={post.team?.nameKr} />
          <S.ArticleCategory>
            {post.category || post.badge}
          </S.ArticleCategory>
        </S.ArticleLabel>
      )}
      <S.ArticleHeader>
        <S.ArticleTitle>{post.title}</S.ArticleTitle>
        <S.ArticleInfo>
          <img
            src={post.user.profileImageUrl || ProfileIcon}
            alt="프로필 아이콘"
            width={24}
            height={24}
            style={{ borderRadius: '50%' }}
          />
          {post.user?.nickname}
          <FaCheckCircle />
          <S.TimeLabel>
            {new Date(post.createdAt).toLocaleString()}
          </S.TimeLabel>{" "}
          | <S.ViewLabel>읽음 {post.views}</S.ViewLabel>
          <S.ArticleMeta>
            <img src={KickIcon} alt="좋아요수 아이콘" width={10} height={10} />{" "}
            {post.likes}
            <FaRegComment alt="댓글수 아이콘" /> {post.replies}
            <FiMoreHorizontal
                className="more-button"
                alt="더보기 버튼"
                onClick={toggleMenu}
                style={{ cursor: "pointer" }}
            />
          {isMenuOpen && (
            <S.MoreMenu ref={menuRef}>
              <S.MenuItem>
                <MdIosShare size={16} />
                공유하기
              </S.MenuItem>
              <S.MenuItem onClick={() => dispatch(openReportModal())}>
              <img src={SirenIcon} alt="신고 아이콘" width={16} height={16} />
                신고하기
              </S.MenuItem>
            </S.MoreMenu>
          )}
        </S.ArticleMeta>
        </S.ArticleInfo>
      </S.ArticleHeader>
      
      <S.ArticleContent>
        {location.pathname.includes('/community/') && post.hasImage && 
        <S.ArticleImage src={post.image} />
        }
        <S.ArticleText>{parse(post.content)}</S.ArticleText>
      </S.ArticleContent>

      
      <S.ArticleActions>
        <S.LikeButton isLiked={isLiked} onClick={() => setIsLiked(!isLiked)}>
          <img src={isLiked ? RKickIcon : BKickIcon} alt="킥 아이콘" width={14} height={14} />
          <span>킥</span>
          <span className="likes">{post.likes}</span>
        </S.LikeButton>
      </S.ArticleActions>
      
      <S.CommentInputBox>
        <S.CommentInputLabel>댓글 쓰기</S.CommentInputLabel>
        <S.CommentInputContainer>
          <S.CommentInput placeholder="댓글을 입력하세요..." />
          <S.SubmitButton>등록</S.SubmitButton>
        </S.CommentInputContainer>
      </S.CommentInputBox>

      <S.CommentsSection>
        <S.CommentsSectionTitle>댓글 {post.replies}개</S.CommentsSectionTitle>
        {comments &&
          comments.map((comment) => (
            <S.CommentItem key={comment.id}>
              <S.CommentHeaderWrapper>
                <S.CommentHeader>
                  <img
                    src={comment.user.profileImageUrl || ProfileIcon}
                    alt="프로필 아이콘"
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
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
                  <span style={{ fontSize: "0.7rem", color: "#888" }}>
                    {dayjs(comment.createdAt).format('YYYY.MM.DD HH:mm')}
                  </span>
                </S.CommentHeader>
                <S.CommentLikes
                  key={comment.id}
                  active={likedComments[comment.id] || false}
                  onClick={() =>
                    setLikedComments((prev) => ({
                      ...prev,
                      [comment.id]: !prev[comment.id],
                    }))
                  }
                >
                  <img
                    src={likedComments[comment.id] ? RKickIcon : KickIcon}
                    alt="좋아요 아이콘"
                    width={12}
                    height={12}
                  />
                  {comment.likes}
                </S.CommentLikes>
              </S.CommentHeaderWrapper>
              <S.CommentContent>{comment.content}</S.CommentContent>
              <S.CommentActions>
                {location.pathname.includes('/community/') && (
                  <S.ReplyButton
                    isActive={openReplyIds[comment.id]}
                    onClick={() => toggleReplyBox(comment.id)}
                  >
                    답글
                  </S.ReplyButton>
                )}
                {/* 답글 입력 박스 - 답글 버튼 클릭시 표시 */}
                {openReplyIds[comment.id] && (
                  <S.ReplyInputWrapper>
                    <S.ReplyInput placeholder="답글을 입력하세요..." />
                    <S.ReplySubmitButton>등록</S.ReplySubmitButton>
                  </S.ReplyInputWrapper>
                )}
                {(comment.replies?.length ?? 0) > 0 && (
                  <S.MoreButton onClick={() => toggleReplies(comment.id)}>
                    {showReplies[comment.id] ? (
                      <>
                        <MdExpandLess size={16} /> 답글 숨기기
                      </>
                    ) : (
                      <>
                        <MdExpandMore size={16} /> 답글 {comment.replies.length}
                        개
                      </>
                    )}
                  </S.MoreButton>
                )}
              </S.CommentActions>

              {/* 답글 표시 - 토글 상태에 따라 표시 */}
              {comment.replies &&
                comment.replies.length > 0 &&
                showReplies[comment.id] && (
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
                              style={{ fontSize: "0.65rem", color: "#888" }}
                            >
                              {dayjs(reply.createdAt).format('YYYY.MM.DD HH:mm')}
                            </span>
                          </S.ReplyHeader>
                          <S.ReplyLikes
                            key={reply.pk}
                            active={likedReplies[reply.pk] || false}
                            onClick={() => toggleReplyLike(reply.pk)}
                          >
                            <img
                              src={
                                likedReplies[reply.pk] ? RKickIcon : KickIcon
                              }
                              alt="좋아요 아이콘"
                              width={12}
                              height={12}
                            />
                            {reply.kickCount}
                          </S.ReplyLikes>
                        </S.ReplyHeaderWrapper>
                        <S.ReplyContent>{reply.contents}</S.ReplyContent>

                        {/* New ReplyActions component */}
                        <S.ReplyActions>
                          {location.pathname.includes('/community/') && (
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
                              <S.ReplyInput placeholder="답글을 입력하세요..." />
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

      <Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        totalPages={10}
      />
    </S.ArticleContainer>
  );
};

export default PostDetail;
