import React, {useEffect, useState} from "react";
import * as S from "./topNews.style.js";
import {getTopNews} from "../../apis/domains/news/getTopNews.js";
import defaultImage from "../../assets/xCard.svg"

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
            <S.TopNewsContainer>
                <S.ContainerTitle>많이 본 뉴스 TOP 5</S.ContainerTitle>
                <div style={{ padding: '1rem', textAlign: 'center' }}>뉴스가 없습니다.</div>
            </S.TopNewsContainer>
        );
    }

    return (
        <div>
            <S.TopNewsContainer>
                <S.ContainerTitle>많이 본 뉴스 TOP 5</S.ContainerTitle>
                {newsItems.slice(0, 5).map((news, index) => (
                    <S.TNews key={news.pk || index}>
                        <S.NewsImageWrapper>
                            <S.NewsImage
                                src={news.thumbnailUrl || defaultImage}
                                alt="썸네일"
                                onError={(e) => (e.target.src = defaultImage)}
                            />
                        </S.NewsImageWrapper>
                        <S.NewsTitle>{news.title}</S.NewsTitle>
                    </S.TNews>
                ))}
            </S.TopNewsContainer>
        </div>
    );
};

export default TopNews;