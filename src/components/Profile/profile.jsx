import React, {useState} from "react";
import {
    ProfileContainer, StyledButton, LogoImage, CardContainer, ProfileInfo, ProfileImage,
    UserDetails, Username, ProfileEdit,
    UserStats, StatBox, StatTitle, StatValue,
    LogoutButton, handleIconClick, UsernameSuffix, MyTeam
} from "./profile.style";
import Logo from "../../assets/logo_image_black.svg";
import Image from "../../assets/profile_image.svg";
import { MdNavigateNext } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {openLoginModal} from "../../features/modal/modalSlice.js";

const user = {
    nickname: "닉네임",
    // profileImageUrl: "https://naver.me/image.png",
    teamLogoUrl: "https://media.api-sports.io/football/teams/40.png",
    point: 0,
    teamLanking: "-"
}


const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();

    return isLoggedIn ? (
        <UserCard onLogout={() => setIsLoggedIn(false)} />
    ) : (
        <ProfileContainer>
            <LogoImage src={Logo} alt="프로필 이미지" />
            <StyledButton onClick={() => dispatch(openLoginModal())}>
                간편 로그인 하기
                <MdNavigateNext />
            </StyledButton>
        </ProfileContainer>
    );
};

const UserCard = ({ onLogout }) => {
    return (
        <CardContainer>
            {/* 프로필 정보 */}
            <ProfileInfo>
                <ProfileImage src={user.profileImageUrl || Image} alt="프로필 이미지" />
                <UserDetails>
                    <Username>
                        {user.nickname}
                        <UsernameSuffix> 님</UsernameSuffix>
                        <MyTeam src={user.teamLogoUrl}/>
                    </Username>
                    <ProfileEdit>
                        프로필 설정 <MdNavigateNext size={14}/>
                    </ProfileEdit>
                </UserDetails>
            </ProfileInfo>

            {/* 유저 통계 정보 */}
            <UserStats>
                <StatBox>
                    <StatTitle>이번 시즌 우리 팀 내 순위</StatTitle>
                    <StatValue>{user.teamLanking}위</StatValue>
                </StatBox>
                <StatBox>
                    <StatTitle>
                        지금까지 모은 포인트
                        <BsQuestionCircle onClick={handleIconClick}/>
                    </StatTitle>
                    <StatValue>{user.point} P</StatValue>
                </StatBox>
            </UserStats>

            {/* 로그아웃 버튼 */}
            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </CardContainer>
    );
};

export default Profile;