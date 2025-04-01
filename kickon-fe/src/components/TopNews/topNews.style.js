import styled from "styled-components";

export const TopNewsContainer = styled.div`
    width: 15rem;  /* 20.125rem * 0.8 */
    height: 26.2rem;  /* 32.75rem * 0.8 */
    flex-shrink: 0;
    border-radius: 0.5rem;  /* 0.625rem * 0.8 */
    border: 1px solid #DCDCDC;
    background: #FFF;
    display: flex;
    flex-direction: column;  /* 세로로 정렬 */
    align-items: center;  /* 중앙 정렬 */
    position: relative;  /* ContainerTitle을 위해 상대적인 위치 설정 */
    padding-top: 3.2rem;
    padding-bottom: 0;
`;

export const ContainerTitle = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 0.8rem;  /* 1rem * 0.8 */
    font-style: normal;
    font-weight: 600;
    line-height: 0.8rem;  /* 1rem * 0.8 */
    position: absolute;
    top: 1.2rem;  /* 1.5rem * 0.8 */
    left: 0.8rem;  /* 1rem * 0.8 */
`;

export const TNews = styled.div`
    display: flex;
    height : 4.5rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;  /* TNews 간의 간격을 설정 */
    width: 100%;  /* 폭을 100%로 설정하여 균등하게 나열 */
    position: relative;
    /* 구분선 추가 */
    &::before {
        content: "";
        position: absolute;
        top: -0.8rem; /* TNews보다 1rem 위 */
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #F0F0F0;
    }

    /* 첫 번째 항목에는 구분선이 없도록 처리 */
    &:first-child::before {
        display: none;
    }
`;

export const NewsImage = styled.img`
    position: absolute;
    left: 0.8rem;  /* 0.8rem 위치에 배치 */
    top: 0;  /* TNews 상단에 위치하도록 설정 */
    object-fit: cover;  /* 이미지 비율을 유지하며 영역에 맞게 잘라서 표시 */
`;

export const NewsTitle = styled.div`
    position: absolute;
    left: 5.2rem;
    display: flex;
    width: 9.6rem;  /* 12rem * 0.8 */
    height: 3rem;  /* 3.75rem * 0.8 */
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;

    /* Body/body6_Pre_m_13px */
    font-family: Pretendard;
    font-size: 0.65rem;  /* 0.8125rem * 0.8 */
    font-style: normal;
    font-weight: 500;
    line-height: 0.9rem;  /* 1.125rem * 0.8 */
`