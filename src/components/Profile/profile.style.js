import styled from "styled-components";

export const ProfileContainer = styled.div`
    width: 100%;
    max-width: 15rem; /* 최대 크기 지정 (240px) */
    height: 7.2rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    border: 0.05rem solid #DCDCDC;
    background: #FFF;
    position: relative;
    box-sizing: border-box;
`;

export const LogoImage = styled.img`
    width: 13.33%;   /* 2rem / 15rem = 0.1333 (13.33%) */
    height: auto;    /* 비율 유지 */
    position: absolute;
    top: 20.14%;     /* 1.45rem / 7.2rem = 0.2014 (20.14%) */
    left: 47%;       /* 7.05rem / 15rem = 0.47 (47%) */
    object-fit: contain;
`;

export const StyledButton = styled.button`
    display: inline-flex;
    height: 26.4%; /* 1.9rem / 7.2rem */
    padding: 6.9% 12%; /* 0.5rem 0.9rem 비율로 계산해서 대략 */
    justify-content: center;
    align-items: center;
    gap: 6.6%; /* 0.5rem / 7.5rem (button height) 근사치 */
    border-radius: 13.33%; /* 1rem / 7.5rem */
    background: #C00C0B;
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
    color: white;
    font-size: 9.7%; /* 0.7rem / 7.2rem */
    font-weight: 400;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 23.17%; /* 3.475rem / 15rem */
    right: 23.17%;
    bottom: 20.14%; /* 1.45rem / 7.2rem */
`;

export const CardContainer = styled.div`
    width: 100%;
    max-width: 15rem;
    height: 6.7rem;
    flex-shrink: 0;
    border-radius: 0.47rem;
    border: 0.05rem solid #DCDCDC;
    background: #FFF;
    position: relative;
    box-sizing: border-box;

    &::after {
        content: "";
        position: absolute;
        top: 64.17%; /* 4.3rem / 6.7rem */
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
    top: 10.4%;  /* 0.75rem / 7.2rem */
    left: 5%;
    gap: 3.7%;  /* 0.56rem / 15rem */
`;

export const ProfileImage = styled.img`
    width: 16.67%;  /* 2.5rem / 15rem */
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: cover;
`;

export const MyTeam = styled.img`
    display: flex;
    width: 0.7rem;
    justify-content: center;
    align-items: center;
`;

export const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1%;
`;

export const Username = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    color: #000;
    font-family: Pretendard;
    font-size: 0.8rem;
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
    color: #676767;
    font-family: Pretendard;
    font-size: 2%; /* 0.47rem / 15rem */
    font-weight: 400;
    line-height: 0.75rem;
    text-decoration: underline;
    background: transparent;
    border: none;
    text-align: left;
    padding: 0;
    
`;

export const UserStats = styled.div`
    display: flex;
    width: 100%;
    max-width: 15rem;
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
    //flex: 1;
    //display: flex;
    //flex-direction: column;
    //align-items: center;
    //text-align: center;
    //justify-content: center;
    //position: relative;
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
    //color: #000;
    //text-align: center;
    //font-family: Pretendard;
    //font-size: 0.47rem;
    //font-style: normal;
    //font-weight: 400;
    //line-height: 0.75rem;
    //margin-top: 0.36rem;
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
    //color: #000;
    //text-align: center;
    //font-family: Pretendard;
    //font-size: 0.7rem;
    //font-style: normal;
    //font-weight: 600;
    //line-height: 0.75rem;
    //margin-bottom: 0.36rem;
`;

export const LogoutButton = styled.button`
    color: #676767;
    text-align: right;
    font-family: Pretendard, sans-serif;
    font-size: 3.33%;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2rem;
    text-decoration-line: underline;
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 10.4%;
    right: 8%;
`;
