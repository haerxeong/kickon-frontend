import React, {useEffect, useState} from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/header";
import MainBanner from "../components/MainBanner/mainBanner";
import RankingTable from "../components/RankingTable/rankingTable";
import Profile from "../components/Profile/profile";
import TopNews from "../components/TopNews/topNews";
import Footer from "../components/Footer/footer";
import styled from "styled-components";
import WriteButton from "../components/WriteButton/writeButton.jsx";

// 전체 레이아웃 Wrapper
const Layout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: ${(props) => (props.isHomePage ? "#363636" : "#F8F8F8")};
`;

// 메인 영역
const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0.7rem;

    @media (max-width: 950px) {
        padding: 1rem 0 0 0; /* 상단 패딩 추가 */
    }
`;

// 컬럼 묶는 wrapper
const ContentWrapper = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    justify-content: center;

    @media (max-width: 950px) {
        display: block;      // flex 해제!
        padding: 0;
        max-width: 100vw;
    }
`;

// 좌/우 컬럼: 반응형으로 크기 조절
const LeftColumn = styled.div`
    width: clamp(12rem, 20vw, 15rem);
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;

    @media (max-width: 950px) {
        display: none;
    }
`;

const RightColumn = styled.div`
    width: clamp(12rem, 20vw, 15rem);
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;

    @media (max-width: 950px) {
        display: none;
    }
`;

// MainContent
const MainContent = styled.main`
    width: clamp(20rem, 40vw, 30rem);
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;

    @media (max-width: 950px) {
        width: 100%;
        max-width: 30rem;    // 원하는 최대 너비
        padding: 0 1rem;
        margin: 0 auto;      // 중앙 정렬!
    }
`;

const MainBannerWrapper = styled.div`
    width: 100vw;
    max-width: 100vw;
    margin-left: 50%;
    transform: translateX(-50%);

    @media (max-width: 950px) {
        border-radius: 0;
    }
`;

// 메인 배너
const StyledMainBanner = styled(MainBanner)`
    width: 100vw;
    max-width: 100vw;
    margin-left: 50%;
    transform: translateX(-50%);
    @media (max-width: 950px) {
        border-radius: 0;
    }
`;

const RootLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isSignupPage = location.pathname === "/signup";
    const isProfilePage = location.pathname === "/profile";
    const isDark = !isHomePage;
    const isWritePage =
        location.pathname === "/news/write" ||
        location.pathname === "/community/write" ||
        location.pathname === "/market/write";
    const isNewsPage = location.pathname.startsWith("/news");
    const isCommunityPage = location.pathname.startsWith("/community");
    const isMarketPage = location.pathname.startsWith("/market");

    // 1. windowWidth 상태 추가
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // 2. resize 이벤트로 windowWidth 갱신
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 3. isNarrow를 state 기반으로 계산
    const isNarrow = windowWidth <= 950;

    return (
        <Layout isHomePage={isHomePage}>
            <Header isDark={isDark} />
            {isHomePage && (
                <MainBannerWrapper>
                    <StyledMainBanner />
                </MainBannerWrapper>
            )}
            <MainContainer>
                {isSignupPage || isWritePage || isProfilePage ? (
                    <MainContent>
                        <Outlet />
                    </MainContent>
                ) : (
                    <ContentWrapper>
                        {!isNarrow && (
                            <LeftColumn>
                                <RankingTable title="이번 시즌 순위" type="season" />
                                <RankingTable title="승부예측 순위" type="gamble" />
                            </LeftColumn>
                        )}
                        <MainContent>
                            <Outlet />
                        </MainContent>
                        {!isNarrow && (
                            <RightColumn>
                                <Profile />
                                <TopNews />
                                {((isNewsPage || isCommunityPage || isMarketPage) && !isWritePage) && (
                                    <WriteButton />
                                )}
                            </RightColumn>
                        )}
                    </ContentWrapper>
                )}
            </MainContainer>
            {(isHomePage || isSignupPage) && <Footer isDark={isSignupPage} />}
        </Layout>
    );
};

export default RootLayout;