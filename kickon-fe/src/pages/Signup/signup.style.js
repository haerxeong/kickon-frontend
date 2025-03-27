import styled from 'styled-components';

export const SignupContainer = styled.div`
    display: flex;
    width: 28rem;
    height: 42rem;
    padding: 5rem 6rem 2rem 6rem;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;
    border: 1px solid #E0E0E0;
    background: #FFFFFF;
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
    margin-top: 1rem;
    margin-bottom: 2rem;
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
    font-size: 0.7rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
`;

export const InputField = styled.input`
    width: 90%;
    height: 2rem;
    padding: 0 1rem;
    border: 1px solid #E0E0E0;
    border-radius: 0.4rem;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
        border-color: #C00C0B;
    }

    &::placeholder {
        color: #8F8F8F;
    }
`;

export const ErrorMessage = styled.span`
    color: #FF0005;
    font-size: 0.75rem;
    margin-top: 0.25rem;
`;

export const Dropdown = styled.div`
    width: 90%;
    height: 2rem;
    border: 1px solid #E0E0E0;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover {
        border-color: #C00C0B;
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
    align-items: flex-start;
    justify-content: flex-start;
    cursor: pointer;
`;

export const CheckboxLabel = styled.label`
    color: #333;
    font-size: 0.65rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
    margin-top: 0.5rem;
    justify-content: flex-start;
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
    height: 1.8rem;
    background-color: #C00C0B;
    color: #FFFFFF;
    border: none;
    border-radius: 0.25rem;
    font-size: 0.7rem;
    font-weight: 400;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: 1rem;

    &:hover {
        background-color: #A00A09;
    }

    &:disabled {
        background-color: #E0E0E0;
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