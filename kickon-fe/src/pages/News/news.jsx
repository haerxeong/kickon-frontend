// 뉴스 페이지 임시
import React from 'react';
import {NavButton, NewsContainer, PageButton, Pagination, Tab, TabContainer, TableHeader} from "./news.style.js";
import {
    GoodIcon,
    PostAuthor, PostDate,
    PostItem, PostLikes,
    PostsWrapper,
    PostTitle, PostViews
} from "../../components/CommunityBoard/CommunityBoard.style.js";

function AuthorIcon(props) {
    return null;
}

const News = () => {
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

    return (
        <NewsContainer>
            <TabContainer>
                <Tab active>전체</Tab>
                <Tab>인기</Tab>
                <Tab>FC서울</Tab>
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
                            <AuthorIcon>프</AuthorIcon>
                            {post.author}
                        </PostAuthor>
                        <PostDate>{post.date}</PostDate>
                        <PostViews>{post.views}</PostViews>
                        <PostLikes>{post.likes}</PostLikes>
                    </PostItem>
                ))}
            </PostsWrapper>

            <Pagination>
                <NavButton>{'<'} 이전</NavButton>
                <PageButton active>1</PageButton>
                <PageButton>2</PageButton>
                <PageButton>3</PageButton>
                <PageButton>4</PageButton>
                <PageButton>5</PageButton>
                <PageButton>6</PageButton>
                <PageButton>7</PageButton>
                <PageButton>8</PageButton>
                <PageButton>9</PageButton>
                <PageButton>10</PageButton>
                <NavButton>다음 {'>'}</NavButton>
            </Pagination>
        </NewsContainer>
    );
}

export default News;