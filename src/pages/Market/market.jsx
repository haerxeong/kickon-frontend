import React, { useState, useEffect } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import * as M from './market.style.js';
import * as PS from "../../components/Pagination/pagination.style.js";
import { NewsContainer } from "./market.style.js";
import { useLeagueTeamStore } from "../../store/useLeagueTeamStore.js";
import { getItemList } from "../../apis/domains/market/getItemList.js";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate.js";

const Market = () => {
    const [marketplaceItems, setMarketplaceItems] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;
    const [activeTab, setActiveTab] = useState("전체");
    const navigate = useNavigate();

    const { selectedTeam } = useLeagueTeamStore();

    const tabs = ["전체", selectedTeam?.nameKr || ""].filter(Boolean);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await getItemList({ size: itemsPerPage, page: activePage });
            setMarketplaceItems(res.items || []);
            setTotalPages(res.totalPages || 1);
        };
        fetchItems();
    }, [activePage]);

    const formatPrice = (price) => `${price.toLocaleString()}원`;


    const handleMarketplaceClick = (itemId) => {
        navigate(`/market/${itemId}`);
    };
    return (
        <NewsContainer>
            <M.TabContainer>
                {tabs.map((tab) => (
                    <M.Tab
                        key={tab}
                        active={activeTab === tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setActivePage(1);
                        }}
                    >
                        {tab}
                    </M.Tab>
                ))}
            </M.TabContainer>
            <M.MarketplaceGrid>
                {marketplaceItems.map((item) => (
                    <M.MarketplaceItem key={item.pk} onClick={() => handleMarketplaceClick(item.pk)}>
                        <M.MarketplaceImage>
                            <img src={item.profileImageUrl} alt={item.productName} />
                            {item.usedProductStatus === 'SOLD' && <M.StatusBadge status="sold">판매완료</M.StatusBadge>}
                            {item.usedProductStatus === 'RESERVED' && <M.StatusBadge status="reserved">예약 중</M.StatusBadge>}
                        </M.MarketplaceImage>
                        <M.MarketplaceContent>
                            <M.MarketplaceTitle>{item.productName}</M.MarketplaceTitle>
                            <M.MarketplacePrice>{formatPrice(item.price)}</M.MarketplacePrice>
                            <M.MarketplaceInfo>
                                <M.MarketplaceAuthor>
                                    <img src={item.user?.profileImageUrl} alt="프로필" />
                                    {item.user?.nickname}
                                </M.MarketplaceAuthor>
                                <M.MarketplaceStats>
                                    <span>{formatDate(item.createdAt)}</span>
                                </M.MarketplaceStats>
                            </M.MarketplaceInfo>
                        </M.MarketplaceContent>
                    </M.MarketplaceItem>
                ))}
            </M.MarketplaceGrid>

            <PS.PaginationWrapper>
                <PS.NavButton
                    onClick={() => activePage > 1 && setActivePage(prev => prev - 1)}
                    disabled={activePage === 1}
                >
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
                <PS.NavButton
                    onClick={() => activePage < totalPages && setActivePage(prev => prev + 1)}
                    disabled={activePage === totalPages}
                >
                    다음 <GrFormNext />
                </PS.NavButton>
            </PS.PaginationWrapper>
        </NewsContainer>
    );
};

export default Market;