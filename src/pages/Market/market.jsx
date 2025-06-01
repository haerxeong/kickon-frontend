import React, { useState, useEffect } from 'react';
import { Heart, Eye } from 'lucide-react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import * as M from './market.style.js';
import * as PS from "../../components/Pagination/pagination.style.js";
import {NewsContainer} from "./market.style.js";
import GoodIcon from "../../assets/good.svg"
import {useLeagueTeamStore} from "../../store/useLeagueTeamStore.js";

const Market = () => {
    const [marketplaceItems, setMarketplaceItems] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;
    const [activeTab, setActiveTab] = useState("전체");

    const { selectedTeam } = useLeagueTeamStore();

    const mockMarketplaceItems = [
        {
            pk: 1,
            title: "거의 새것같은 축구화 판매합니다 (나이키)",
            price: 85000,
            user: {nickname: "축구조아", profileImageUrl: "/api/placeholder/30/30"},
            createdAt: "2024-01-15T14:30:00Z",
            views: 34,
            likes: 8,
            image: "/api/placeholder/200/150",
            status: "available"
        },
        {
            pk: 2,
            title: "팀 유니폼 L사이즈 판매",
            price: 45000,
            user: {nickname: "유니폼수집가", profileImageUrl: "/api/placeholder/30/30"},
            createdAt: "2024-01-15T12:15:00Z",
            views: 67,
            likes: 12,
            image: "/api/placeholder/200/150",
            status: "available"
        },
        {
            pk: 3,
            title: "축구공 5호 새제품",
            price: 25000,
            user: {nickname: "스포츠샵", profileImageUrl: "/api/placeholder/30/30"},
            createdAt: "2024-01-15T10:45:00Z",
            views: 23,
            likes: 5,
            image: "/api/placeholder/200/150",
            status: "sold"
        },
        {
            pk: 4,
            title: "골키퍼 글러브 판매합니다",
            price: 35000,
            user: {nickname: "골키퍼", profileImageUrl: "/api/placeholder/30/30"},
            createdAt: "2024-01-14T16:20:00Z",
            views: 41,
            likes: 7,
            image: "/api/placeholder/200/150",
            status: "available"
        },
        {
            pk: 5,
            title: "축구 스파이크 아디다스 270mm",
            price: 120000,
            user: {nickname: "스포츠매니아", profileImageUrl: "/api/placeholder/30/30"},
            createdAt: "2024-01-14T14:20:00Z",
            views: 52,
            likes: 15,
            image: "/api/placeholder/200/150",
            status: "available"
        },
        {
            pk: 6,
            title: "트레이닝복 세트 새제품",
            price: 65000,
            user: {nickname: "운동러버", profileImageUrl: "/api/placeholder/30/30"},
            createdAt: "2024-01-14T11:30:00Z",
            views: 28,
            likes: 6,
            image: "/api/placeholder/200/150",
            status: "reserved"
        }
    ];

    const tabs = ["전체", selectedTeam?.nameKr || ""].filter(Boolean);

    useEffect(() => {
        // 실제로는 여기서 API 호출
        setMarketplaceItems(mockMarketplaceItems);
        setTotalPages(Math.ceil(mockMarketplaceItems.length / itemsPerPage));
    }, []);

    const formatPrice = (price) => {
        return `${price.toLocaleString()}원`;
    };

    const handleMarketplaceClick = (itemId) => {
        console.log(`Marketplace item ${itemId} clicked`);
        // 실제로는 상품 상세 페이지로 이동
    };

    // 현재 페이지에 표시할 아이템들
    const getCurrentPageItems = () => {
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return marketplaceItems.slice(startIndex, endIndex);
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
                            setActivePage(1); // Reset page on tab change
                        }}
                    >
                        {tab}
                    </M.Tab>
                ))}
            </M.TabContainer>
            <M.MarketplaceGrid>
                {getCurrentPageItems().map((item) => (
                    <M.MarketplaceItem key={item.pk} onClick={() => handleMarketplaceClick(item.pk)}>
                        <M.MarketplaceImage>
                            <img src={item.image} alt={item.title}/>
                            {item.status === 'sold' && <M.StatusBadge status="sold">판매완료</M.StatusBadge>}
                            {item.status === 'reserved' && <M.StatusBadge status="reserved">예약 중</M.StatusBadge>}
                        </M.MarketplaceImage>
                        <M.MarketplaceContent>
                            <M.MarketplaceTitle>{item.title}</M.MarketplaceTitle>
                            <M.MarketplacePrice>
                                {formatPrice(item.price)}
                            </M.MarketplacePrice>
                            <M.MarketplaceInfo>
                                <M.MarketplaceAuthor>
                                    <img src={item.user.profileImageUrl} alt="프로필"/>
                                    {item.user.nickname}
                                </M.MarketplaceAuthor>
                                <M.MarketplaceStats>
                                    <span>
                                        <Eye size={10}/>
                                        {item.views}
                                    </span>
                                    <span>
                                        <img src={GoodIcon} alt="Good Icon" width={10} height={10} />
                                        {item.likes}
                                    </span>
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
                    <GrFormPrevious/> 이전
                </PS.NavButton>
                {Array.from({length: totalPages}, (_, i) => (
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
                    다음 <GrFormNext/>
                </PS.NavButton>
            </PS.PaginationWrapper>
        </NewsContainer>
    );
};

export default Market;