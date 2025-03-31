//signup.style.js
import styled, { css } from "styled-components";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";

export const SignupContainer = styled.div`
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
  margin: auto auto 5rem;
`;

export const SignupTitle = styled.h1`
  color: #000;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
`;

export const SocialLoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 5rem;
  margin-top: 1rem;
`;

export const SocialText = styled.span`
  color: #000;
  font-size: 0.7rem;
  margin-left: 0.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const InputLabel = styled.label`
  color: #000;
  font-size: 0.6rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const InputField = styled.input`
  width: 90%;
  height: 2.2rem;
  padding: 0 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.4rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #c00c0b;
  }

  &::placeholder {
    color: #8f8f8f;
    font-size: 0.7rem;
  }

  ${(props) =>
    props.hasError &&
    css`
      border-color: #ff0005;
    `}
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

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 0.7rem;
`;

export const CheckboxLabel = styled.label`
  color: #000;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 0.5rem;
  justify-content: space-between; /* 내부 요소를 양쪽 끝으로 정렬 */
  width: 100%; /* 부모 요소의 너비를 채우도록 설정 */
`;

export const ViewTermsLink = styled.span`
  color: #676767;
  font-size: 0.55rem;
  text-decoration: underline;
  cursor: pointer;
  margin-left: auto;
`;

export const SignupButton = styled.button`
  width: 100%;
  height: 2rem;
  background-color: #c00c0b;
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 3rem;
  margin-bottom: 3rem;

  &:hover {
    background-color: #a00a09;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
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

export const StyledCheckSquare = styled(FaCheckSquare)`
  font-size: 0.7rem; /* 아이콘 크기 조정 */
  color: #c00c0b;
`;

export const StyledRegCheckSquare = styled(FaRegCheckSquare)`
  font-size: 0.7rem; /* 아이콘 크기 조정 */
  color: #999;
`;
