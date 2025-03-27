import React, { useState, useEffect } from "react";
import * as S from "./signup.style";
import { League } from "../../mocks/league";
import naverLogo from "../../assets/naver.svg";
import { FiHelpCircle } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";

const Signup = () => {
  // const [values, setValues] = useState({
  //   nickname: "",
  //   selectedLeague: "",
  //   selectedTeam: "",
  // });

  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamOptions, setTeamOptions] = useState([]);
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);

  // Checkbox states
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [isAgeAgreed, setIsAgeAgreed] = useState(false);
  const [isServiceTermsAgreed, setIsServiceTermsAgreed] = useState(false);
  const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] = useState(false);
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(false);

  const leagues = League;

  useEffect(() => {
    // Update team options when league changes
    if (selectedLeague) {
      const teams =
        leagues.find((league) => league.name === selectedLeague)?.teams || [];
      setTeamOptions(teams);
    }
  }, [selectedLeague, leagues]);

  useEffect(() => {
    // Check if all required checkboxes are checked
    const requiredAgreements =
      isAgeAgreed && isServiceTermsAgreed && isPrivacyPolicyAgreed;
    const isFormValid =
      nickname.length >= 2 &&
      selectedLeague &&
      selectedTeam &&
      requiredAgreements;
  }, [
    nickname,
    selectedLeague,
    selectedTeam,
    isAgeAgreed,
    isServiceTermsAgreed,
    isPrivacyPolicyAgreed,
  ]);

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    if (value.length < 2) {
      setNicknameError("닉네임은 최소 2자 이상이어야 합니다.");
    } else {
      setNicknameError("");
    }
  };

  const handleAllAgreementToggle = () => {
    const newState = !isAllAgreed;
    setIsAllAgreed(newState);
    setIsAgeAgreed(newState);
    setIsServiceTermsAgreed(newState);
    setIsPrivacyPolicyAgreed(newState);
    setIsMarketingAgreed(newState);
  };

  const handleSignup = () => {
    if (!nickname || !selectedLeague || !selectedTeam) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (!isAgeAgreed || !isServiceTermsAgreed || !isPrivacyPolicyAgreed) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    console.log("Signup submitted", {
      nickname,
      selectedLeague,
      selectedTeam,
      marketingAgreed: isMarketingAgreed,
    });
  };

  return (
    <S.SignupContainer>
      <S.SignupTitle>회원가입</S.SignupTitle>

      <S.SocialLoginWrapper>
        <S.NaverLogoIcon src={naverLogo} alt="네이버 로고" />
        <S.SocialText>계정으로 가입을 진행하고 있어요.</S.SocialText>
      </S.SocialLoginWrapper>

      <S.InputGroup>
        <S.InputLabel>닉네임</S.InputLabel>
        <S.InputField
          placeholder="닉네임은 최대 8글자"
          value={nickname}
          onChange={handleNicknameChange}
        />
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
            <S.DropdownText>
              {selectedLeague || "선택해 주세요"}
            </S.DropdownText>
            <IoChevronDownOutline size={12} color="#8F8F8F"/>
          </S.DropdownContent>
        </S.Dropdown>
        {isLeagueDropdownOpen && (
          <div>
            {leagues.map((league) => (
              <div
                key={league.id}
                onClick={() => {
                  setSelectedLeague(league.name);
                  setIsLeagueDropdownOpen(false);
                }}
              >
                {league.name}
              </div>
            ))}
          </div>
        )}
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>응원팀</S.InputLabel>
        <S.Dropdown
          onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
          disabled={!selectedLeague}
        >
          <S.DropdownContent>
            <S.DropdownText>
              {selectedTeam || "선택해 주세요"}
            </S.DropdownText>
            <IoChevronDownOutline size={12} color="#8F8F8F"/>
          </S.DropdownContent>
        </S.Dropdown>
        {isTeamDropdownOpen && (
          <div>
            {teamOptions.map((team) => (
              <div
                key={team.id}
                onClick={() => {
                  setSelectedTeam(team.name);
                  setIsTeamDropdownOpen(false);
                }}
              >
                {team.name}
              </div>
            ))}
          </div>
        )}
      </S.InputGroup>

      <S.CheckboxWrapper onClick={handleAllAgreementToggle}>
        {isAllAgreed ? <S.StyledCheckSquare /> : <S.StyledRegCheckSquare />}
        <S.CheckboxLabel>모두 동의</S.CheckboxLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper onClick={() => setIsAgeAgreed(!isAgeAgreed)}>
        {isAgeAgreed ? <S.StyledCheckSquare /> : <S.StyledRegCheckSquare />}
        <S.CheckboxLabel>만 14세 이상 가입 동의 (필수)</S.CheckboxLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper
        onClick={() => setIsServiceTermsAgreed(!isServiceTermsAgreed)}
      >
        {isServiceTermsAgreed ? (
          <S.StyledCheckSquare />
        ) : (
          <S.StyledRegCheckSquare />
        )}
        <S.CheckboxLabel>
          서비스 이용약관 동의 (필수)
          <S.ViewTermsLink>약관 보기</S.ViewTermsLink>
        </S.CheckboxLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper
        onClick={() => setIsPrivacyPolicyAgreed(!isPrivacyPolicyAgreed)}
      >
        {isPrivacyPolicyAgreed ? (
          <S.StyledCheckSquare />
        ) : (
          <S.StyledRegCheckSquare />
        )}
        <S.CheckboxLabel>
          개인정보처리방침 동의 (필수)
          <S.ViewTermsLink>약관 보기</S.ViewTermsLink>
        </S.CheckboxLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper onClick={() => setIsMarketingAgreed(!isMarketingAgreed)}>
        {isMarketingAgreed ? <S.StyledCheckSquare /> : <S.StyledRegCheckSquare />}
        <S.CheckboxLabel>
          마케팅 정보 수신 동의 (선택) <S.ViewTermsLink>약관 보기</S.ViewTermsLink>{" "}
        </S.CheckboxLabel>
      </S.CheckboxWrapper>

      <S.SignupButton
        onClick={handleSignup}
        disabled={
          !nickname ||
          !selectedLeague ||
          !selectedTeam ||
          !isAgeAgreed ||
          !isServiceTermsAgreed ||
          !isPrivacyPolicyAgreed
        }
      >
        회원가입
      </S.SignupButton>
    </S.SignupContainer>
  );
};

export default Signup;
