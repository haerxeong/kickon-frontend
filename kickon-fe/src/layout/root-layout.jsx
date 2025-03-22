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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #363636; /* 배경색 설정 */
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
`;

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  width: 300px;
`;

const Section = styled.section`
  margin-bottom: 20px;
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
                {/* 왼쪽 컬럼 */}
                <LeftColumn>
                    <Section>
                        <RankingTable />
                    </Section>
                    <Section>
                        <MatchCard />
                    </Section>
                    <Section>
                        <MatchCard /> {/* 추가 경기 카드 */}
                    </Section>
                    <Section>
                        <NewsList />
                    </Section>
                </LeftColumn>

                {/* 오른쪽 컬럼 */}
                <RightColumn>
                    <Section>
                        <Profile /> {/*프로필*/}
                    </Section>
                    <Section>
                        <NewsList /> {/* 인기 뉴스 리스트 */}
                    </Section>
                </RightColumn>
            </MainContent>

            {/* 커뮤니티 게시판 */}
            <CommunityBoard />

            {/* 푸터 */}
            <Footer />
        </Layout>
    );
};

export default RootLayout;