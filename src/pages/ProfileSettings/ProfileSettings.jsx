import React, { useState, useEffect } from "react";
import * as S from "./ProfileSettings.style";
import { League } from "../../mocks/league";
import naverLogo from "../../assets/naver.svg";
import kakaoLogo from "../../assets/kakao.svg"; 
import profile_image from "../../assets/profile_image.svg"; 
import ProfileImageDefault from "../../assets/profile.svg";
import CameraIcon from "../../assets/camera.png";
import { BsQuestionCircle } from "react-icons/bs";
import { getUserInfo } from "../../apis/domains/main/getUserInfo";
import { updateUserInfo } from "../../apis/domains/auth/updateUserInfo";
import { useNavigate } from "react-router-dom";
import { BsBan } from "react-icons/bs";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [teamLogoUrl, setTeamLogoUrl] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamPk, setTeamPk] = useState(null);
  const [profileImage, setProfileImage] = useState(ProfileImageDefault);
  const [email, setEmail] = useState("");
  const [providerType, setProviderType] = useState("");
  const [loading, setLoading] = useState(true);
  const fileInputRef = React.useRef(null);

  const leagues = League;

  const getProviderLogo = () => {
    if (providerType === "KAKAO") {
      return kakaoLogo;
    } else if (providerType === "NAVER") {
      return naverLogo;
    }
    // 기본값 또는 다른 provider 타입에 대한 처리
    return profile_image;
  };

  // 서버에서 사용자 데이터를 가져오는 효과
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUserInfo();
        
        if (response.isLoggedIn && response.userData) {
          const userData = response.userData;
          setNickname(userData.nickname);
          setProfileImage(userData.profileImageUrl || ProfileImageDefault);
          setEmail(userData.email);
          setProviderType(userData.providerType);
          
          // league는 바로 userData에서 뽑기!
          setSelectedLeague(userData.leagueName);
          // 팀도 바로 userData에서!
          setSelectedTeam(userData.teamName);
          setTeamPk(userData.teamPk);
          setTeamLogoUrl(userData.teamLogoUrl);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 이미지 클릭 시 파일 선택 창 열기
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleIconClick = () => {
    alert("아이콘이 클릭되었습니다");
  };

  // 이미지 변경 처리 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    if (!value.length) {
      setNicknameError("닉네임을 입력해 주세요.");
    } else if (value.length > 8) {
      setNicknameError("닉네임은 8자 이하로 작성해주세요.");
    } else {
      setNicknameError("");
    }
  };

  const handleUpdate = async () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const userData = {
        nickname,
        team: teamPk
      };

      const response = await updateUserInfo(userData);
      
      if (response.code && response.code.split('_').includes('SUCCESS')) {
        alert("프로필이 성공적으로 업데이트되었습니다.");
        navigate("/");
      } else if (response === "DUPLICATED_NICKNAME") {
        setNicknameError("이미 사용중인 닉네임입니다.");
      } else if (response === "INVALID_REQUEST") {
        setNicknameError("유효하지 않은 요청입니다.");
      } else {
        console.error(response);
        alert("프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
  
  const selectedLeagueData = leagues.find(
    (league) => league.krName === selectedLeague
  );

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <S.ProfileSettingsContainer>
      <S.ProfileImageContainer>
        <S.ProfileImage src={profileImage} alt="프로필 이미지" />
        <S.CameraIcon src={CameraIcon} alt="카메라" onClick={handleImageClick} />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
          accept="image/*"
        />
      </S.ProfileImageContainer>

      <S.InputGroup>
        <S.InputLabel>
          닉네임
          <BsQuestionCircle onClick={handleIconClick} />
        </S.InputLabel>
        <S.InputWrapper>
          <S.InputField
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임을 입력해주세요"
            hasError={!!nicknameError}
          />
          {nickname && (
            <S.ClearIcon onClick={() => setNickname("")}>×</S.ClearIcon>
          )}
        </S.InputWrapper>
        {nicknameError && <S.ErrorMessage>{nicknameError}</S.ErrorMessage>}
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>리그</S.InputLabel>
        <S.AccountInfoContainer>
          {selectedLeagueData ? (
            <S.LeftContent>
              <S.SelectedImage src={selectedLeagueData.logoUrl || {BsBan}} alt={selectedLeagueData.krName} />
              <S.SelectedName>{selectedLeagueData.krName || '응원팀이 없습니다' }</S.SelectedName>
            </S.LeftContent>
          ) : (
              <S.LeftContent>
                <BsBan size={24} />
                <S.SelectedName>응원팀이 없습니다</S.SelectedName>
              </S.LeftContent>
          )
          }
        </S.AccountInfoContainer>
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>응원팀</S.InputLabel>
        <S.AccountInfoContainer>
          {selectedTeam ? (
            <S.LeftContent>
              <S.SelectedImage src={teamLogoUrl || {BsBan}} alt={selectedTeam} />
              <S.SelectedName>{selectedTeam || '응원팀이 없습니다'}</S.SelectedName>
            </S.LeftContent>
          ) : (
              <S.LeftContent>
                <BsBan size={24} />
                <S.SelectedName>응원팀이 없습니다</S.SelectedName>
              </S.LeftContent>
          )
          }
        </S.AccountInfoContainer>
      </S.InputGroup>

      <S.ManageTitle>계정 관리</S.ManageTitle>
      <S.AccountInfoContainer>
        <S.AccountLogo 
          src={getProviderLogo()} 
          alt={`${providerType} 로고`} 
        />
        <S.AccountEmail>{email}</S.AccountEmail>
      </S.AccountInfoContainer>

      <S.ButtonGroup>
        <S.CancelButton onClick={handleCancel}>
          취소
        </S.CancelButton>
        <S.UpdateButton onClick={handleUpdate} disabled={!nickname || !!nicknameError}>
          수정 완료
        </S.UpdateButton>
      </S.ButtonGroup>
    </S.ProfileSettingsContainer>
  );
};

export default ProfileSettings;
