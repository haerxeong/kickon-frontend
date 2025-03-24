// root-layout.jsx
import React from "react";
import Header from "../components/Header/header";
import MainBanner from "../components/MainBanner/mainBanner";
import RankingTable from "../components/RankingTable/rankingTable";
import MatchCard from "../components/MatchCard/matchCard";
import NewsList from "../components/NewsList/newsList";
import CommunityBoard from "../components/CommunityBoard/communityBoard";
import Footer from "../components/Footer/footer";
import styled from "styled-components";
import Profile from "../components/Profile/profile.jsx";
import {currentSeasonRankings, predictionRankings} from "../mocks/rankings.js";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #363636;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const LeftColumn = styled.div`
    width: 368px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const RightColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const RightTopSection = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
`;

const SimpleCard = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewsContainer = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
`;

const NewsTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: bold;
`;

const RootLayout = () => {
    return (
        <Layout>
            {/* 헤더 */}
            <Header />

            {/* 메인 배너 */}
            <MainBanner />

            {/* 메인 콘텐츠 */}
            <MainContent>
                {/* 왼쪽 컬럼 - 순위표 */}
                <LeftColumn>
                    <RankingTable title="이번 시즌 순위" rankings={currentSeasonRankings} type="season" />
                    <RankingTable title="승부예측 순위" rankings={predictionRankings} type="prediction" />
                </LeftColumn>

                {/* 오른쪽 컬럼 - 경기 카드와 뉴스 */}
                <RightColumn>
                    {/* 간단한 카드 */}
                    <RightTopSection>
                        <SimpleCard>
                            <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
                        </SimpleCard>
                    </RightTopSection>

                    {/* 경기 카드들 */}
                    <MatchCard />
                    <MatchCard />
                    <MatchCard />
                    <MatchCard />
                      
                    {/*프로필*/}
                    <Section>
                        <Profile /> 
                    </Section>

                    {/* 뉴스 섹션 */}
                    <NewsContainer>
                        <NewsTitle>함께 본 인기 FC 서울 뉴스</NewsTitle>
                        <NewsList />
                    </NewsContainer>
                </RightColumn>
            </MainContent>

            {/* 푸터 */}
            <Footer />
        </Layout>
    );
};

export default RootLayout;