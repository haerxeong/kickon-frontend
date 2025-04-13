import React, { useState, useEffect, useContext } from 'react';
import {
    NewsContainer, Tab, TabContainer, TableHeader, PostAuthor, PostDate,
    PostItem, PostLikes, PostsWrapper, PostTitle, PostViews
} from "./community.style.js";
import GoodIcon from "../../assets/good_black.svg";
import ProfileIcon from "../../assets/profile.svg";
import Pagination from "../../components/Pagination/pagination";
import { getBoardList } from "../../apis/domains/community/getBoardList";
import {LeagueTeamContext} from "../../context/LeagueTeamContext.jsx";

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("전체");
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { selectedTeam } = useContext(LeagueTeamContext);

    const tabs = ["전체", "인기", `${selectedTeam.nameKr}`];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const params = {
                    size: 10,
                    page: activePage,
                    order: activeTab === "인기" ? "hot" : "recent",
                    team: activeTab === `${selectedTeam.nameKr}` ? selectedTeam.pk : undefined //
                };

                const response = await getBoardList(params);
                setPosts(response.content || []);
                setTotalPages(response.totalPages || 1);
            } catch (error) {
                console.error("게시글을 불러오는 데 실패했습니다:", error);
            }
        };

        fetchPosts();
    }, [activeTab, activePage]);

    return (
        <NewsContainer>
            <TabContainer>
                {tabs.map((tab) => (
                    <Tab
                        key={tab}
                        active={activeTab === tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setActivePage(1); // ✅ 탭 전환 시 페이지 리셋
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
                {posts.map((post, index) => (
                    <PostItem key={index}>
                        <PostTitle>
                            {post.title}
                            {post.replyCount > 0 && <span className="reply-count">({post.replyCount})</span>}
                        </PostTitle>
                        <PostAuthor>
                            <img src={ProfileIcon} alt="프로필 아이콘" width={14} height={14} />
                            {post.author}
                        </PostAuthor>
                        <PostDate>{post.date}</PostDate>
                        <PostViews>{post.views}</PostViews>
                        <PostLikes>{post.likes}</PostLikes>
                    </PostItem>
                ))}
            </PostsWrapper>

            <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} />
        </NewsContainer>
    );
};

export default Community;