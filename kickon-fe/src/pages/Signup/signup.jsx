import React, { useState } from 'react';
import {
    SignupContainer,
    SignupTitle,
    SocialLoginWrapper,
    SocialIcon,
    SocialText,
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
    KakaoLogoIcon,
    HelpIcon,
    ChevronDownIcon,
    CheckmarkIcon
} from './signup.style.js';
import {League} from "../../mocks/league.js";
import kakaoLogo from "../../assets/kakao.svg";
import naverLogo from "../../assets/naver.svg";

const Signup = () => {
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [selectedLeague, setSelectedLeague] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [isAllAgreed, setIsAllAgreed] = useState(false);

    const leagues = League

    const teams = {
        'K League 1': [
            { id: 1, name: 'Ulsan Hyundai FC' },
            { id: 2, name: 'Jeonbuk Hyundai Motors FC' }
        ],
        'K League 2': [
            { id: 1, name: 'Ansan Greeners FC' },
            { id: 2, name: 'Seoul E-Land FC' }
        ]
    };

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        setNickname(value);

        if (value.length < 2) {
            setNicknameError('닉네임은 최소 2자 이상이어야 합니다.');
        } else {
            setNicknameError('');
        }
    };

    const handleSignup = () => {
        // Validation logic
        if (!nickname || !selectedLeague || !selectedTeam || !isAllAgreed) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        // Signup logic would go here
        console.log('Signup submitted', { nickname, selectedLeague, selectedTeam });
    };

    return (
        <SignupContainer>
            <SignupTitle>회원가입</SignupTitle>

            <SocialLoginWrapper>
                <SocialIcon>
                    <NaverLogoIcon src={naverLogo} alt="네이버 로고"/>
                </SocialIcon>
                <SocialIcon>
                    <KakaoLogoIcon src={kakaoLogo} alt="카카오 로고" />
                </SocialIcon>
                <SocialText>계정으로 가입을 진행하고 있어요.</SocialText>
            </SocialLoginWrapper>

            <InputLabel>닉네임</InputLabel>
            <InputField
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChange={handleNicknameChange}
            />
            {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}

            <InputLabel>
                리그 <HelpIcon />
            </InputLabel>
            <Dropdown>
                <DropdownContent>
                    <DropdownText>
                        {selectedLeague || '리그를 선택해주세요'}
                    </DropdownText>
                    <ChevronDownIcon />
                </DropdownContent>
            </Dropdown>

            <InputLabel>응원팀</InputLabel>
            <Dropdown>
                <DropdownContent>
                    <DropdownText>
                        {selectedTeam || '응원팀을 선택해주세요'}
                    </DropdownText>
                    <ChevronDownIcon />
                </DropdownContent>
            </Dropdown>

            <CheckboxWrapper>
                <CheckmarkIcon />
                <CheckboxLabel>모두 동의</CheckboxLabel>
            </CheckboxWrapper>

            <CheckboxWrapper>
                <CheckmarkIcon />
                <CheckboxLabel>만 14세 이상 가입 동의 (필수)</CheckboxLabel>
            </CheckboxWrapper>

            <CheckboxWrapper>
                <CheckmarkIcon />
                <CheckboxLabel>
                    서비스 이용약관 동의 (필수)
                    <ViewTermsLink>약관 보기</ViewTermsLink>
                </CheckboxLabel>
            </CheckboxWrapper>

            <CheckboxWrapper>
                <CheckmarkIcon />
                <CheckboxLabel>
                    개인정보처리방침 동의 (필수)
                    <ViewTermsLink>약관 보기</ViewTermsLink>
                </CheckboxLabel>
            </CheckboxWrapper>

            <CheckboxWrapper>
                <CheckmarkIcon />
                <CheckboxLabel>마케팅 정보 수신 동의 (선택)</CheckboxLabel>
            </CheckboxWrapper>

            <SignupButton onClick={handleSignup}>
                회원가입
            </SignupButton>
        </SignupContainer>
    );
};

export default Signup;