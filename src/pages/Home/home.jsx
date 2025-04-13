import MatchCard from "../../components/MatchCard/matchCard";
import CommunityBoard from "../../components/CommunityBoard/communityBoard";
import NewsList from "../../components/NewsList/newsList";
import * as S from "./home.style";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            console.log('Access Token:', accessToken);
        }
    }, [navigate]);

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
