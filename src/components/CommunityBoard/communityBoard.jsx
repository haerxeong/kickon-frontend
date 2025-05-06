import React, { useState, useEffect } from "react";
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
import {Link, useNavigate} from "react-router-dom";
import GoodIcon from "../../assets/good.svg";

const CommunityBoard = ({ type }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardHome();
        console.log('게시판 홈 API:', response);
        if (response.code === "GET_SUCCESS") {
          setPosts(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("게시글 데이터 로딩 실패:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <CommunityBoardContainer>
      <CommunityHeader>
        <div className="title">
          {type === "communityDetail" ? "함께 볼 만한 게시글" : "클럽 커뮤니티"}
        </div>
        <MoreLink as={Link} to="/community">
          더보기 <MoreIcon />
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
        {posts.map((post) => (
          <PostItem
            key={post.pk}
            onClick={() => navigate(`/community/${post.pk}`)}
          >
            <PostTitle>
              {post.title}
              {/*{post.hasImage && <img src={ImageIcon} alt="이미지" />}*/}
              {post.replies > 0 && <span className="reply-count">({post.replies})</span>}
            </PostTitle>
            <PostAuthor>
              <img
                src={post.user.profileImageUrl}
                alt="프로필"
                style={{
                  width: '0.6rem',
                  height: '0.6rem',
                  borderRadius: '50%',
                  marginRight: '0.3rem'
                }}
              />
              {post.user.nickname}
            </PostAuthor>
            <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
            <PostViews>{post.views}</PostViews>
            <PostLikes>{post.likes}</PostLikes>
          </PostItem>
        ))}
      </PostsWrapper>
    </CommunityBoardContainer>
  );
};

export default CommunityBoard;
