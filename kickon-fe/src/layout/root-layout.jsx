import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/header";
import MainBanner from "../components/MainBanner/mainBanner";
import RankingTable from "../components/RankingTable/rankingTable";
import Profile from "../components/Profile/profile";
import TopNews from "../components/TopNews/topNews";
import Footer from "../components/Footer/footer";
import styled from "styled-components";
import { rankings } from "../mocks/rankings.js";

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
`;

// 좌/중앙/우측 컬럼 묶는 wrapper
const ContentWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: calc(
    15rem + 1rem + 30rem + 1rem + 15rem + 24.5rem
  ); // 총 여백 포함
  padding: 0 12.25rem;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 0 2rem;
  }
`;

// 개별 컬럼 스타일
const LeftColumn = styled.div`
  width: 15rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const MainContent = styled.main`
  width: 30rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const RightColumn = styled.div`
  width: 15rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

// 메인 배너
const StyledMainBanner = styled(MainBanner)`
  width: 100%;
  max-width: 100%;
`;

const RootLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSignupPage = location.pathname === "/signup";
  const isDark = !isHomePage; // 홈 이외의 페이지에서 다크 모드 적용
  const isWritePage =
    location.pathname === "/news/write" ||
    location.pathname === "/community/write";

  return (
    <Layout isHomePage={isHomePage}>
      <Header isDark={isDark} />

      {isHomePage && <StyledMainBanner />}

      <MainContainer>
        {isSignupPage || isWritePage ? (
          <MainContent>
            <Outlet />
          </MainContent>
        ) : (
          <ContentWrapper>
            <LeftColumn>
              <RankingTable
                title="이번 시즌 순위"
                rankings={rankings}
                type="season"
              />
              <RankingTable
                title="승부예측 순위"
                rankings={rankings}
                type="prediction"
              />
            </LeftColumn>

            <MainContent>
              <Outlet />
            </MainContent>

            <RightColumn>
              <Profile />
              <TopNews />
            </RightColumn>
          </ContentWrapper>
        )}
      </MainContainer>

      {(isHomePage || isSignupPage) && <Footer isDark={isSignupPage} />}
    </Layout>
  );
};

export default RootLayout;
