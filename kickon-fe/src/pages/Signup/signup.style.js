import styled from "styled-components";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";

export const SignupContainer = styled.div`
  display: flex;
  width: 28rem;
  height: 42rem;
  padding: 4rem 6rem 2rem 6rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.75rem;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  margin-bottom: 5rem;
`;

export const SignupTitle = styled.h1`
  color: #000;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const SocialLoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 5rem;
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
  height: 2rem;
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
`;

export const ErrorMessage = styled.span`
  color: #ff0005;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const Dropdown = styled.div`
  width: 90%;
  height: 2rem;
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const DropdownText = styled.span`
  color: #333;
  font-size: 0.7rem;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 0.5rem;
`;

export const CheckboxLabel = styled.label`
  color: #333;
  font-size: 0.65rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 0.5rem;
  justify-content: space-between; /* 내부 요소를 양쪽 끝으로 정렬 */
  width: 100%; /* 부모 요소의 너비를 채우도록 설정 */
`;

export const ViewTermsLink = styled.span`
  color: #666;
  font-size: 0.65rem;
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
  margin-top: 4rem;

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
