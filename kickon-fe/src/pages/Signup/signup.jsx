import React, { useState, useEffect } from "react";
import {
  SignupContainer,
  SignupTitle,
  SocialLoginWrapper,
  SocialText,
  InputGroup,
  InputLabel,
  InputField,
  ErrorMessage,
  Dropdown,
  DropdownContent,
  DropdownText,
  CheckboxWrapper,
  CheckboxLabel,
  ViewTermsLink,
  SignupButton,
  NaverLogoIcon,
  StyledRegCheckSquare,
  StyledCheckSquare,
} from "./signup.style";
import { League } from "../../mocks/league";
import naverLogo from "../../assets/naver.svg";
import { FiHelpCircle } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";

const Signup = () => {
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
    <SignupContainer>
      <SignupTitle>회원가입</SignupTitle>

      <SocialLoginWrapper>
        <NaverLogoIcon src={naverLogo} alt="네이버 로고" />
        <SocialText>계정으로 가입을 진행하고 있어요.</SocialText>
      </SocialLoginWrapper>

      <InputGroup>
        <InputLabel>닉네임</InputLabel>
        <InputField
          placeholder="닉네임은 최대 8글자"
          value={nickname}
          onChange={handleNicknameChange}
        />
        {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <InputLabel>
          리그
          <FiHelpCircle color="#999" />
        </InputLabel>
        <Dropdown
          onClick={() => setIsLeagueDropdownOpen(!isLeagueDropdownOpen)}
        >
          <DropdownContent>
            <DropdownText>
              {selectedLeague || "리그를 선택해주세요"}
            </DropdownText>
            <IoChevronDownOutline />
          </DropdownContent>
        </Dropdown>
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
      </InputGroup>

      <InputGroup>
        <InputLabel>응원팀</InputLabel>
        <Dropdown
          onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
          disabled={!selectedLeague}
        >
          <DropdownContent>
            <DropdownText>
              {selectedTeam || "응원팀을 선택해주세요"}
            </DropdownText>
            <IoChevronDownOutline />
          </DropdownContent>
        </Dropdown>
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
      </InputGroup>

      <CheckboxWrapper onClick={handleAllAgreementToggle}>
        {isAllAgreed ? <StyledCheckSquare /> : <StyledRegCheckSquare />}
        <CheckboxLabel>모두 동의</CheckboxLabel>
      </CheckboxWrapper>

      <CheckboxWrapper onClick={() => setIsAgeAgreed(!isAgeAgreed)}>
        {isAgeAgreed ? <StyledCheckSquare /> : <StyledRegCheckSquare />}
        <CheckboxLabel>만 14세 이상 가입 동의 (필수)</CheckboxLabel>
      </CheckboxWrapper>

      <CheckboxWrapper
        onClick={() => setIsServiceTermsAgreed(!isServiceTermsAgreed)}
      >
        {isServiceTermsAgreed ? (
          <StyledCheckSquare />
        ) : (
          <StyledRegCheckSquare />
        )}
        <CheckboxLabel>
          서비스 이용약관 동의 (필수)
          <ViewTermsLink>약관 보기</ViewTermsLink>
        </CheckboxLabel>
      </CheckboxWrapper>

      <CheckboxWrapper
        onClick={() => setIsPrivacyPolicyAgreed(!isPrivacyPolicyAgreed)}
      >
        {isPrivacyPolicyAgreed ? (
          <StyledCheckSquare />
        ) : (
          <StyledRegCheckSquare />
        )}
        <CheckboxLabel>
          개인정보처리방침 동의 (필수)
          <ViewTermsLink>약관 보기</ViewTermsLink>
        </CheckboxLabel>
      </CheckboxWrapper>

      <CheckboxWrapper onClick={() => setIsMarketingAgreed(!isMarketingAgreed)}>
        {isMarketingAgreed ? <StyledCheckSquare /> : <StyledRegCheckSquare />}
        <CheckboxLabel>
          마케팅 정보 수신 동의 (선택) <ViewTermsLink>약관 보기</ViewTermsLink>{" "}
        </CheckboxLabel>
      </CheckboxWrapper>

      <SignupButton
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
      </SignupButton>
    </SignupContainer>
  );
};

export default Signup;
