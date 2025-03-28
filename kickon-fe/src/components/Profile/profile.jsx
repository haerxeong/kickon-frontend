import React, {useState} from "react";
import { ProfileContainer, StyledButton, LogoImage,  CardContainer, ProfileInfo, ProfileImage,
    UserDetails, Username, ProfileEdit,
    UserStats, StatBox, StatTitle, StatValue,
    LogoutButton, Icon, handleIconClick  } from "./Profile.style";
import Logo from "../../assets/logo_image_black.svg";
import Image from "../../assets/profile_image.svg";
import InfoIcon from "../../assets/question.svg";
import { useDispatch } from "react-redux";
import {openLoginModal} from "../../features/modal/modalSlice.js";

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
            </StyledButton>
        </ProfileContainer>
    );
};

const UserCard = ({ onLogout }) => {
    return (
        <CardContainer>
            {/* 프로필 정보 */}
            <ProfileInfo>
                <ProfileImage src={Image} alt="프로필 이미지" />
                <UserDetails>
                    <Username>닉네임 님</Username>
                    <ProfileEdit>프로필 설정 &gt;</ProfileEdit>
                </UserDetails>
            </ProfileInfo>

            {/* 유저 통계 정보 */}
            <UserStats>
                <StatBox>
                    <StatTitle>이번 시즌 우리 팀 내 순위</StatTitle>
                    <StatValue>-위</StatValue>
                </StatBox>
                <StatBox>
                    <StatTitle>
                        지금까지 모은 포인트
                        <Icon src={InfoIcon} alt="정보" onClick={handleIconClick} />
                    </StatTitle>
                    <StatValue>0 P</StatValue>
                </StatBox>
            </UserStats>

            {/* 로그아웃 버튼 */}
            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </CardContainer>
    );
};

export default Profile;