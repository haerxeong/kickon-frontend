import React from "react";
import {ContainerTitle, TopNewsContainer, TNews, NewsImage, NewsTitle} from "./topNews.style.js";
import newsImage from "../../assets/news_image.png";

const TopNews = () => {
    return (
        <div>
            <TopNewsContainer>탑뉴스들
                <ContainerTitle>많이 본 뉴스 TOP5</ContainerTitle>
                <TNews>
                    <NewsImage src={newsImage} alt="News Image" />
                    <NewsTitle>[K리그 1] 새 시즌 판도에 영향을 미칠 새로운 팀을 찾아 떠나는 경험 많은 선수들</NewsTitle>
                </TNews>
                <TNews>
                    <NewsImage src={newsImage} alt="News Image" />
                    <NewsTitle>[K리그 1] 새 시즌 판도에 영향을 미칠 새로운 팀을 찾아 떠나는 경험 많은 선수들</NewsTitle>
                </TNews>
                <TNews>
                    <NewsImage src={newsImage} alt="News Image" />
                    <NewsTitle>[K리그 1] 새 시즌 판도에 영향을 미칠 새로운 팀을 찾아 떠나는 경험 많은 선수들</NewsTitle>
                </TNews>
                <TNews>
                    <NewsImage src={newsImage} alt="News Image" />
                    <NewsTitle>[K리그 1] 새 시즌 판도에 영향을 미칠 새로운 팀을 찾아 떠나는 경험 많은 선수들</NewsTitle>
                </TNews>
                <TNews>
                    <NewsImage src={newsImage} alt="News Image" />
                    <NewsTitle>[K리그 1] 새 시즌 판도에 영향을 미칠 새로운 팀을 찾아 떠나는 경험 많은 선수들</NewsTitle>
                </TNews>
            </TopNewsContainer>
        </div>
    );
};

export default TopNews;