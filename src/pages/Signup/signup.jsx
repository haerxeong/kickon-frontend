import React, { useState, useEffect, useContext } from "react";
import * as S from "./signup.style";
import naverLogo from "../../assets/naver.svg";
import kakaoLogo from "../../assets/kakao.svg";
import { FiHelpCircle } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsBan } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { getLeagues } from "../../apis/domains/common/getLeagues";
import { getTeams } from "../../apis/domains/common/getTeams";
import { updatePrivacyAgreement } from "../../apis/domains/auth/updatePrivacyAgreement";
import { updateUserInfo } from "../../apis/domains/auth/updateUserInfo";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useLeagueTeamStore } from '../../store/useLeagueTeamStore';
import { fetchUserInfo } from "../../apis/domains/auth/fetchUserInfo";
import axiosInstance from "../../apis/axios-instance";

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [teamOptions, setTeamOptions] = useState([]);
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [isAgeAgreed, setIsAgeAgreed] = useState(false);
  const [isServiceTermsAgreed, setIsServiceTermsAgreed] = useState(false);
  const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] = useState(false);
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(false);
  const [leagues, setLeagues] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [isNaverLogin, setIsNaverLogin] = useState(false);
  const { login } = useContext(AuthContext);
  const { selectedLeague, setSelectedLeague, selectedTeam, setSelectedTeam } = useLeagueTeamStore();

  useEffect(() => {
    let queryStr = location.search.includes("?accessToken=")
        ? location.search.replace("?accessToken=", "&accessToken=")
        : location.search;

    const queryParams = new URLSearchParams(queryStr);
    const provider = queryParams.get("provider");
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");

    if (provider) {
      setIsNaverLogin(provider === "naver");
    }

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      (async () => {
        try {
          const user = await fetchUserInfo();
          if (user?.nickname && user?.privacyAgreedAt) {
            login(user, { accessToken, refreshToken });
            window.history.replaceState(null, "", "/"); // 쿼리 제거
            navigate("/", { replace: true });
          }
        } catch (err) {
          console.error("자동 로그인 실패:", err);
        }
      })();
    }
  }, [location.search]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getLeagues();
        setLeagues(data);
      } catch (error) {
        console.error("Failed to fetch leagues:", error);
      }
    };
    fetchLeagues();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      if (selectedLeague?.pk) {
        try {
          const data = await getTeams({ league: selectedLeague.pk });
          setTeamOptions(data);
        } catch (error) {
          console.error("Failed to fetch teams:", error);
        }
      }
    };
    fetchTeams();
  }, [selectedLeague]);

  useEffect(() => {
    if (selectedLeague?.pk && selectedLeague?.nameKr !== "응원팀이 없어요.") {
      const teams = leagues.find((l) => l.nameKr === selectedLeague.nameKr)?.teams || [];
      setTeamOptions(teams);
    } else {
      setTeamOptions([]);
    }
  }, [selectedLeague, leagues]);

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    if (value.length > 8) {
      setNicknameError("닉네임은 최대 8글자까지 입력할 수 있어요.");
    } else if (!value.length) {
      setNicknameError("닉네임을 입력해 주세요.");
    } else {
      setNicknameError("");
    }
    if (value.length <= 8) setNickname(value);
  };

  const handleAllAgreementToggle = () => {
    const newState = !isAllAgreed;
    setIsAllAgreed(newState);
    setIsAgeAgreed(newState);
    setIsServiceTermsAgreed(newState);
    setIsPrivacyPolicyAgreed(newState);
    setIsMarketingAgreed(newState);
  };

  const handleSignup = async () => {
    if (!nickname || !selectedLeague.nameKr || !selectedTeam.nameKr) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }
    if (!isAgeAgreed || !isServiceTermsAgreed || !isPrivacyPolicyAgreed) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    try {
      const privacyAgreedAt = new Date().toISOString().split('.')[0] + "Z";
      const marketingAgreedAt = isMarketingAgreed ? privacyAgreedAt : null;

      await updatePrivacyAgreement({ privacyAgreedAt, marketingAgreedAt });

      await updateUserInfo({
        nickname,
        team: selectedTeam.nameKr === "응원팀이 없어요." ? null : selectedTeam.pk,
        profileImageUrl: "https://ssl.pstatic.net/static/pwe/address/img_profile.png"
      });

      await new Promise(resolve => setTimeout(resolve, 300));

      // refreshToken으로 새 accessToken 요청
      const queryStr = location.search.includes("?accessToken=")
          ? location.search.replace("?accessToken=", "&accessToken=")
          : location.search;
      const queryParams = new URLSearchParams(queryStr);
      const refreshToken = queryParams.get("refreshToken");

      const res = await axiosInstance.post("/auth/refresh", { refreshToken });
      const newAccessToken = res?.data?.accessToken;
      const newRefreshToken = res?.data?.refreshToken;

      if (!newAccessToken || !newRefreshToken) {
        throw new Error("토큰 재발급 실패: 응답에 토큰 없음");
      }

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      console.log("새 액세스 토큰", newAccessToken);
      console.log("새 리프레시 토큰", newRefreshToken);

      const user = await fetchUserInfo();

      login(user, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });

      alert("회원가입 성공!");
      navigate("/");
    } catch (error) {
      console.error("회원가입 중 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

    const selectedLeagueData = leagues.find(
      (league) => league.nameKr === selectedLeague?.nameKr
  );

  const toggleLeagueDropdown = () => {
    setIsLeagueDropdownOpen(!isLeagueDropdownOpen);
    setIsTeamDropdownOpen(false);
  };

  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
    setIsLeagueDropdownOpen(false);
  };

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
          <S.Dropdown onClick={toggleLeagueDropdown}>
            <S.DropdownContent>
              <S.LeftContent>
                {selectedLeague?.nameKr === "응원팀이 없어요." ? (
                    <>
                      <BsBan color="#8F8F8F" size={12} style={{ marginRight: "0.7rem" }} />
                      <S.SelectedName>응원팀이 없어요.</S.SelectedName>
                    </>
                ) : selectedLeagueData ? (
                    <>
                      <S.SelectedImage
                          src={selectedLeagueData.logoUrl}
                          alt={selectedLeagueData.nameKr}
                      />
                      <S.SelectedName>{selectedLeagueData.nameKr}</S.SelectedName>
                    </>
                ) : (
                    <S.DropdownText>선택해 주세요</S.DropdownText>
                )}
              </S.LeftContent>
              <IoChevronDownOutline size={12} color="#8F8F8F" />
            </S.DropdownContent>
          </S.Dropdown>

          {isLeagueDropdownOpen && (
              <S.DropdownList>
                {leagues.map((league) => (
                    <S.DropdownItem
                        key={league.pk}
                        onClick={() => {
                          setSelectedLeague({ pk: league.pk, nameKr: league.nameKr });
                          setSelectedTeam({ pk: null, nameKr: null, leaguePk: null });
                          setIsLeagueDropdownOpen(false);
                        }}
                    >
                      <S.LeagueImage src={league.logoUrl} alt={league.nameKr} />
                      <S.LeagueName>{league.nameKr}</S.LeagueName>
                    </S.DropdownItem>
                ))}
                <S.DropdownItem
                    onClick={() => {
                      setSelectedLeague({ pk: 0, nameKr: "응원팀이 없어요."});
                      setSelectedTeam({ pk: 0, nameKr: "응원팀이 없어요.", leaguePk: 0 });
                      setIsLeagueDropdownOpen(false);
                      setIsTeamDropdownOpen(false);
                    }}
                >
                  <BsBan color="#8F8F8F" size={12} style={{ marginRight: "0.7rem" }} />
                  <S.LeagueName>응원팀이 없어요.</S.LeagueName>
                </S.DropdownItem>
              </S.DropdownList>
          )}
        </S.InputGroup>... <S.InputGroup>
        <S.InputLabel>응원팀</S.InputLabel>
        <S.Dropdown onClick={toggleTeamDropdown}>
          <S.DropdownContent>
            <S.LeftContent>
              {selectedTeam?.nameKr === "응원팀이 없어요." ? (
                  <>
                    <BsBan color="#8F8F8F" size={12} style={{ marginRight: "0.7rem" }} />
                    <S.SelectedName>응원팀이 없어요.</S.SelectedName>
                  </>
              ) : selectedTeam?.pk ? (
                  <>
                    <S.SelectedImage
                        src={teamOptions.find((team) => team.nameKr === selectedTeam.nameKr)?.logoUrl}
                        alt={selectedTeam.nameKr}
                    />
                    <S.SelectedName>{selectedTeam.nameKr}</S.SelectedName>
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
                        setSelectedTeam({ pk: team.pk, nameKr: team.nameKr, leaguePk: team.leaguePk });
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
              <S.ViewTermsLink
                  as="a"
                  href="https://lunar-surf-03d.notion.site/20d71dde430d8035b15ae8d2bfd745dd?source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
              >
                약관 보기
              </S.ViewTermsLink>
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
              <S.ViewTermsLink as="a"
                               href="https://lunar-surf-03d.notion.site/20d71dde430d8035b15ae8d2bfd745dd?source=copy_link"
                               target="_blank"
                               rel="noopener noreferrer"
                               onClick={(e) => e.stopPropagation()}
              >약관 보기</S.ViewTermsLink>
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
              <S.ViewTermsLink as="a"
                               href="https://lunar-surf-03d.notion.site/20d71dde430d8035b15ae8d2bfd745dd?source=copy_link"
                               target="_blank"
                               rel="noopener noreferrer"
                               onClick={(e) => e.stopPropagation()}
              >약관 보기</S.ViewTermsLink>{" "}
            </S.CheckboxLabel>
          </S.CheckboxWrapper>
        </S.CheckboxContainer>

        <S.SignupButton
            onClick={handleSignup}
            disabled={
                !nickname ||
                selectedTeam.pk === undefined ||
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
