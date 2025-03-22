import styled from "styled-components";

export const ProfileContainer = styled.div`
    width: 20.125rem; /* 322px */
    height: 9rem; /* 144px */
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid #DCDCDC; /* 직접 색상 적용 */
    background: #FFF; /* 직접 색상 적용 */
    position: relative;
`;

export const LogoImage = styled.img`
    width: 2.5rem;
    height: 2rem;
    flex-shrink: 0;

    position: absolute;
    top: 1.8125rem;  /* 29px -> rem 변환 */
    left: 8.8125rem;  /* 141px -> rem 변환 */
`;


export const StyledButton = styled.button`
    display: inline-flex;
    height: 2.375rem; /* 38px */
    padding: 0.625rem 1.125rem; /* 10px 18px */
    justify-content: center;
    align-items: center;
    gap: 0.625rem; /* 10px */
    flex-shrink: 0;

    border-radius: 1.25rem; /* 20px */
    background: #C00C0B; /* 직접 색상 적용 */
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    color: white; /* 글자색 추가 */
    font-size: 1rem; /* 16px */
    font-weight: bold;
    border: none;
    cursor: pointer;

    position: absolute;
    left: 4.344rem; /* 69.5px */
    right: 4.344rem; /* 69.5px */
    bottom: 1.813rem; /* 29px */
`;