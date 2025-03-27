import styled from 'styled-components';
import { FaRegQuestionCircle as HelpCircleIcon, FaChevronDown as ChevronIcon, FaCheck as CheckIcon } from 'react-icons/fa';

// Container
export const SignupContainer = styled.div`
    display: flex;
    width: 31.3125rem;
    padding: 4.6875rem 7.59375rem;
    align-items: center;
    gap: 0.46875rem;
    border-radius: 0.46875rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    flex-direction: column;
`;

// Title
export const SignupTitle = styled.h1`
    align-self: stretch;
    color: #000;
    text-align: center;
    //font-family: Pretendard;
    font-size: 1.3125rem;
    font-weight: 700;
    line-height: 1.6875rem;
    margin-bottom: 1.5rem;
`;

// Social Login Section
export const SocialLoginWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
`;

export const SocialIcon = styled.div`
    display: flex;
    width: 1.125rem;
    height: 1.125rem;
    justify-content: center;
    align-items: center;
`;

export const SocialText = styled.span`
    color: #000;
    //font-family: Pretendard;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.125rem;
`;

// Input Label
export const InputLabel = styled.label`
    color: #000;
    //font-family: Pretendard;
    font-size: 0.65625rem;
    font-weight: 500;
    line-height: 0.75rem;
    margin-bottom: 0.5rem;
`;

// Input Field
export const InputField = styled.input`
    display: flex;
    width: 16.125rem;
    height: 2.25rem;
    padding: 0.5625rem 0.75rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.46875rem;
    border-radius: 0.46875rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    margin-bottom: 0.5rem;
`;

// Error Message
export const ErrorMessage = styled.span`
    color: #FF0005;
    //font-family: Pretendard;
    font-size: 0.5625rem;
    font-weight: 400;
    line-height: 0.75rem;
`;

// Dropdown
export const Dropdown = styled.div`
    display: flex;
    height: 2.25rem;
    padding: 0.5625rem 0.75rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.46875rem;
    align-self: stretch;
    border-radius: 0.46875rem;
    border: 1px solid #DCDCDC;
    margin-bottom: 0.5rem;
`;

export const DropdownContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const DropdownText = styled.span`
    color: #000;
    //font-family: Pretendard;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.125rem;
`;

// Checkbox Section
export const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
`;

export const CheckboxLabel = styled.label`
    color: #000;
    //font-family: Pretendard;
    font-size: 0.65625rem;
    font-weight: 400;
    line-height: 0.75rem;
`;

export const ViewTermsLink = styled.span`
    color: #676767;
    //font-family: Pretendard;
    font-size: 0.5625rem;
    font-weight: 400;
    line-height: 0.75rem;
    text-decoration: underline;
    cursor: pointer;
`;

// Signup Button
export const SignupButton = styled.button`
    display: flex;
    padding: 0.46875rem 0.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.46875rem;
    align-self: stretch;
    border-radius: 0.375rem;
    background: #C00C0B;
    border: none;
    color: #FFF;
    //font-family: Pretendard;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.3125rem;
    cursor: pointer;
`;

// Icons
export const NaverLogoIcon = styled.img`
    width: 1.125rem;
    height: 1.125rem;
`;

export const KakaoLogoIcon = styled.img`
    width: 1.125rem;
    height: 1.125rem;
`;

export const HelpIcon = styled(HelpCircleIcon)`
    width: 0.5625rem;
    height: 0.5625rem;
`;

export const ChevronDownIcon = styled(ChevronIcon)`
    width: 0.84375rem;
    height: 0.84375rem;
    transform: rotate(90deg);
`;

export const CheckmarkIcon = styled(CheckIcon)`
    width: 0.65625rem;
    height: 0.65625rem;
`;