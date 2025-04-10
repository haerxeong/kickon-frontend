import NewsDetail from "../../components/PostDetail/postDetail.jsx";
import NewsList from "../../components/NewsList/newsList.jsx";

const NewsDetailPage = () => {
    return (
        <>
            <NewsDetail type="news" />
            <NewsList/>
        </>
    )
}

export default NewsDetailPage;