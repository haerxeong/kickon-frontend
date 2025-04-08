import styled from "styled-components";

export const TopNewsContainer = styled.div`
    width: 15rem;
    height: 24.4rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 2.5rem;
`;

export const ContainerTitle = styled.div`
    color: #000;
    font-family: Pretendard,serif;
    font-size: 0.8rem; 
    font-style: normal;
    font-weight: 600;
    line-height: 0.8rem;  
    position: absolute;
    top: 1.2rem; 
    left: 0.8rem;  
`;

export const TNews = styled.div`
    display: flex;
    height : 4.35rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem; 
    width: 100%;  
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: -0.8rem; 
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
    left: 0.6rem;  
    top: -0.28rem;  
    object-fit: cover; 
    width: 4rem;
`;

export const NewsTitle = styled.div`
    position: absolute;
    top:-0.2rem;
    left: 5rem;
    display: flex;
    width: 8.94rem; 
    height: 3rem;  
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    
    font-family: Pretendard,serif;
    font-size: 0.6rem; 
    font-style: normal;
    font-weight: 500;
    line-height: 0.9rem;  
`