import React, { useState, useEffect } from "react";
import * as S from "./ProfileSettings.style";
import { League } from "../../mocks/league";
import naverLogo from "../../assets/naver.svg";
import ProfileImageDefault from "../../assets/profile.svg";
import CameraIcon from "../../assets/camera.png";
import { BsQuestionCircle } from "react-icons/bs";

const ProfileSettings = () => {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [profileImage, setProfileImage] = useState(ProfileImageDefault);
  const fileInputRef = React.useRef(null);
  const leagues = League;

  // 서버에서 사용자 데이터를 가져오는 효과
  useEffect(() => {
    // 여기서 서버 API 호출을 통해 사용자 정보를 가져옵니다
    // 예시로 하드코딩된 데이터를 사용합니다
    const fetchUserData = async () => {
      try {
        // 실제로는 API 호출이 들어갈 자리
        // const response = await fetch('/api/user/profile');
        // const userData = await response.json();
        
        // 임시 데이터
        const userData = {
          league: "프리미어리그",
          team: "맨체스터 유나이티드"
        };
        
        setSelectedLeague(userData.league);
        setSelectedTeam(userData.team);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
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
    } else {
      setNicknameError("");
    }
  };

  const handleUpdate = () => {
    if (!nickname) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }
    console.log("Profile update submitted", {
      nickname,
      profileImage: profileImage !== ProfileCamera ? profileImage : null,
    });
  };

  const selectedLeagueData = leagues.find(
    (league) => league.krName === selectedLeague
  );

  return (
    <S.ProfileSettingsContainer>
      <S.ProfileImageContainer>
        <S.ProfileImage src={profileImage} alt="Profile" />
        <S.CameraIcon 
          src={CameraIcon} 
          alt="Change profile" 
          onClick={handleImageClick} 
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </S.ProfileImageContainer>

      <S.InputGroup>
        <S.InputLabel>닉네임</S.InputLabel>
        <S.InputWrapper>
          <S.InputField
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임을 입력해 주세요"
            hasError={!!nicknameError}
          />
          {nickname && (
            <S.ClearIcon onClick={() => setNickname("")}>×</S.ClearIcon>
          )}
        </S.InputWrapper>
        {nicknameError && <S.ErrorMessage>{nicknameError}</S.ErrorMessage>}
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>
          리그
          <BsQuestionCircle onClick={handleIconClick}/>
        </S.InputLabel>
        <S.AccountInfoContainer>
          <S.LeftContent>
            {selectedLeagueData && (
              <>
                <S.SelectedImage src={selectedLeagueData.image} alt={selectedLeagueData.krName} />
                <S.SelectedName>{selectedLeagueData.krName}</S.SelectedName>
              </>
            )}
          </S.LeftContent>
        </S.AccountInfoContainer>
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>응원팀</S.InputLabel>
        <S.AccountInfoContainer>
          <S.LeftContent>
            {selectedTeam && (
              <>
              <S.SelectedImage src={selectedLeagueData.image} alt={selectedLeagueData.krName} />
              <S.SelectedName>{selectedTeam}</S.SelectedName>
              </>
            )}
          </S.LeftContent>
        </S.AccountInfoContainer>
      </S.InputGroup>

      <S.InputGroup>
        <S.ManageTitle>계정 관리</S.ManageTitle>
        <S.AccountInfoContainer>
          {/* 네이버 또는 카카오 로고 표시 (예시로 네이버 사용) */}
          <S.AccountLogo src={naverLogo} alt="Naver" />
          <S.AccountEmail>email.naver.com</S.AccountEmail>
        </S.AccountInfoContainer>
      </S.InputGroup>

      <S.ButtonGroup>
        <S.CancelButton onClick={() => console.log("취소")}>
          취소
        </S.CancelButton>
        <S.UpdateButton
          onClick={handleUpdate}
          disabled={
          !nickname}
          >
          수정 완료
        </S.UpdateButton>
      </S.ButtonGroup>
    </S.ProfileSettingsContainer>
  );
};

export default ProfileSettings;
