import React, {useEffect, useState} from "react";
import * as S from "./news.style";
import NewsItem from "./NewsItem.jsx";
import LeagueDropdown from "../../components/League/leagueDropdown.jsx";
import * as PS from "../../components/Pagination/pagination.style.js";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useLeagueTeamStore } from '../../store/useLeagueTeamStore';
import { getNewsList } from "../../apis/domains/news/getNewsList";
import NoData from "../../components/NoData/noData";

const News = () => {
    const [newsList, setNewsList] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [activeTab, setActiveTab] = useState("전체");
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { selectedTeam } = useLeagueTeamStore();
    const navigate = useNavigate();
    const leaguePk = selectedLeague?.pk || undefined;

    const tabs = [
        { type: "text", label: "전체", value: "전체" },
        { type: "text", label: "인기", value: "인기" },
        selectedTeam?.nameKr && { type: "text", label: selectedTeam.nameKr, value: selectedTeam.nameKr },
    ].filter(Boolean);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setActivePage(1); // Reset to the first page when switching tabs
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const isTeamTab = selectedTeam?.nameKr && activeTab === selectedTeam.nameKr;
                const isPopularTab = activeTab === "인기";
                const isAllTab = activeTab === "전체";

                const hasTeam = selectedTeam?.pk !== null;
                const hasLeagueFromTeam = selectedTeam?.leaguePk !== null;
                console.log("selectedTeam", selectedTeam);

                const params = {
                    size: 10,
                    page: activePage,
                    order: isPopularTab ? "hot" : "recent",
                    ...(isTeamTab && hasTeam && hasLeagueFromTeam
                            ? { team: selectedTeam.pk, league: selectedTeam.leaguePk }
                            : !isAllTab && !isPopularTab && selectedLeague?.pk
                                ? { league: selectedLeague.pk }
                                : {}
                    ),
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
                    {tabs.map((tab, index) => (
                        <S.TabButton
                            key={tab.value}
                            isActive={activeTab === tab.value}
                            onClick={() => handleTabClick(tab.value)}
                        >
                            {tab.label}
                        </S.TabButton>
                    ))}

                    <LeagueDropdown
                        selectedLeague={selectedLeague}
                        setSelectedLeague={(league) => {
                            setSelectedLeague(league);
                            setActiveTab(league.nameKr);
                            setActivePage(1);
                        }}
                        activeTab={activeTab}
                    />
                </S.NavContainer>

                <S.Divider>
                    {tabs.map((tab, idx) =>
                            tab.value === activeTab && (
                                <S.ActiveIndicator key={tab.value} left={`calc(${idx} * 3rem + 0.7rem)`} />
                            )
                    )}
                    {selectedLeague?.nameKr === activeTab && (
                        <S.ActiveIndicator left={`calc(${tabs.length} * 3rem + 1rem)`} />
                    )}
                </S.Divider>

                <S.NewsList>
                    {newsList.length === 0 ? (
                        <NoData onRetry={() => window.location.reload()} />
                    ) : (
                        newsList.map((item) => (
                            <NewsItem key={item.pk} {...item} onClick={() => {
                                console.log(`Navigating to /news/${item.pk}`);
                                navigate(`/news/${item.pk}`);
                            }} />
                        ))
                    )}
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