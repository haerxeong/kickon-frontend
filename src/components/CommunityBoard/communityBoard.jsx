import React from "react";
import {
  CommunityBoardContainer,
  CommunityHeader,
  TableHeaderSeparator,
  MoreLink,
  MoreIcon,
  PostsWrapper,
  PostItem,
  PostTitle,
  PostAuthor,
  PostDate,
  PostViews,
  PostLikes,
  TableHeader,
  ProfileIcon,
} from "./CommunityBoard.style";
import {Link} from "react-router-dom";
import GoodIcon from "../../assets/good.svg";

const CommunityBoard = ({ type }) => {
  const initialPosts = [
    {
      title: "(속보) 손흥민 더비 부상 ㄷㄷ",
      replyCount: 20,
      author: "닉네임확인하기",
      date: "2025.01.20",
      likes: "56,245",
      views: "24,564",
      profileImageUrl: "https://example.com/profile.jpg", // 예시 URL
    },
    {
      title: "(속보) 손흥민 더비 부상 ㄷㄷ",
      replyCount: 20,
      author: "닉네임확인하기",
      date: "2025.01.20",
      likes: "56,245",
      views: "24,564",
      profileImageUrl: "https://example.com/profile.jpg", // 예시 URL
    },
    {
      title: "(속보) 손흥민 더비 부상 ㄷㄷ",
      replyCount: 20,
      author: "닉네임확인하기",
      date: "2025.01.20",
      likes: "56,245",
      views: "24,564",
      profileImageUrl: "https://example.com/profile.jpg", // 예시 URL
    },
    {
      title: "(속보) 손흥민 더비 부상 ㄷㄷ",
      replyCount: 20,
      author: "닉네임확인하기",
      date: "2025.01.20",
      likes: "56,245",
      views: "24,564",
    },
  ];

  return (
    <CommunityBoardContainer>
      <CommunityHeader>
        <div className="title">
          {type === "communityDetail" ? "함께 볼 만한 게시글" : "클럽 커뮤니티"}
        </div>
        <MoreLink to="/community">
          더 보기
          <MoreIcon />
        </MoreLink>
      </CommunityHeader>
      <TableHeaderSeparator />
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
        {initialPosts.map((post, index) => (
          <PostItem key={index}>
            <PostTitle>
              {post.title} 
              {/*{post.profileImageUrl && <img src={ImageIcon} alt="이미지 있음" />} */}
              <span className="reply-count">({post.replyCount})</span>
            </PostTitle>
            <PostAuthor>
              <ProfileIcon />
              {post.author}
            </PostAuthor>
            <PostDate>{post.date}</PostDate>
            <PostViews>{post.views}</PostViews>
            <PostLikes>{post.likes}</PostLikes>
          </PostItem>
        ))}
      </PostsWrapper>
    </CommunityBoardContainer>
  );
};

export default CommunityBoard;
