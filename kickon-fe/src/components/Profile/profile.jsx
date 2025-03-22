import React from "react";
import { ProfileContainer, StyledButton, LogoImage } from "./Profile.style";
import Logo from "../../assets/Logo_image_black.svg";


const Profile = () => {
    return (
        <ProfileContainer>
            <LogoImage src={Logo} alt="프로필 이미지" />
            <StyledButton>간편 로그인 하기</StyledButton>
        </ProfileContainer>
    );
};

export default Profile;