import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa6";

export const ProfileContainer = styled.div`
    width: 14rem; /* 322px */
    height: 7rem; /* 144px */
    flex-shrink: 0;
    border-radius: 0.4rem;
    border: 0.0625rem solid #DCDCDC; /* 직접 색상 적용 */
    background: #FFF; /* 직접 색상 적용 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center ;
    position: relative;
`;

export const LogoImage = styled.img`
    width: 1.9rem;
    height: 2rem;
    flex-shrink: 0;

    position: absolute;
    top: 1rem;  /* 29px -> rem 변환 */
`;


export const StyledButton = styled.button`
    display: inline-flex;
    height: 1.7rem; /* 38px */
    width: 8rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    border-radius: 0.8rem; /* 20px */
    background: #C00C0B; /* 직접 색상 적용 */
    box-shadow: 0rem 0.25rem 0.5rem 0rem rgba(0, 0, 0, 0.2);
    color: white; /* 글자색 추가 */
    font-size: 0.8rem; /* 16px */
    font-weight: 400;
    border: none;
    cursor: pointer;

    position: absolute;
    margin-top: 2rem; /* 16px */
`;

export const CardContainer = styled.div`
    width: 20.125rem; /* 322px */
    height: 9rem; /* 144px */
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 0.0625rem solid #DCDCDC; /* 직접 색상 적용 */
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
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.5rem;
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
    width: 20.125rem;
    height: 3.25rem;
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
    padding: 0.5625rem 0;
    
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
    top: 0.5625rem;
`;

export const Icon = styled.img`
    width: 0.75rem;
    height: 0.75rem;
    margin-left: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top:0.125rem;
`;

export const handleIconClick = () => {
    alert("아이콘이 클릭되었습니다!"); // 클릭 시 동작 예시 (원하는 동작으로 변경)
};

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

export const RightArrowIcon = styled(FaAngleRight)`
    font-size: 0.75rem;
    position: absolute;
    right: 1rem;
    top: 50%;
`;