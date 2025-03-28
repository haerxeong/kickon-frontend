import React from "react";
import {ContainerTitle, TopNewsContainer} from "./topNews.style.js";

const TopNews = () => {
    return (
        <div>
            <TopNewsContainer>탑뉴스들
                <ContainerTitle>많이 본 뉴스 TOP5</ContainerTitle>
            </TopNewsContainer>
        </div>
    );
};

export default TopNews;