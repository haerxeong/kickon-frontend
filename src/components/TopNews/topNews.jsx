import React, {useEffect, useState} from "react";
import {ContainerTitle, TopNewsContainer, TNews, NewsImage, NewsTitle} from "./topNews.style.js";
import {getTopNews} from "../../apis/domains/news/getTopNews.js";

const TopNews = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopNews = async () => {
            try {
                setIsLoading(true);
                const data = await getTopNews();
                console.log("가져온 뉴스 데이터:", data); // 데이터 확인
                setNewsItems(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("에러 발생:", err);
                setError("뉴스를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopNews();
    }, []);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <TopNewsContainer>
                <ContainerTitle>많이 본 뉴스 TOP 5</ContainerTitle>
                {newsItems.map((news, index) => (
                    <TNews key={news.pk || index}>
                        <NewsImage src={news.thumbnailUrl} alt={news.title} />
                        <NewsTitle>
                            {news.title}
                        </NewsTitle>
                    </TNews>
                ))}
            </TopNewsContainer>
        </div>
    );
};

export default TopNews;