import styled from "styled-components";

export const ProfileSettingsContainer = styled.div`
  display: flex;
  width: 31rem;
  padding: 5.2rem 7rem 3rem 7rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.4375rem;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  /* Center horizontally and vertically */
  margin: auto auto;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.35rem;
`;

export const InputLabel = styled.label`
    color: #000;
    font-size: 0.6rem;
    font-weight: 500;
    margin-bottom: 0.5rem;

    svg {
        margin-left: 0.3rem;
        cursor: pointer;
        color: #8F8F8F;
        width: 0.5rem;
        height: 0.5rem;
    }
`;

export const ManageTitle = styled.label`
  color: #000;
  font-size: 0.6rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
    margin-top: 2.55rem;
`;

export const ErrorMessage = styled.span`
  color: #ff0005;
  font-size: 0.6rem;
  margin-top: 0.25rem;
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
  font-size: 0.68rem;
  font-style: normal;
  font-weight: 400;
  color: #000;
`;

export const AccountInfoContainer = styled.div`
  width: 100%;
  height: 2.2rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.35rem;
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
  font-size: 0.68rem;
  font-style: normal;
  font-weight: 400;
  color: #676767;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; 
  margin-top: 3rem;
`;

export const CancelButton = styled.button`
  width: 48%;
  height: 2rem;
  background-color: #F0F0F0;
  color: #676767;
  border: none;
  border-radius: 0.35rem;
  font-size: 0.7rem;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

export const UpdateButton = styled.button`
  width: 48%;
  height: 2rem;
  background-color: #c00c0b;
  color: #ffffff;
  border: none;
  border-radius: 0.35rem;
  font-size: 0.7rem;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:disabled {
    background-color: #8F8F8F;
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
  width: 100%;
  display: flex;
  align-items: center;
`;

export const InputField = styled.input`
  width: 100%;
  height: 2.2rem;
  padding: 0 2rem 0 1rem;
  border: 1px solid ${props => props.hasError ? '#ff0005' : '#e0e0e0'};
  border-radius: 0.35rem;
  font-size: 0.68rem;
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
  width: 3.2rem;
  height: 3.2rem;
  margin-bottom: 1.35rem;
`;

export const ProfileImage = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const CameraIcon = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;