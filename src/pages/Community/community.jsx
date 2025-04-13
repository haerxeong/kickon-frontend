import React, { useState, useEffect } from 'react';
import {
    NewsContainer, Tab, TabContainer, TableHeader, PostAuthor, PostDate,
    PostItem, PostLikes, PostsWrapper, PostTitle, PostViews
} from "./community.style.js";
import GoodIcon from "../../assets/good_black.svg";
import ProfileIcon from "../../assets/profile.svg";
import * as S from "../../components/Pagination/pagination.style.js";
import { getBoardList } from "../../apis/domains/community/getBoardList";
import { useLeagueTeamStore } from '../../store/useLeagueTeamStore';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("전체");
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const { selectedTeam } = useLeagueTeamStore();

    const tabs = ["전체", "인기", selectedTeam?.nameKr || "응원팀"];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const params = {
                    size: 20,
                    page: activePage,
                    order: activeTab === "인기" ? "hot" : "recent",
                    team: activeTab === selectedTeam?.nameKr ? selectedTeam.pk : undefined,
                };

                const response = await getBoardList(params);
                console.log("냠냠 커뮤니티페이지:", response);

                if (response.data) {
                    setPosts(response.data);
                    setTotalPages(response.meta.totalPages || 1);
                } else {
                    setPosts([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error("게시글을 불러오는 데 실패했습니다:", error);
            }
        };

        fetchPosts();
    }, [activeTab, activePage, selectedTeam]);

    return (
        <NewsContainer>
            <TabContainer>
                {tabs.map((tab) => (
                    <Tab
                        key={tab}
                        active={activeTab === tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setActivePage(1); // Reset page on tab change
                        }}
                    >
                        {tab}
                    </Tab>
                ))}
            </TabContainer>

            <TableHeader>
                <div className="title">제목</div>
                <div className="author">글쓴이</div>
                <div className="date">날짜</div>
                <div className="views">조회</div>
                <div className="likes">
                    <img src={GoodIcon} alt="좋아요" style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.25rem' }} />
                    킥
                </div>
            </TableHeader>

            <PostsWrapper>
                {posts.map((post) => (
                    <PostItem key={post.pk} onClick={() => navigate(`/community/${post.pk}`)}>
                        <PostTitle>
                            {post.title}
                            {post.replies > 0 && <span className="reply-count">({post.replies})</span>}
                        </PostTitle>
                        <PostAuthor>
                            <img src={post.user.profileImageUrl || ProfileIcon} alt="프로필 아이콘" />
                            {post.user.nickname}
                        </PostAuthor>
                        <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
                        <PostViews>{post.views}</PostViews>
                        <PostLikes>{post.likes}</PostLikes>
                    </PostItem>
                ))}
            </PostsWrapper>

            <S.PaginationWrapper>
                <S.NavButton onClick={() => activePage > 1 && setActivePage(prev => prev - 1)}
                             disabled={activePage === 1}>
                    <GrFormPrevious /> 이전
                </S.NavButton>
                {Array.from({ length: totalPages }, (_, i) => (
                    <S.PageButton
                        key={i + 1}
                        active={activePage === i + 1}
                        onClick={() => setActivePage(i + 1)}
                    >
                        {i + 1}
                    </S.PageButton>
                ))}
                <S.NavButton onClick={() => activePage < totalPages && setActivePage(prev => prev + 1)}
                             disabled={activePage === totalPages}>
                    다음 <GrFormNext />
                </S.NavButton>
            </S.PaginationWrapper>
        </NewsContainer>
    );
};

export default Community;