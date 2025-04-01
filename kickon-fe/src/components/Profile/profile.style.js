import styled from "styled-components";

export const ProfileContainer = styled.div`
    width: 15rem; /* 322px * 0.8 */
    height: 7.2rem; /* 144px * 0.8 */
    flex-shrink: 0;
    border-radius: 0.5rem; /* 0.625rem * 0.8 */
    border: 0.05rem solid #DCDCDC; /* 0.0625rem * 0.8 */
    background: #FFF;
    position: relative;
`;

export const LogoImage = styled.img`
    width: 2rem; /* 2.5rem * 0.8 */
    height: 1.6rem; /* 2rem * 0.8 */
    flex-shrink: 0;
    position: absolute;
    top: 1.45rem;  /* 1.8125rem * 0.8 */
    left: 7.05rem;  /* 8.8125rem * 0.8 */
`;

export const StyledButton = styled.button`
    display: inline-flex;
    height: 1.9rem; /* 2.375rem * 0.8 */
    padding: 0.5rem 0.9rem; /* 0.625rem 1.125rem * 0.8 */
    justify-content: center;
    align-items: center;
    gap: 0.5rem; /* 0.625rem * 0.8 */
    flex-shrink: 0;
    border-radius: 1rem; /* 1.25rem * 0.8 */
    background: #C00C0B;
    box-shadow: 0rem 0.2rem 0.4rem 0rem rgba(0, 0, 0, 0.2);
    color: white;
    font-size: 0.8rem; /* 1rem * 0.8 */
    font-weight: bold;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 3.475rem; /* 4.344rem * 0.8 */
    right: 3.475rem; /* 4.344rem * 0.8 */
    bottom: 1.45rem; /* 1.813rem * 0.8 */
`;

export const CardContainer = styled.div`
    width: 16.1rem; /* 322px * 0.8 */
    height: 7.2rem; /* 144px * 0.8 */
    flex-shrink: 0;
    border-radius: 0.5rem; /* 0.625rem * 0.8 */
    border: 0.05rem solid #DCDCDC;
    background: #FFF;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: 4.6rem; /* 5.75rem * 0.8 */
        left: 0;
        width: 100%;
        height: 0.05rem; /* 0.0625rem * 0.8 */
        background-color: #F0F0F0;
    }
`;

export const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 0.8rem; /* 1rem * 0.8 */
    left: 0.8rem; /* 1rem * 0.8 */
    gap: 0.6rem; /* 0.75rem * 0.8 */
`;

export const ProfileImage = styled.img`
    width: 3rem; /* 3.75rem * 0.8 */
    height: 3rem; /* 3.75rem * 0.8 */
    flex-shrink: 0;
`;

export const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.16rem; /* 0.2rem * 0.8 */
`;

export const Username = styled.p`
    color: #000;
    font-family: Pretendard;
    font-size: 1rem; /* 1.25rem * 0.8 */
    font-weight: 600;
    line-height: 1.2rem; /* 1.5rem * 0.8 */
    margin: 0;
`;

export const ProfileEdit = styled.button`
    color: #676767;
    font-family: Pretendard;
    font-size: 0.5rem; /* 0.625rem * 0.8 */
    font-weight: 400;
    line-height: 0.8rem; /* 1rem * 0.8 */
    text-decoration: underline;
    background: transparent;
    border: none;
    text-align: left;
`;

export const UserStats = styled.div`
    display: flex;
    width: 16.1rem; /* 322px * 0.8 */
    height: 2.6rem; /* 3.25rem * 0.8 */
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    position: absolute;
    bottom: 0;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 0.05rem; /* 0.0625rem * 0.8 */
        height: 2.6rem; /* 3.25rem * 0.8 */
        background-color: #F0F0F0;
        transform: translateX(-50%);
    }
`;

export const StatBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    position: relative;
    height: 100%;
    padding: 0.45rem 0; /* 0.5625rem * 0.8 */
`;

export const StatTitle = styled.p`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.5rem; /* 0.625rem * 0.8 */
    font-style: normal;
    font-weight: 400;
    line-height: 0.8rem; /* 1rem * 0.8 */
    position: absolute;
    top: 0.45rem; /* 0.5625rem * 0.8 */
`;

export const Icon = styled.img`
    width: 0.6rem; /* 0.75rem * 0.8 */
    height: 0.6rem; /* 0.75rem * 0.8 */
    margin-left: 0.2rem; /* 0.25rem * 0.8 */
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top:0.1rem; /* 0.125rem * 0.8 */
`;

export const handleIconClick = () => {
    alert("아이콘이 클릭되었습니다");
};

export const StatValue = styled.p`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem; /* 0.9375rem * 0.8 */
    font-style: normal;
    font-weight: 600;
    line-height: 0.8rem; /* 1rem * 0.8 */
    position: absolute;
    bottom: 0;
`;

export const LogoutButton = styled.button`
    color: #676767;
    text-align: right;
    font-family: Pretendard, sans-serif;
    font-size: 0.8rem; /* 10px * 0.8 */
    font-style: normal;
    font-weight: 400;
    line-height: 1.28rem; /* 16px * 0.8 */
    text-decoration-line: underline;
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0.8rem; /* 1rem * 0.8 */
    right: 1.3rem; /* 1.625rem * 0.8 */
`;