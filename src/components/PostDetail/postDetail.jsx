import React, {useEffect, useRef, useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import * as S from "./postDetail.style.js";
import RKickIcon from "../../assets/good_red.svg";
import BKickIcon from "../../assets/good_black.svg";
import KickIcon from "../../assets/good.svg";
import ProfileIcon from "../../assets/profile.svg";
import { FaRegComment, FaCheckCircle } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdIosShare } from "react-icons/md";
import { LuSiren } from "react-icons/lu";
import { openReportModal } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import { getNewsDetail } from "../../apis/domains/news/news.js";
import { getBoardDetail } from "../../apis/domains/community/community.js";
import { getProfilecard } from "../../apis/domains/common/getProfilecard.js";
import parse, { domToReact } from 'html-react-parser';
import axiosInstance from "../../apis/axios-instance.js";
import { youtubeUrlToIframe } from "../../utils/youtubeUtils.js";
import NoData from "../../components/NoData/noData.jsx";
import Comment from "../../components/Comment/comment.jsx";
import LoadingSpinner from "../LoadingSpinner/loadingSpinner.jsx";
import { useAuthGuard } from "../../hooks/useAuthGuard.js";
import { parseMarkdownToHtml } from '../../utils/markdownParser';

const PostDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // API 연동을 위한 상태 추가
  const [apiPost, setApiPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 사용자 프로필 정보 상태 추가
  const [userProfile, setUserProfile] = useState(null);
  const [canComment, setCanComment] = useState(false);

  const menuRef = useRef(null);
  const dispatch = useDispatch();

  // 추가된 부분: URL 파라미터와 현재 경로 가져오기
  const { newsPk, boardPk } = useParams();
  const location = useLocation();

  const requireAuth = useAuthGuard();

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

        if (location.pathname.includes('/news/') && newsPk) {
          response = await getNewsDetail(newsPk);
        } else if (location.pathname.includes('/community/') && boardPk) {
          response = await getBoardDetail(boardPk);
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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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

  const handleKick = async () => {
    if (!requireAuth()) return; // 로그인 안 돼 있으면 모달 띄우고 중단

    try {
      await toggleKick({ isLiked: !isLiked, newsPk, boardPk });

      setIsLiked(!isLiked); // 상태 토글
      setApiPost((prev) => ({
        ...prev,
        likes: isLiked ? prev.likes - 1 : prev.likes + 1,
      }));
    } catch (error) {
      console.error("Failed to toggle 킥:", error);
    }
  };

  // 로딩 중일 때 표시
  if (loading) return <LoadingSpinner />;

  if (error || !apiPost) {
    return (
        <S.ArticleContainer>
          <NoData onRetry={() => window.location.reload()} />
          </S.ArticleContainer>
    );
  }

  return (
      <S.ArticleContainer>
        {location.pathname.includes('/news/') && apiPost.thumbnailUrl && (
            <S.ArticleImage src={apiPost.thumbnailUrl} alt="뉴스 이미지"/>
        )}
        {location.pathname.includes('/community/') && apiPost.hasImage && (
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
            {location.pathname.includes('/community/')
                ? apiPost.nicknameSnapshot
                : apiPost.user?.nickname}
            <FaCheckCircle/>
            <S.TimeLabel>
              {new Date(new Date(apiPost.createdAt).getTime() + 9 * 60 * 60 * 1000).toLocaleString()}
            </S.TimeLabel>{" "}
            | <S.ViewLabel>읽음 {apiPost.views}</S.ViewLabel>
            <S.ArticleMeta>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>
                <img src={KickIcon} alt="좋아요수 아이콘" width={10} height={10}/> {apiPost.likes}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>
                <FaRegComment alt="댓글수 아이콘"/> {apiPost.replies}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>
                <FiMoreHorizontal
                  className="more-button"
                  alt="더보기 버튼"
                  onClick={toggleMenu}
                  style={{ cursor: "pointer" }}
                />
              </span>
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
          <S.ArticleText as="div">
            {parse(apiPost.content, {
              replace: (domNode) => {
                if (
                    domNode.name === 'a' &&
                    domNode.attribs?.href?.includes('youtube.com')
                ) {
                  const youtubeUrl = domNode.attribs.href;
                  const videoId = youtubeUrl.split('v=')[1]?.split('&')[0]; // v= 뒤의 ID 추출
                  if (videoId) {
                    return (
                        <S.YoutubeResponsive>
                          <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              frameBorder="0"
                              allowFullScreen
                              width="100%"
                              height="315"
                              title="YouTube video"
                          />
                        </S.YoutubeResponsive>
                    );
                  }
                }

                if (
                    domNode.name === 'iframe' &&
                    domNode.attribs?.src?.includes('youtube.com')
                ) {
                  return (
                      <S.YoutubeResponsive>
                        {domToReact([domNode])}
                      </S.YoutubeResponsive>
                  );
                }
              }
            })}
          </S.ArticleText>
        </S.ArticleContent>


        <S.ArticleActions>
          <S.LikeButton isLiked={isLiked} onClick={handleKick}>
            <img src={isLiked ? RKickIcon : BKickIcon} alt="킥 아이콘" width={14} height={14} />
            <span>킥</span>
            <span className="likes">{apiPost.likes}</span>
          </S.LikeButton>
        </S.ArticleActions>

        <Comment
            postType={location.pathname.includes('/news/') ? 'news' : 'board'}
            postPk={location.pathname.includes('/news/') ? newsPk : boardPk}
            canComment={canComment}
        />


      </S.ArticleContainer>
  );
};

export default PostDetail;