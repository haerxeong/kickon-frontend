import MatchCard from "../../components/MatchCard/matchCard";
import CommunityBoard from "../../components/CommunityBoard/communityBoard";

const Home = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1rem",
            alignSelf: "stretch"
        }}>
            <CommunityBoard/>
            <MatchCard/>
        </div>
    );
}

export default Home;
