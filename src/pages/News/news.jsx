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

    const tabs = ["전체", "인기", selectedTeam?.nameKr || ""].filter(Boolean);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const isTeamTab = selectedTeam?.nameKr && activeTab === selectedTeam.nameKr;
                const isPopularTab = activeTab === "인기";
                const isAllTab = activeTab === "전체";

                const hasTeam = selectedTeam?.pk !== null;
                console.log("selectedTeam", selectedTeam);

                const params = {
                    size: 10,
                    page: activePage,
                    order: isPopularTab ? "hot" : "recent",
                    ...(isTeamTab && hasTeam
                            ? { team: selectedTeam.pk }
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
                {/* New Tab Styling from Community */}
                <S.TabContainer>
                    {tabs.map((tab) => (
                        <S.Tab
                            key={tab}
                            active={activeTab === tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setActivePage(1); // Reset page on tab change
                            }}
                        >
                            {tab}
                        </S.Tab>
                    ))}
                    {/* LeagueTab으로 변경하여 위치 조정 적용 */}
                    <S.LeagueTab
                        active={selectedLeague?.nameKr === activeTab}
                        onClick={() => {
                            // We will use the dropdown's onClick behavior
                        }}
                    >
                        <LeagueDropdown
                            selectedLeague={selectedLeague}
                            setSelectedLeague={(league) => {
                                setSelectedLeague(league);
                                setActiveTab(league.nameKr);
                                setActivePage(1);
                            }}
                            activeTab={activeTab}
                        />
                    </S.LeagueTab>

                </S.TabContainer>

                <S.NewsList>
                    {newsList.length === 0 ? (
                        <S.NoDataWrapper>
                            <NoData onRetry={() => window.location.reload()} />
                        </S.NoDataWrapper>
                    ) : (
                        newsList.map((item) => (
                            <NewsItem
                                key={item.pk}
                                {...item}
                                onClick={() => {
                                    console.log(`Navigating to /news/${item.pk}`);
                                    navigate(`/news/${item.pk}`);
                                }}
                            />
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