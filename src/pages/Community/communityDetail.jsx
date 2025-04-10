import NewsDetail from "../../components/PostDetail/postDetail.jsx";
import CommunityBoard from "../../components/CommunityBoard/communityBoard.jsx";

const CommunityDetailPage = () => {
    return (
        <>
            <NewsDetail type="community" />
            <CommunityBoard/>
        </>
    )
}

export default CommunityDetailPage;