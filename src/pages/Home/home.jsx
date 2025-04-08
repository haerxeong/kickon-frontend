import MatchCard from "../../components/MatchCard/matchCard";
import CommunityBoard from "../../components/CommunityBoard/communityBoard";
import NewsList from "../../components/NewsList/newsList";
import * as S from "./home.style";

const Home = () => {
    return (
        <>
            <MatchCard/>
            <NewsList/>
            <CommunityBoard/>
            <S.Spacer />
        </>
    );
}

export default Home;
