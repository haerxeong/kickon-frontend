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
    font-size: 0.7rem;
    font-weight: 400;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 3.475rem; /* 4.344rem * 0.8 */
    right: 3.475rem; /* 4.344rem * 0.8 */
    bottom: 1.45rem; /* 1.813rem * 0.8 */
`;
export const CardContainer = styled.div`
    width: 15rem;
    height: 6.7rem;
    flex-shrink: 0;
    border-radius: 0.47rem;
    border: 0.05rem solid #DCDCDC;
    background: #FFF;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: 4.3rem;
        left: 0;
        width: 100%;
        height: 0.05rem;
        background-color: #F0F0F0;
    }
`;

export const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    gap: 0.56rem;
`;

export const ProfileImage = styled.img`
    width: 2.8rem;
    height: 2.8rem;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: cover;
`;

export const MyTeam = styled.img`
    display: flex;
    width: 0.7rem;
    justify-content: center;
    align-items: center;
`

export const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
`;

export const Username = styled.div`
    display: inline-flex; 
    align-items: center;
    gap: 0.2rem;
    color: #000;
    font-family: Pretendard;
    font-size: 0.94rem;
    font-weight: 600;
    line-height: 1.13rem;
    margin: 0;
`;

export const UsernameSuffix = styled.span`
  font-weight: 400;
`;

export const ProfileEdit = styled.button`
    display: flex;
    align-items: center;
    gap: 0.1rem; /* 글자와 아이콘 사이 여백 */
    color: #676767;
    font-family: Pretendard;
    font-size: 0.47rem;
    font-weight: 400;
    line-height: 0.75rem;
    text-decoration: underline;
    background: transparent;
    border: none;
    text-align: left;
`;

export const UserStats = styled.div`
    display: flex;
    width: 15rem;
    height: 2.3rem;
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
        width: 0.05rem;
        height: 2.3rem;
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
`;

export const StatTitle = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.47rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.75rem;
    margin-top: 0.36rem;
`;

export const handleIconClick = () => {
    alert("아이콘이 클릭되었습니다");
};

export const StatValue = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.7rem;
    font-style: normal;
    font-weight: 600;
    line-height: 0.75rem;
    margin-bottom: 0.36rem;
`;

export const LogoutButton = styled.button`
    color: #676767;
    text-align: right;
    font-family: Pretendard, sans-serif;
    font-size: 0.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2rem;
    text-decoration-line: underline;
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0.75rem;
    right: 1.2rem;
`;
