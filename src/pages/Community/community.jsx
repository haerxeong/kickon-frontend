import React, { useState, useEffect } from 'react';
import * as S from "./community.style.js";
import GoodIcon from "../../assets/good_black.svg";
import ProfileIcon from "../../assets/profile.svg";
import * as PS from "../../components/Pagination/pagination.style.js";
import { getBoardList } from "../../apis/domains/community/getBoardList";
import { useLeagueTeamStore } from '../../store/useLeagueTeamStore';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import {formatDate} from "../../utils/formatDate.js";
import { increaseViewCount } from "../../utils/increaseViewCount.js";
import LoadingSpinner from "../../components/LoadingSpinner/loadingSpinner.jsx";
import EmptyState from "../../components/EmptyState/emptyState.jsx";
import WriteButton from "../../components/WriteButton/writeButton.jsx";
import {useAuthGuard} from "../../hooks/useAuthGuard.js";

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("전체");
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const requireAuth = useAuthGuard();

    const { selectedTeam } = useLeagueTeamStore();

    const tabs = ["전체", "인기", selectedTeam?.nameKr || ""];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const params = {
                    size: 20,
                    page: activePage,
                    order: activeTab === "인기" ? "hot" : "recent",
                    team: activeTab === selectedTeam?.nameKr ? selectedTeam.pk : undefined,
                };

                const response = await getBoardList(params);

                if (response.data) {
                    setPosts(response.data);
                    console.log("dfsfsdfsdfds", response.data);
                    setTotalPages(response.meta.totalPages || 1);
                } else {
                    setPosts([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error("게시글을 불러오는 데 실패했습니다:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [activeTab, activePage, selectedTeam]);

    const handlePostClick = async (postId) => {
        await increaseViewCount("board", postId);
        navigate(`/community/${postId}`);
    };

    const handleWriteClick = () => {
        if (!requireAuth()) return;

        navigate("/community/write");

    };


    if (loading) return <LoadingSpinner />;

    return (
        <>
            <S.NewsContainer>
                <S.TabContainer>
                    {tabs.map((tab) => (
                        <S.Tab
                            key={tab}
                            active={activeTab === tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setActivePage(1); // Reset page on tab change
                            }}
                        >
                            {tab}
                        </S.Tab>
                    ))}
                    <S.MobileWrite onClick={handleWriteClick}>
                        글쓰기
                    </S.MobileWrite>
                </S.TabContainer>

                <S.TableHeader>
                    <div className="title">제목</div>
                    <div className="author">글쓴이</div>
                    <div className="date">날짜</div>
                    <div className="views">조회</div>
                    <div className="likes">
                        <img src={GoodIcon} alt="좋아요" style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.25rem' }} />
                        킥
                    </div>
                </S.TableHeader>

                <S.PostsWrapper>
                    {posts.length === 0 ? (
                        activeTab === selectedTeam?.nameKr ? (
                            <EmptyState
                                message={selectedTeam?.nameKr + " 게시글이 없습니다."}
                                subMessage="글을 작성해보세요!"
                                buttonText="글 작성하기"
                                onRetry={() => navigate("/community/write")}
                            />
                        ) : (
                            <EmptyState
                                message=" 게시글이 없습니다."
                                subMessage="글을 작성해보세요!"
                                buttonText="글 작성하기"
                                onRetry={() => navigate("/community/write")}
                            />
                        )
                    ) : (
                        posts.map((post) => (
                            <S.PostItem key={post.pk} onClick={() => handlePostClick(post.pk)}>
                                <S.PostTitle>
                                    <span className="clamp">
                                        {post.title}
                                        {post.replies > 0 && <span className="reply-count">({post.replies})</span>}
                                    </span>
                                </S.PostTitle>
                                <S.PostAuthor>
                                    <img src={post.user.profileImageUrl || ProfileIcon} alt="프로필 아이콘" />
                                    {post.nicknameSnapshot || post.user?.nickname}
                                </S.PostAuthor>
                                <S.PostDate>{formatDate(post.createdAt)}</S.PostDate>
                                <S.PostViews>{post.views}</S.PostViews>
                                <S.PostLikes>{post.likes}</S.PostLikes>
                            </S.PostItem>
                        ))
                    )}
                </S.PostsWrapper>

                <PS.PaginationWrapper>
                    <PS.NavButton onClick={() => activePage > 1 && setActivePage(prev => prev - 1)}
                                  disabled={activePage === 1}>
                        <GrFormPrevious /> 이전
                    </PS.NavButton>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PS.PageButton
                            key={i + 1}
                            active={activePage === i + 1}
                            onClick={() => setActivePage(i + 1)}
                        >
                            {i + 1}
                        </PS.PageButton>
                    ))}
                    <PS.NavButton onClick={() => activePage < totalPages && setActivePage(prev => prev + 1)}
                                  disabled={activePage === totalPages}>
                        다음 <GrFormNext />
                    </PS.NavButton>
                </PS.PaginationWrapper>
            </S.NewsContainer>
        </>
    );
};

export default Community;