import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import * as S from "./newsMainPage.style";
import {League} from "../../mocks/league.js";

const NewsMainPage = () => {
    const [activeTab, setActiveTab] = useState("전체");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const tabs = ["전체", "인기", "FC서울"];

    const leagues = League

    const dummyNews = Array(10).fill().map((_, i) => ({
        id: i + 1,
        title: `뉴스 제목 ${i + 1}`,
        date: "2025.04.02"
    }));

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const totalPages = 10;
    const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

    return (
        <S.Container>
            <S.NewsContainer>
                {/* Navigation tabs */}
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
                        <S.DropdownButton onClick={toggleDropdown}>
                            <span>리그 선택</span>
                            <IoIosArrowDown size="0.7rem" color="#8F8F8F" />
                        </S.DropdownButton>

                        {isDropdownOpen && (
                            <S.DropdownMenu>
                                {leagues.map(league => (
                                    <S.DropdownItem key={league.pk}>
                                        <S.LeagueImage src={league.logoUrl} alt={league.krName} />
                                        <S.LeagueName>{league.krName}</S.LeagueName>
                                    </S.DropdownItem>
                                ))}
                            </S.DropdownMenu>
                        )}
                    </S.DropdownContainer>
                </S.NavContainer>

                {/* Divider */}
                <S.Divider>
                    {tabs.indexOf(activeTab) >= 0 && (
                        <S.ActiveIndicator style={{ left: `${tabs.indexOf(activeTab) * 28 + 14}px` }} />
                    )}
                </S.Divider>

                {/* News List */}
                <S.NewsList>
                    {dummyNews.map(news => (
                        <S.NewsItem key={news.id}>
                            <S.NewsTitle>{news.title}</S.NewsTitle>
                            <S.NewsDate>{news.date}</S.NewsDate>
                        </S.NewsItem>
                    ))}
                </S.NewsList>

                {/* Pagination */}
                <S.Pagination>
                    <S.PageNavButton
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <IoIosArrowBack size="0.35rem" />
                        <S.NavText disabled={currentPage === 1}>이전</S.NavText>
                    </S.PageNavButton>

                    <S.PageNumbers>
                        {pageNumbers.map(page => (
                            <S.PageNumberContainer key={page}>
                                <S.PageNumber
                                    isActive={currentPage === page}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </S.PageNumber>
                                {currentPage === page && <S.PageIndicator />}
                            </S.PageNumberContainer>
                        ))}
                    </S.PageNumbers>

                    <S.PageNavButton
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <S.NavText disabled={currentPage === totalPages}>다음</S.NavText>
                        <IoIosArrowForward size="0.35rem" />
                    </S.PageNavButton>
                </S.Pagination>
            </S.NewsContainer>
        </S.Container>
    );
};

export default NewsMainPage;