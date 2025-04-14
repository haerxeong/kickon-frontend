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
import { AuthContext } from "../../context/AuthContext.jsx";

const Profile = () => {
    const [userData, setUserData] = useState({
        nickname: "닉네임",
        profileImageUrl: "",
        teamLogoUrl: "",
    });
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
                setError(null);
            } catch (err) {
                setError("프로필 정보를 불러오는데 실패했습니다.");
                console.error("프로필 데이터 가져오기 오류:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        // 로컬 스토리지에서 토큰 제거
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken"); // 리프레시 토큰이 있다면 제거

        // 인증 컨텍스트의 logout 함수 호출
        logout();

        // 리다이렉트나 페이지 새로고침으로 상태 초기화
        window.location.reload(); // 페이지 새로고침

        console.log("로그아웃 처리 완료");
    };

    return isAuthenticated ? (
        <UserCard
            userData={userData}
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
                    <ProfileEdit>
                        프로필 설정 <MdNavigateNext size={14} />
                    </ProfileEdit>
                </UserDetails>
            </ProfileInfo>

            {/* 유저 통계 정보 */}
            <UserStats>
                <StatBox>
                    <StatTitle>이번 시즌 우리 팀 내 순위</StatTitle>
                    <StatValue>{userData.teamLanking}위</StatValue>
                </StatBox>
                <StatBox>
                    <StatTitle>
                        지금까지 모은 포인트
                        <BsQuestionCircle onClick={handleIconClick} />
                    </StatTitle>
                    <StatValue>{userData.point} P</StatValue>
                </StatBox>
            </UserStats>

            {/* 로그아웃 버튼 */}
            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </CardContainer>
    );
};

export default Profile;