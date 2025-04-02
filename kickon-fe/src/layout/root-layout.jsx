import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/header";
import MainBanner from "../components/MainBanner/mainBanner";
import RankingTable from "../components/RankingTable/rankingTable";
import Profile from "../components/Profile/profile";
import Footer from "../components/Footer/footer";
import styled from "styled-components";
import {rankings} from "../mocks/rankings.js";
import CommunityBoard from "../components/CommunityBoard/communityBoard.jsx";

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
    padding: 1rem; /* 20px */
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    //width: 59rem; /* 전체 콘텐츠 너비 */
    gap: 1rem; /* 컬럼 간 여백 */
`;

const LeftColumn = styled.div`
    //width: 13.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-left: 12rem; /* 왼쪽 여백 */
`;

const MainContent = styled.main`
    display: flex;
    flex-direction: column;
    width: 30rem; /* 메인 콘텐츠 너비 */
    gap: 1rem;
`;

const RightColumn = styled.div`
    //width: 13.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-right: 12rem; /* 오른쪽 여백 */
    align-items: flex-end;
`;

const StyledMainBanner = styled(MainBanner)`
    max-width: 100%;
`;

const RootLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isSignupPage = location.pathname === "/signup";
    const isDark = !isHomePage; // 홈 이외의 페이지에서 다크 모드 적용
    const isWritePage = location.pathname === "/news/write" || location.pathname === "/community/write";

    return (
        <Layout isHomePage={isHomePage}>
            <Header isDark={isDark} />

            {/* 홈 화면일 때만 배너 표시 */}
            {isHomePage && <StyledMainBanner />}

            <MainContainer>
                {isSignupPage || isWritePage ? (
                    <MainContent>
                        <Outlet />
                    </MainContent>
                ) : (
                    <ContentWrapper>
                        {/* 왼쪽: 랭킹 테이블 */}
                        <LeftColumn>
                            <RankingTable title="이번 시즌 순위" rankings={rankings} type="season" />
                            <RankingTable title="승부예측 순위" rankings={rankings} type="prediction" />
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