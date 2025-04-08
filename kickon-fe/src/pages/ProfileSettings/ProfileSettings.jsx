import React, { useState, useEffect } from "react";
import * as S from "./ProfileSettings.style";
import { League } from "../../mocks/league";
import naverLogo from "../../assets/naver.svg";
import kakaoLogo from "../../assets/kakao.svg";
import { FiHelpCircle } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsBan } from "react-icons/bs";
import ProfileImageDefault from "../../assets/profile.svg";
import CameraIcon from "../../assets/camera.png";

const ProfileSettings = () => {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamOptions, setTeamOptions] = useState([]);
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfileImageDefault);
  const fileInputRef = React.useRef(null);

  const leagues = League;

  useEffect(() => {
    // Update team options when league changes
    if (selectedLeague && selectedLeague !== "응원팀이 없어요.") {
      const teams =
          leagues.find((league) => league.krName === selectedLeague)?.teams || [];
      setTeamOptions(teams);
    } else {
      setTeamOptions([]);
    }
  }, [selectedLeague, leagues]);

  // 이미지 클릭 시 파일 선택 창 열기
  const handleImageClick = () => {
    fileInputRef.current.click();
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
    if (!nickname || !selectedLeague || !selectedTeam) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    console.log("Profile update submitted", {
      nickname,
      selectedLeague,
      selectedTeam,
      profileImage: profileImage !== ProfileCamera ? profileImage : null,
    });
  };

  const selectedLeagueData = leagues.find(
      (league) => league.krName === selectedLeague
  );

  return (
    <S.ProfileSettingsContainer>
      <S.ProfileImageWrapper>
        <S.ProfileImageContainer>
          <S.ProfileImage src={profileImage} alt="Profile" />
          <S.CameraIcon 
            src={CameraIcon} 
            alt="Change profile picture"
            onClick={handleImageClick}
          />
        </S.ProfileImageContainer>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
          accept="image/*"
        />
      </S.ProfileImageWrapper>

        <S.InputGroup>
          <S.InputLabel>닉네임</S.InputLabel>
          <S.InputWrapper>
            <S.InputField
            placeholder="닉네임은 최대 8글자"
            value={nickname}
            onChange={handleNicknameChange}
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
            <FiHelpCircle color="#8F8F8F" style={{ marginLeft: "0.25rem" }} />
          </S.InputLabel>
          <S.Dropdown
              onClick={() => setIsLeagueDropdownOpen(!isLeagueDropdownOpen)}
          >
            <S.DropdownContent>
              <S.LeftContent>
                {selectedLeagueData ? (
                    <>
                      <S.SelectedImage
                          src={selectedLeagueData.logoUrl}
                          alt={selectedLeagueData.krName}
                      />
                      <S.SelectedName>{selectedLeagueData.krName}</S.SelectedName>
                    </>
                ) : null}
              </S.LeftContent>

              {selectedLeagueData ? (
                  <IoChevronDownOutline size={12} color="#8F8F8F" />
              ) : (
                  <S.DropdownText>선택해 주세요</S.DropdownText>
              )}
            </S.DropdownContent>
          </S.Dropdown>
          {isLeagueDropdownOpen && (
              <S.DropdownList>
                {leagues.map((league) => (
                    <S.DropdownItem
                        key={league.pk}
                        onClick={() => {
                          setSelectedLeague(league.krName);
                          setSelectedTeam(""); // Reset team selection
                          setIsLeagueDropdownOpen(false);
                        }}
                    >
                      <S.LeagueImage src={league.logoUrl} alt={league.krName} />
                      <S.LeagueName>{league.krName}</S.LeagueName>
                    </S.DropdownItem>
                ))}
                <S.DropdownItem
                    onClick={() => {
                      setSelectedLeague("응원팀이 없어요.");
                      setSelectedTeam("응원팀이 없어요.");
                      setIsLeagueDropdownOpen(false);
                    }}
                >
                  <BsBan color="#8F8F8F" size={12} style={{ marginRight: "0.7rem" }} />
                  <S.LeagueName>응원팀이 없어요.</S.LeagueName>
                </S.DropdownItem>
              </S.DropdownList>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.InputLabel>응원팀</S.InputLabel>
          <S.Dropdown
              onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
              // disabled={!selectedLeague || selectedLeague === "응원팀이 없어요."}
          >
            <S.DropdownContent>
              {selectedTeam ? (
                  <S.SelectedName>{selectedTeam}</S.SelectedName>
              ) : (
                  <S.DropdownText>선택해 주세요</S.DropdownText>
              )}
              <IoChevronDownOutline size={12} color="#8F8F8F" />
            </S.DropdownContent>
          </S.Dropdown>
          {isTeamDropdownOpen && (
              <S.DropdownList>
                {teamOptions.map((team) => (
                    <S.DropdownItem
                        key={team.id}
                        onClick={() => {
                          setSelectedTeam(team.name);
                          setIsTeamDropdownOpen(false);
                        }}
                    >
                      <S.LeagueName>{team.name}</S.LeagueName>
                    </S.DropdownItem>
                ))}
                <S.NoTeamText>
                  <BsBan size={12} />
                  응원팀이 없어요.
                </S.NoTeamText>
              </S.DropdownList>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.InputLabel>계정관리</S.InputLabel>
          <S.AccountInfoContainer>
            {/* 네이버 또는 카카오 로고 표시 (예시로 네이버 사용) */}
            <S.AccountLogo src={naverLogo} alt="소셜 로그인" />
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
              !nickname ||
              !selectedLeague ||
              !selectedTeam
            }
          >
            수정 완료
          </S.UpdateButton>
        </S.ButtonGroup>

      </S.ProfileSettingsContainer>
  );
};

export default ProfileSettings;