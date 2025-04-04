import React, {useRef, useState} from 'react';
import {
    ArticleContainer, ArticleHeader, ArticleTitle, ArticleInfo,
    ArticleMeta, ArticleContent, ArticleImage, ArticleText,
    ArticleActions, LikeButton, TimeLabel, ViewLabel,
    CommentInputBox, CommentInputLabel, CommentInput, SubmitButton,
    CommentsSection, CommentItem, CommentHeader, CommentContent,
    CommentActions, CommentLikes, ReplyButton, CommentInputContainer,
    CommentsSectionTitle, CommentHeaderWrapper, MoreButton, ArticleLabel,
    ArticleCategory, ArticleTeam
} from './postDetail.style.js';
import RKickIcon from "../../assets/good_red.svg"
import BKickIcon from "../../assets/good_black.svg"
import KickIcon from "../../assets/good.svg"
import ProfileIcon from "../../assets/profile.svg"
import { FaRegComment, FaCheckCircle } from "react-icons/fa";
// import { FiMoreHorizontal } from "react-icons/fi";
// import { MdExpandMore } from "react-icons/md";
import Pagination from "../Pagination/pagination"
import NewsImage from "../../assets/thumbnail.png"
import {MdExpandMore} from "react-icons/md";


const PostDetail = () => {
    // const [commentText, setCommentText] = useState('');
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [likedComments, setLikedComments] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    // const menuRef = useRef(null);

    // const handleClickOutside = (e) => {
    //     if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.more-button')) {
    //         setIsMenuOpen(false);
    //     }
    // };

    // useEffect(() => {
    //     // 클릭했을 때 메뉴를 닫도록 이벤트 리스너 추가
    //     document.addEventListener('click', handleClickOutside);
    //
    //     // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);


    const post = {
        title: "[충격] 쿠르투아는 시메오네를 향해 쏘아붙인다: \"저는 그런 피해자 의식에 지쳤어요. 늘 울기만 하거든요.\"",
        user: {
            nickname: "하늘천사랑",
            profileImageUrl: ProfileIcon
        },
        team: {
            "pk": 1,
            "nameKr": "전남드래곤즈",
            "nameEn": "Jeonnam Dragons",
            "logoUrl": "https://media.api-sports.io/football/teams/40.png"
        },
        badge: "부상",
        createdAt: "2025-04-03T15:11:07.010Z",
        views: 120,
        likes: 45,
        replies: 3,
        image: "https://premierskillsenglish.britishcouncil.org/sites/default/files/styles/main_large/public/learning/1850/image/gerrardcelebrates.jpg?itok=LQ1fKFIj",
        content: "벨기에 선수가 혼합 구역에서 콜로 선수의 페널티 거부에 대한 항의에 응답하고 있다.\n\n티보 쿠르투아는 기자 회견에서 시메오네 가 화를 내자 혼합 구역에서 반응하며, 승부차기에서 훌리안 알바레즈 가 페널티킥을 두 번 터치하는 것을 기자가 봤는지 큰 소리로 물었다 . 벨기에인은 시메오네에 대해 엄하게 말했다. \"저는 그런 피해자 의식에 질렸어요. 항상 이런 일에 대해 울부짖어요. 심판은 스페인이나 유럽에서도 팀에 이로운 일을 하고 싶어하지 않아요. 그들은 그것을 분명히 보고 그렇게 말했어요. 그들은 인간이고, 기술을 통해 그것을 분명히 봤어요. 첫 번째 분에 1-0으로 이기고 두 번째 분에 가지 않는다면, 그것은 그들의 경기의 잘못이에요.\"앞서 Movistar 에서 그는 경기를 분석했습니다. \"결국 복권이었습니다. 더블인 것 같아서 심판에게 말했습니다. 보기 쉽지 않고 그들에게는 불운입니다. 그리고 코레아가 골을 넣지 못한 것은 저에게 불운이었습니다. 우리는 최고의 경기를 하지 못했지만, 통과했고, 그것이 중요합니다.\"\n\n그리고 그는 총격전을 어떻게 공부했는지 분석했습니다. \"우리는 이번 주에 무엇을 했는지에 대해 이야기했고, 그 다음에는 스트라이커에 따라 다릅니다... 소를로트는 슛을 할 때 항상 바뀌었습니다. 저는 그가 바뀔 것이라고 생각했습니다. 훌리안의 경우, 저는 의심했습니다. 그가 중앙에서 슛을 할 것이라고 생각하지 않았습니다. 우리는 요렌테에 대한 정보가 없었지만, 훈련에서 그는 오른쪽으로 슛하는 것을 좋아했고, 그는 멀리 떨어진 슛을 쳤습니다.\"",
        comments: Array(15).fill().map((_, index) => ({
            id: index,
            user: {
                nickname: '닉네임',
                profileImageUrl: ProfileIcon
            },
            createdAt: '2025-01-20T10:42:00.000Z',
            content: index % 5 === 2 ? '잘보고 가요! 손흥민 선수 응원합니다!' : '서울은 전북 노인네들만 영입하냐',
            likes: index % 2 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
            isLiked: false
        }))
    };


    return (
        <ArticleContainer>
            {location.pathname === "/news/detail" && <ArticleImage src={post.image} />}
            {location.pathname === "/news/detail" &&
                <ArticleLabel>
                    <ArticleTeam src={post.team.logoUrl}/>
                    <ArticleCategory>{post.badge}</ArticleCategory>
                </ArticleLabel>}
            <ArticleHeader>
                <ArticleTitle>{post.title}</ArticleTitle>
                <ArticleInfo>
                    <img src={post.user.profileImageUrl || ProfileIcon} alt="프로필 아이콘" width={24} height={24} />
                    {post.user.nickname}
                    <FaCheckCircle />
                    <TimeLabel>{new Date(post.createdAt).toLocaleString()}</TimeLabel> | <ViewLabel>읽음 {post.views}</ViewLabel>
                    <ArticleMeta>
                        <img src={KickIcon} alt="좋아요수 아이콘" width={10} height={10} /> {post.likes}
                        <FaRegComment alt="댓글수 아이콘" /> {post.replies}
                    </ArticleMeta>
                </ArticleInfo>
            </ArticleHeader>

            <ArticleContent>
                {location.pathname !== "/news/detail" && <ArticleImage src={post.image} />}
                <ArticleText>{post.content}</ArticleText>
            </ArticleContent>

            <ArticleActions>
                <LikeButton isLiked={isLiked} onClick={() => setIsLiked(!isLiked)}>
                    <img src={BKickIcon} alt="킥 아이콘" width={14} height={14} />
                    <span>킥</span>
                    <span className="likes">{post.likes}</span>
                </LikeButton>
            </ArticleActions>

            <CommentInputBox>
                <CommentInputLabel>댓글 쓰기</CommentInputLabel>
                <CommentInputContainer>
                    <CommentInput placeholder="댓글을 입력하세요..." />
                    <SubmitButton>등록</SubmitButton>
                </CommentInputContainer>
            </CommentInputBox>

            <CommentsSection>
                <CommentsSectionTitle>댓글 {post.replies}개</CommentsSectionTitle>
                {post.comments && post.comments.map((comment) => (
                    <CommentItem key={comment.id}>
                        <CommentHeaderWrapper>
                            <CommentHeader>
                                <img src={comment.user.profileImageUrl || ProfileIcon} alt="프로필 아이콘" width={24} height={24} />
                                <span style={{ fontSize: '0.75rem', marginRight: '0.3rem', color: '#000' }}>{comment.user.nickname}</span>
                                <span style={{ fontSize: '0.7rem', color: '#888' }}>{new Date(comment.createdAt).toLocaleString()}</span>
                            </CommentHeader>
                            <CommentLikes
                                key={comment.id}
                                active={likedComments[comment.id] || false}
                                onClick={() => setLikedComments(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                            >
                                <img src={likedComments[comment.id] ? RKickIcon : KickIcon} alt="좋아요 아이콘" width={12} height={12} />
                                {comment.likes}
                            </CommentLikes>
                        </CommentHeaderWrapper>
                        <CommentContent>{comment.content}</CommentContent>
                        <CommentActions>
                            {location.pathname === "/community/detail" && <ReplyButton>답글</ReplyButton>}
                            <MoreButton> <MdExpandMore width={20} height={20}/>  답글 2개</MoreButton>

                        </CommentActions>
                    </CommentItem>
                ))}
            </CommentsSection>

            <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={10}/>
        </ArticleContainer>
    );
};

export default PostDetail;