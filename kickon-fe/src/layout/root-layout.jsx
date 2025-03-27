import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/header";
import MainBanner from "../components/MainBanner/mainBanner";
import RankingTable from "../components/RankingTable/rankingTable";
import Profile from "../components/Profile/profile";
import Footer from "../components/Footer/footer";
import styled from "styled-components";
import { currentSeasonRankings, predictionRankings } from "../mocks/rankings.js";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: ${props => props.isHomePage ? "#363636" : "#F8F8F8"};
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.25rem; /* 20px */
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 75rem; /* 1200px */
    gap: 1rem; /* 16px */
`;

const LeftColumn = styled.div`
    width: 23rem; /* 368px */
    display: flex;
    flex-direction: column;
    gap: 1rem; /* 16px */
`;

const MainContent = styled.main`
    flex: 1;
    width: 37.5rem; /* 600px */
`;

const RightColumn = styled.div`
    width: 23rem; /* 368px */
    display: flex;
    flex-direction: column;
    gap: 1rem; /* 16px */
`;

const RootLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isSignupPage = location.pathname === "/signup";
    const isDark = !isHomePage; // 홈 이외의 페이지에서 다크 모드 적용

    return (
        <Layout isHomePage={isHomePage}>
            <Header isDark={isDark} />

            {/* 홈 화면일 때만 배너 표시 */}
            {isHomePage && <MainBanner />}

            <MainContainer>
                {isSignupPage ? (
                    <MainContent>
                        <Outlet />
                    </MainContent>
                ) : (
                    <ContentWrapper>
                        {/* 왼쪽: 랭킹 테이블 */}
                        <LeftColumn>
                            <RankingTable title="이번 시즌 순위" rankings={currentSeasonRankings} type="season" />
                            <RankingTable title="승부예측 순위" rankings={predictionRankings} type="prediction" />
                        </LeftColumn>

                        {/* 중앙: 페이지별 메인 콘텐츠 */}
                        <MainContent>
                            <Outlet />
                        </MainContent>

                        {/* 오른쪽: 프로필 */}
                        <RightColumn>
                            <Profile />
                        </RightColumn>
                    </ContentWrapper>
                )}
            </MainContainer>

            {/* 홈 또는 회원가입일 때 Footer 표시 */}
            {(isHomePage || isSignupPage) && <Footer isDark={isSignupPage} />}
        </Layout>
    );
};

export default RootLayout;