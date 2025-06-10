import React, { useState, useEffect } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { ChevronDown } from "lucide-react";
import * as M from './market.style.js';
import * as PS from "../../components/Pagination/pagination.style.js";
import { NewsContainer } from "./market.style.js";
import { useLeagueTeamStore } from "../../store/useLeagueTeamStore.js";
import { getItemList } from "../../apis/domains/market/getItemList.js";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate.js";
import Logo from "../../assets/login_logo.svg";
import EmptyState from "../../components/EmptyState/emptyState.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/loadingSpinner.jsx";

const Market = () => {
    const [marketplaceItems, setMarketplaceItems] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;
    const [activeTab, setActiveTab] = useState("전체");
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [myItems, setMyItems] = useState([]);
    const [allItems, setAllItems] = useState([]); // 모든 아이템 저장
    const [loading, setLoading] = useState(true);

    const { selectedTeam } = useLeagueTeamStore();

    const tabs = ["전체", selectedTeam?.nameKr || "", "내 판매글"].filter(Boolean);

    // 카테고리 목록
    const categories = [
        "전체",
        "유니폼",
        "굿즈",
        "축구화",
        "응원용품",
        "기타"
    ];

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                if (activeTab === "내 판매글") {
                    const res = await getItemList({ size: 1000, page: 1 });
                    const mine = (res.items || []).filter(item => item.isMine);
                    setMyItems(mine);
                } else {
                    // 모든 데이터를 한 번에 가져오기
                    const params = {
                        size: 1000, // 충분히 큰 수로 모든 데이터 가져오기
                        page: 1,
                        team: activeTab === selectedTeam?.nameKr ? selectedTeam.pk : undefined
                    };
                    const res = await getItemList(params);
                    setAllItems(res.items || []);
                }
            } catch (err) {
                console.error("마켓 데이터를 불러오는 중 오류 발생:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [activeTab, selectedTeam]);

    // 카테고리와 페이지 변경에 따른 아이템 표시
    useEffect(() => {
        let itemsToShow = [];

        if (activeTab === "내 판매글") {
            itemsToShow = myItems;
        } else {
            itemsToShow = allItems;
        }

        // 카테고리 필터링
        if (selectedCategory !== "전체") {
            itemsToShow = itemsToShow.filter(item => item.category === selectedCategory);
        }

        // 페이지네이션 적용
        const totalFiltered = itemsToShow.length;
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        setMarketplaceItems(itemsToShow.slice(startIndex, endIndex));
        setTotalPages(Math.max(1, Math.ceil(totalFiltered / itemsPerPage)));
    }, [activeTab, selectedCategory, activePage, myItems, allItems]);

    const formatPrice = (price) => `${price.toLocaleString()}원`;

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setActivePage(1); // 카테고리 변경 시 첫 페이지로
        setIsDropdownOpen(false);
    };

    if (loading) return <LoadingSpinner />;

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
                <M.CategoryDropdown>
                    <M.DropdownButton
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        isOpen={isDropdownOpen}
                    >
                        <span>{selectedCategory}</span>
                        <ChevronDown size={16} />
                    </M.DropdownButton>
                    {isDropdownOpen && (
                        <M.DropdownMenu>
                            {categories.map((category) => (
                                <M.DropdownItem
                                    key={category}
                                    selected={selectedCategory === category}
                                    onClick={() => handleCategorySelect(category)}
                                >
                                    {category}
                                </M.DropdownItem>
                            ))}
                        </M.DropdownMenu>
                    )}
                </M.CategoryDropdown>
            </M.TabContainer>

            {marketplaceItems.length === 0 ? (
                activeTab === "내 판매글" ? (
                    <EmptyState
                        message="판매 내역이 없습니다."
                        subMessage="상품을 등록해보세요!"
                        buttonText="상품 등록하기"
                        onRetry={() => navigate("/market/write")}
                    />
                ) : (
                    <EmptyState
                        message="등록된 상품이 없습니다."
                        subMessage="상품을 등록해보세요!"
                        buttonText="상품 등록하기"
                        onRetry={() => navigate("/market/write")}
                    />
                )
            ) : (
                <M.MarketplaceGrid>
                    {marketplaceItems.map((item) => (
                        <M.MarketplaceItem key={item.pk} onClick={() => handleMarketplaceClick(item.pk)}>
                            <M.MarketplaceImage>
                                <img
                                    src={item.profileImageUrl && item.profileImageUrl.trim() !== "" ? item.profileImageUrl : Logo}
                                    alt={item.productName}
                                    className={item.profileImageUrl && item.profileImageUrl.trim() !== "" ? "normal-image" : "logo-image"}
                                />
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