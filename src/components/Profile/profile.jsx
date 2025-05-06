import React, { useContext, useEffect, useState } from "react";
import {
    ProfileContainer, StyledButton, LogoImage, CardContainer, ProfileInfo, ProfileImage,
    UserDetails, Username, ProfileEdit,
    UserStats, StatBox, StatTitle, StatValue,
    LogoutButton, handleIconClick, UsernameSuffix, MyTeam
} from "./profile.style";
import Logo from "../../assets/logo_image_black.svg";
import DefaultImage from "../../assets/profile_image.svg";
import { MdNavigateNext } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../features/modal/modalSlice.js";
import { getProfilecard } from "../../apis/domains/common/getProfilecard.js";
import { getUserRanking } from "../../apis/domains/common/getUserRanking.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [userData, setUserData] = useState({
        nickname: "닉네임",
        profileImageUrl: "",
        teamLogoUrl: ""
    });
    const [rankingData, setRankingData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { isAuthenticated, logout } = useContext(AuthContext);

    useEffect(() => {
        console.log("isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const profileData = await getProfilecard();
                setUserData(profileData);

                const ranking = await getUserRanking();
                setRankingData(ranking);

                setError(null);
            } catch (err) {
                console.error("프로필 데이터 가져오기 오류:", err);

                // 403일 경우 강제 로그아웃
                if (err?.response?.status === 403) {
                    logout();
                    return;
                }

                setError("프로필 정보를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        // 인증 컨텍스트의 logout 함수 호출
        logout();

        console.log("로그아웃 처리 완료");
    };

    return isAuthenticated ? (
        <UserCard
            userData={{...userData, ...rankingData}}
            isLoading={isLoading}
            error={error}
            onLogout={handleLogout}
        />
    ) : (
        <ProfileContainer>
            <LogoImage src={Logo} alt="로고 이미지" />
            <StyledButton onClick={() => dispatch(openLoginModal())}>
                간편 로그인 하기
                <MdNavigateNext />
            </StyledButton>
        </ProfileContainer>
    );
};

const UserCard = ({ userData, isLoading, error, onLogout }) => {
    const navigate = useNavigate();
    if (isLoading) {
        return <CardContainer>로딩 중...</CardContainer>;
    }

    if (error) {
        return <CardContainer>{error}</CardContainer>;
    }

    return (
        <CardContainer>
            {/* 프로필 정보 */}
            <ProfileInfo>
                <ProfileImage
                    src={userData.profileImageUrl || DefaultImage}
                    alt="프로필 이미지"
                />
                <UserDetails>
                    <Username>
                        {userData.nickname}
                        <UsernameSuffix> 님</UsernameSuffix>
                        {userData.teamLogoUrl && (
                            <MyTeam src={userData.teamLogoUrl} alt="팀 로고" />
                        )}
                    </Username>
                    <ProfileEdit
                        onClick={() => navigate("/profile")} // 클릭 시 페이지 이동!
                        style={{ cursor: "pointer" }} // 마우스 오버 시 손가락 모양
                    >
                        프로필 설정 <MdNavigateNext size={10} />
                    </ProfileEdit>
                </UserDetails>
            </ProfileInfo>

            {/* 유저 통계 정보 */}
            <UserStats>
                <StatBox>
                    <StatTitle>이번 시즌 우리 팀 내 순위</StatTitle>
                    <StatValue>{userData.ranking}위</StatValue>
                </StatBox>
                <StatBox>
                    <StatTitle>
                        지금까지 모은 포인트
                        <BsQuestionCircle onClick={handleIconClick} color="#8F8F8F" size={6} style={{ marginLeft: "0.175rem" }}/>
                    </StatTitle>
                    <StatValue>{userData.totalPoints} P</StatValue>
                </StatBox>
            </UserStats>

            {/* 로그아웃 버튼 */}
            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </CardContainer>
    );
};

export default Profile;