import React, { useState, useEffect } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import * as M from './market.style.js';
import * as PS from "../../components/Pagination/pagination.style.js";
import { NewsContainer } from "./market.style.js";
import { useLeagueTeamStore } from "../../store/useLeagueTeamStore.js";
import { getItemList } from "../../apis/domains/market/getItemList.js";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate.js";
import EmptyState from "../../components/EmptyState/emptyState.jsx";

const Market = () => {
    const [marketplaceItems, setMarketplaceItems] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;
    const [activeTab, setActiveTab] = useState("전체");
    const navigate = useNavigate();
    const [myItems, setMyItems] = useState([]);

    const { selectedTeam } = useLeagueTeamStore();

    const tabs = ["전체", "판매 내역", selectedTeam?.nameKr || ""].filter(Boolean);

    useEffect(() => {
        const fetchItems = async () => {
            if (activeTab === "판매 내역") {
                const res = await getItemList({ size: 100, page: 1 });
                const mine = (res.items || []).filter(item => item.isMine);
                setMyItems(mine);
                setTotalPages(Math.max(1, Math.ceil(mine.length / itemsPerPage)));
                setMarketplaceItems(mine.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage));
            } else {
                const params = {
                    size: itemsPerPage,
                    page: activePage,
                    team: activeTab === selectedTeam?.nameKr ? selectedTeam.pk : undefined
                };
                const res = await getItemList(params);
                setMarketplaceItems(res.items || []);
                setTotalPages(res.totalPages || 1);
            }
        };
        fetchItems();
    }, [activeTab, activePage, selectedTeam]);

    useEffect(() => {
        if (activeTab === "판매 내역") {
            setMarketplaceItems(myItems.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage));
        }
    }, [activePage, myItems, activeTab]);

    const formatPrice = (price) => `${price.toLocaleString()}원`;

    const getStatusText = (status) => {
        switch(status) {
            case 'SOLD':
                return '거래완료';
            case 'RESERVED':
                return '예약중';
            default:
                return '판매중';
        }
    };

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
            {activeTab === "판매 내역" && marketplaceItems.length === 0 ? (
                <EmptyState
                    message="판매 내역이 없습니다."
                    subMessage="상품을 등록해보세요!"
                    buttonText="상품 등록하기"
                    onRetry={() => navigate("/market/write")}
                />
            ) : (
                <M.MarketplaceGrid>
                    {marketplaceItems.map((item) => (
                        <M.MarketplaceItem key={item.pk} onClick={() => handleMarketplaceClick(item.pk)}>
                            <M.MarketplaceImage>
                                <img src={item.profileImageUrl} alt={item.productName} />
                                {item.usedProductStatus === 'SOLD' && (
                                    <M.StatusBadge status="sold">거래완료</M.StatusBadge>
                                )}
                                {item.usedProductStatus === 'RESERVED' && (
                                    <M.StatusBadge status="reserved">예약중</M.StatusBadge>
                                )}
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
            )}

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