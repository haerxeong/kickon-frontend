import React, { useState, useEffect } from "react";
import * as S from "./signup.style";
import naverLogo from "../../assets/naver.svg";
import kakaoLogo from "../../assets/kakao.svg";
import { FiHelpCircle } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsBan } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { getLeagues } from "../../apis/domains/common/getLeagues";
import { getTeams } from "../../apis/domains/common/getTeams";

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

  const [leagues, setLeagues] = useState([]);

  const location = useLocation();
  const [isNaverLogin, setIsNaverLogin] = useState(false);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getLeagues();
        setLeagues(data); // Store the fetched leagues in state
        console.log(data); // Log the fetched data
      } catch (error) {
        console.error("Failed to fetch leagues:", error);
      }
    };

    fetchLeagues();
  }, []); // Run only once when the component mounts

  useEffect(() => {
    const fetchTeams = async () => {
      if (selectedLeague) {
        try {
          const leagueId = leagues.find((league) => league.nameKr === selectedLeague)?.pk;
          if (leagueId) {
            const data = await getTeams({ league: leagueId });
            setTeamOptions(data);
          }
        } catch (error) {
          console.error("Failed to fetch teams:", error);
        }
      }
    };
    fetchTeams();
  }, [selectedLeague, leagues]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const provider = queryParams.get("provider").split("?")[0];
    setIsNaverLogin(provider === "naver");
    console.log(provider);
  }, [location.search]);

  useEffect(() => {
    // Update team options when league changes
    if (selectedLeague && selectedLeague !== "응원팀이 없어요.") {
      const teams =
          leagues.find((league) => league.nameKr === selectedLeague)?.teams || [];
      setTeamOptions(teams);
    } else {
      setTeamOptions([]);
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

    if (!value.length) {
      setNicknameError("닉네임을 입력해 주세요.");
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

  const selectedLeagueData = leagues.find(
      (league) => league.nameKr === selectedLeague
  );

  return (
      <S.SignupContainer>
        <S.SignupTitle>회원가입</S.SignupTitle>

        <S.SocialLoginWrapper>
          {isNaverLogin ? (
              <S.NaverLogoIcon src={naverLogo} alt="네이버 로고" />
          ) : (
              <S.KakaoLogoIcon src={kakaoLogo} alt="카카오 로고" />
          )}
          <S.SocialText>계정으로 가입을 진행하고 있어요.</S.SocialText>
        </S.SocialLoginWrapper>

        <S.InputGroup>
          <S.InputLabel>닉네임</S.InputLabel>
          <S.InputField
              placeholder="닉네임은 최대 8글자"
              value={nickname}
              onChange={handleNicknameChange}
              hasError={!!nicknameError}
          />
          {nicknameError && <S.ErrorMessage>{nicknameError}</S.ErrorMessage>}
        </S.InputGroup>

        <S.InputGroup>
          <S.InputLabel>
            리그
            <FiHelpCircle color="#8F8F8F" style={{ marginLeft: "0.25rem", cursor: "pointer" }} />
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
                          alt={selectedLeagueData.nameKr}
                      />
                      <S.SelectedName>{selectedLeagueData.nameKr}</S.SelectedName>
                    </>
                ) : null}
              </S.LeftContent>

              {selectedLeagueData ? (
                  <IoChevronDownOutline size={12} color="#8F8F8F" />
              ) : (
                  <>
                    <S.DropdownText>선택해 주세요</S.DropdownText>
                    <IoChevronDownOutline size={12} color="#8F8F8F" />
                  </>
              )}
            </S.DropdownContent>
          </S.Dropdown>

          {isLeagueDropdownOpen && (
              <S.DropdownList>
                {leagues.map((league) => (
                    <S.DropdownItem
                        key={league.pk}
                        onClick={() => {
                          console.log("선택한 리그:", league.nameKr);
                          setSelectedLeague(league.nameKr);
                          setIsLeagueDropdownOpen(false);
                        }}
                    >
                      <S.LeagueImage src={league.logoUrl} alt={league.nameKr} />
                      <S.LeagueName>{league.nameKr}</S.LeagueName>
                    </S.DropdownItem>
                ))}
                <S.DropdownItem
                    onClick={() => {
                      setSelectedLeague("응원팀이 없어요.");
                      setSelectedTeam("응원팀이 없어요.");
                      setIsLeagueDropdownOpen(false);
                      setIsTeamDropdownOpen(false);
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
          >
            <S.DropdownContent>
              <S.LeftContent>
                {selectedTeam ? (
                    <>
                      <S.SelectedImage
                          src={teamOptions.find((team) => team.nameKr === selectedTeam)?.logoUrl}
                          alt={selectedTeam}
                      />
                      <S.SelectedName>{selectedTeam}</S.SelectedName>
                    </>
                ) : (
                    <S.DropdownText>선택해 주세요</S.DropdownText>
                )}
              </S.LeftContent>
              <IoChevronDownOutline size={12} color="#8F8F8F" />
            </S.DropdownContent>
          </S.Dropdown>

          {isTeamDropdownOpen && (
              <S.DropdownList type="team">
                {teamOptions.map((team) => (
                    <S.DropdownItem
                        key={team.pk}
                        onClick={() => {
                          console.log("선택한 팀:", team.nameKr);
                          setSelectedTeam(team.nameKr);
                          setIsTeamDropdownOpen(false);
                        }}
                    >
                      <S.LeagueImage src={team.logoUrl} alt={team.nameKr} />
                      <S.LeagueName>{team.nameKr}</S.LeagueName>
                    </S.DropdownItem>
                ))}
              </S.DropdownList>
          )}
        </S.InputGroup>

        <S.CheckboxContainer>
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

          <S.CheckboxWrapper
              onClick={() => setIsMarketingAgreed(!isMarketingAgreed)}
          >
            {isMarketingAgreed ? (
                <S.StyledCheckSquare />
            ) : (
                <S.StyledRegCheckSquare />
            )}
            <S.CheckboxLabel>
              마케팅 정보 수신 동의 (선택){" "}
              <S.ViewTermsLink>약관 보기</S.ViewTermsLink>{" "}
            </S.CheckboxLabel>
          </S.CheckboxWrapper>
        </S.CheckboxContainer>

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