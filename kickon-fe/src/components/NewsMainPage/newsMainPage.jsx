import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import * as S from "./newsMainPage.style";
import { League } from "../../mocks/league.js";
import Pagination from "../Pagination/pagination.jsx";
import {newsList} from "../../mocks/newsList.js";
import NewsItem from "../NewsList/NewsItem.jsx";

const NewsMainPage = () => {
    const [activeTab, setActiveTab] = useState("전체");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activePage, setActivePage] = useState(1);

    const tabs = ["전체", "인기", "FC서울"];
    const leagues = League;

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const totalPages = 10;

    return (
        <S.Container>
            <S.NewsContainer>
                <S.NavContainer>
                    {tabs.map(tab => (
                        <S.TabButton
                            key={tab}
                            isActive={activeTab === tab}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </S.TabButton>
                    ))}

                    <S.DropdownContainer>
                        <S.TabSelector onClick={toggleDropdown} selected={isDropdownOpen}>
                            <span>리그 선택</span>
                            <IoIosArrowDown size="0.7rem" color="#8F8F8F" />
                        </S.TabSelector>

                        {isDropdownOpen && (
                            <S.DropdownMenu>
                                {leagues.map(league => (
                                    <S.TabOption key={league.pk}>
                                        <S.LeagueImage src={league.logoUrl} alt={league.krName} />
                                        <S.LeagueName>{league.krName}</S.LeagueName>
                                    </S.TabOption>
                                ))}
                            </S.DropdownMenu>
                        )}
                    </S.DropdownContainer>
                </S.NavContainer>

                <S.Divider>
                    {tabs.indexOf(activeTab) >= 0 && (
                        <S.ActiveIndicator left={`${tabs.indexOf(activeTab) * 3 + 0.7}rem`} />
                    )}
                </S.Divider>

                <S.NewsList>
                    {newsList.map((item, index) => (
                        <NewsItem key={index} {...item} />
                    ))}
                </S.NewsList>

                <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} />
            </S.NewsContainer>
        </S.Container>
    );
};

export default NewsMainPage;