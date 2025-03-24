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

export const CardContainer = styled.div`
    width: 20.125rem; /* 322px */
    height: 9rem; /* 144px */
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid #DCDCDC; /* 직접 색상 적용 */
    background: #FFF; /* 직접 색상 적용 */
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: 5.75rem; /* 위에서 92px */
        left: 0;
        width: 100%;
        height: 0.0625rem;
        background-color: #F0F0F0; /* var(--Black-black_200) */
    }
`;
export const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 1rem;
    left: 1rem;
    gap: 0.75rem; /* 프로필 사진과 닉네임 사이 간격 */
`;

export const ProfileImage = styled.img`
    width: 3.75rem;
    height: 3.75rem;
    flex-shrink: 0;
`;

export const UserDetails = styled.div`
    display: flex;
    flex-direction: column; /* 닉네임과 프로필 설정을 세로 정렬 */
    gap: 0.2rem; /* 닉네임과 프로필 설정 사이 간격 */
`;

export const Username = styled.p`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
`;

export const ProfileEdit = styled.button`
    color: #676767;
    font-family: Pretendard;
    font-size: 0.625rem;
    font-weight: 400;
    line-height: 1rem;
    text-decoration: underline;
    background: transparent;
    border: none;
    text-align: left;
`;
export const UserStats = styled.div`
    display: flex;
    width: 322px;
    height: 52px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; /* ✅ 세로 가운데 정렬 */
    flex-shrink: 0;
    position: absolute;
    bottom: 0;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 0.0625rem;
        height: 3.25rem;
        background-color: #F0F0F0; /* var(--Black-black_200) */
        transform: translateX(-50%);
    }
`;

export const StatBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center; /* ✅ 위아래 간격 균등하게 */
    position: relative;
    height: 100%; /* ✅ 부모 요소(UserStats)의 높이를 채우도록 설정 */
    padding: 9px 0;
    
`;
export const StatTitle = styled.p`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem; /* 160% */
    position: absolute;
    top: 9px;
`;

export const StatValue = styled.p`
    color: #000;
    text-align: center;
    /* Body/body4_Pre_sb_15px */
    font-family: Pretendard;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1rem; /* 106.667% */
    position: absolute;
    bottom: 0;
`;

export const LogoutButton = styled.button`
    color: #676767;
    text-align: right;

    /* Button/btn6_Pre_r_10px */
    font-family: Pretendard, sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 160% */

    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;

    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1.625rem;
`;