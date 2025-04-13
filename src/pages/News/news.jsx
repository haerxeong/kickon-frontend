import React, {useEffect, useState} from "react";
import * as S from "./news.style";
import NewsItem from "./NewsItem.jsx";
import LeagueDropdown from "../../components/League/leagueDropdown.jsx";
import * as PS from "../../components/Pagination/pagination.style.js";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useLeagueTeamStore } from '../../store/useLeagueTeamStore';
import { getNewsList } from "../../apis/domains/news/getNewsList";

const News = () => {
    const [newsList, setNewsList] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState("리그 선택");
    const [activeTab, setActiveTab] = useState("전체");
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { selectedTeam } = useLeagueTeamStore();
    const navigate = useNavigate();

    const tabs = ["전체", "인기", selectedTeam?.nameKr || "", selectedLeague];

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setActivePage(1); // Reset to the first page when switching tabs
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const params = {
                    size: 10,
                    page: activePage,
                    order: activeTab === "인기" ? "hot" : "recent",
                    team: activeTab === selectedTeam?.nameKr ? selectedTeam.pk : undefined,
                    league: selectedLeague !== "리그 선택" ? selectedLeague : undefined,
                };

                const response = await getNewsList(params);

                if (response.data) {
                    setNewsList(response.data);
                    setTotalPages(response.meta.totalPages || 1);
                } else {
                    setNewsList([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error("뉴스를 불러오는 데 실패했습니다:", error);
            }
        };

        fetchNews();
    }, [activeTab, activePage, selectedLeague, selectedTeam]);

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

                    <LeagueDropdown
                        selectedLeague={selectedLeague}
                        setSelectedLeague={setSelectedLeague}
                    />
                </S.NavContainer>

                <S.Divider>
                    {tabs.indexOf(activeTab) >= 0 && (
                        <S.ActiveIndicator left={`${tabs.indexOf(activeTab) * 3 + 0.7}rem`} />
                    )}
                </S.Divider>

                <S.NewsList>
                    {newsList.map((item) => (
                        <NewsItem key={item.pk} {...item} onClick={() => navigate(`/news/${item.pk}`)}/>
                    ))}
                </S.NewsList>

                <PS.PaginationWrapper>
                    <PS.NavButton onClick={() => activePage > 1 && setActivePage(prev => prev - 1)}
                                 disabled={activePage === 1}>
                        <GrFormPrevious /> 이전
                    </PS.NavButton>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PS.PageButton
                            key={i + 1}
                            active={activePage === i + 1}
                            onClick={() => setActivePage(i + 1)}
                        >
                            {i + 1}
                        </PS.PageButton>
                    ))}
                    <PS.NavButton onClick={() => activePage < totalPages && setActivePage(prev => prev + 1)}
                                 disabled={activePage === totalPages}>
                        다음 <GrFormNext />
                    </PS.NavButton>
                </PS.PaginationWrapper>
            </S.NewsContainer>
        </S.Container>
    );
};

export default News;