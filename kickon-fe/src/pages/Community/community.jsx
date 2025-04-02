// 임시 커뮤니티 페이지
import React, {useState} from 'react';
import {
    NavButton, NewsContainer, PageButton, Pagination, Tab, TabContainer, TableHeader, PostAuthor, PostDate,
    PostItem, PostLikes,
    PostsWrapper,
    PostTitle, PostViews, PaginationWrapper
} from "./community.style.js";
import GoodIcon from "../../assets/good_black.svg"
import ProfileIcon from "../../assets/profile.svg";

function AuthorIcon(props) {
    return null;
}

const Community = () => {
    const posts = [
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ (1)", author: "닉네임", date: "2025.01.20", views: "5", likes: "2" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", author: "닉네임123", date: "2025.01.20", views: "22", likes: "16" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임ㄱㄱ", date: "2025.01.20", views: "478", likes: "239" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
        { title: "(속보) 손흥민 더비 부상 ㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷ", replyCount: 20, author: "닉네임최대여덟자", date: "2025.01.20", views: "56,245", likes: "24,564" },
    ];
    const [activeTab, setActiveTab] = useState("전체");
    const [activePage, setActivePage] = useState(1);

    return (
        <NewsContainer>
            <TabContainer>
                {["전체", "인기", "FC서울"].map((tab) => (
                    <Tab
                        key={tab}
                        active={activeTab === tab}
                        onClick={() => setActiveTab(tab)} // 클릭하면 활성화 변경
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
                            {post.replyCount && <span className="reply-count">({post.replyCount})</span>}
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

            {/* ✅ Pagination을 컨테이너 내부에 위치시키기 */}
            <PaginationWrapper>
                <NavButton onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}>
                    {'<'} 이전
                </NavButton>
                {Array.from({ length: 10 }, (_, i) => (
                    <PageButton
                        key={i + 1}
                        active={activePage === i + 1}
                        onClick={() => setActivePage(i + 1)}
                    >
                        {i + 1}
                    </PageButton>
                ))}
                <NavButton onClick={() => setActivePage(prev => Math.min(prev + 1, 10))}>
                    다음 {'>'}
                </NavButton>
            </PaginationWrapper>
        </NewsContainer>
    );
}

export default Community;