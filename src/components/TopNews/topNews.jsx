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

    // 데이터가 없거나 빈 배열인 경우 처리
    if (!newsItems || newsItems.length === 0) {
        return (
            <TopNewsContainer>
                <ContainerTitle>많이 본 뉴스 TOP 5</ContainerTitle>
                <div style={{ padding: '1rem', textAlign: 'center' }}>뉴스가 없습니다.</div>
            </TopNewsContainer>
        );
    }

    return (
        <div>
            <TopNewsContainer>
                <ContainerTitle>많이 본 뉴스 TOP 5</ContainerTitle>
                {newsItems.slice(0, 5).map((news, index) => (
                    <TNews key={news.pk || index}>
                        <NewsImage
                            src={news.thumbnailUrl || "https://via.placeholder.com/64"}
                            alt={news.title || "뉴스 이미지"}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/64";
                            }}
                        />
                        <NewsTitle>
                            {news.title || "[K리그 1] 새 시즌 판도에 영향을 미칠 새로운 팀을 찾아 떠나는 경험 많은 선수들"}
                        </NewsTitle>
                    </TNews>
                ))}
            </TopNewsContainer>
        </div>
    );
};

export default TopNews;