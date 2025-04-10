import styled, { css } from "styled-components";

export const ProfileSettingsContainer = styled.div`
  display: flex;
  width: 31rem;
  //height: 42rem;
  padding: 4rem 8rem 2rem 8rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.75rem;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  /* Center horizontally and vertically */
  margin: auto auto;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const ProfileIcon = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  object-fit: contain;
`;

export const InputLabel = styled.label`
  color: #000;
  font-size: 0.6rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const ErrorMessage = styled.span`
  color: #ff0005;
  font-size: 0.6rem;
  margin-top: 0.25rem;
`;

export const Dropdown = styled.div`
  width: 90%;
  height: 2.2rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #c00c0b;
  }
`;

export const DropdownContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectedImage = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  margin-right: 0.7rem; /* Space between image and text */
`;

export const SelectedName = styled.span`
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 400;
  color: #000;
`;

export const DropdownText = styled.span`
  color: #8f8f8f;
  font-size: 0.7rem;
  text-align: left; /* 텍스트 좌측 정렬 */
  flex: 1; /* 남은 공간을 채워 좌측 정렬 유지 */
`;

export const DropdownList = styled.div`
  width: 15.5rem;
  border: 0.5px solid #e0e0e0;
  border-radius: 0.4rem;
  background-color: #ffffff;
  overflow-y: auto;
  position: absolute;
  //z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 4rem; /* 드롭다운 박스 바로 아래에 위치 */
`;

// DropDownList 안에 들어가는 요소
export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  //justify-content: space-between; /* 좌측: 리그 이미지/팀 이름, 우측: 아이콘 */
  padding: 0.4rem 1rem; /* Vertical padding 0.4rem */
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #dcdcdc; /* Divider color */

  &:hover {
    background-color: #f0f0f0;
  }

  &:last-child {
    border-bottom: none; /* Remove border for the last item */
  }
`;

export const LeagueImage = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  margin-right: 0.7rem; /* Space between image and text */
`;

export const LeagueName = styled.span`
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 400;
  color: #000;
`;

export const NoTeamText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.7rem;
  padding: 0.4rem 1rem;

  svg {
    margin-right: 0.5rem;
  }
`;

export const NaverLogoIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

export const KakaoLogoIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

export const AccountInfoContainer = styled.div`
  width: 90%;
  height: 2.2rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background-color: #f5f5f5; /* 수정 불가능함을 나타내는 배경색 */
`;

export const AccountLogo = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  margin-right: 0.7rem;
`;

export const AccountEmail = styled.span`
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 400;
  color: #676767;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%; // Dropdown과 동일한 너비
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

export const CancelButton = styled.button`
  width: 48%;
  height: 2rem;
  background-color: #F0F0F0;
  color: #676767;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #d0d0d0;
  }
`;

export const UpdateButton = styled.button`
  width: 48%;
  height: 2rem;
  background-color: #c00c0b;
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #a00a09;
  }
  
  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

export const ClearIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #8F8F8F;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    color: #C00C0B;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  align-items: center;
`;

export const InputField = styled.input`
  width: 100%;
  height: 2.2rem;
  padding: 0 2rem 0 1rem;
  border: 1px solid ${props => props.hasError ? '#ff0005' : '#e0e0e0'};
  border-radius: 0.4rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: ${props => props.hasError ? '#ff0005' : '#000000'};
  }
  
  &::placeholder {
    color: #8f8f8f;
    font-size: 0.7rem;
  }
`;


export const ProfileImageContainer = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;c
  margin-top: -2rem;
  margin-bottom: 1rem;
`;

export const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const CameraIcon = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;