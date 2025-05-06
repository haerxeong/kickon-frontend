import styled from "styled-components";

export const TopNewsContainer = styled.div`
    width: 15rem;
    min-height: 8rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
    position: relative;
    overflow: hidden;
`;

export const ContainerTitle = styled.div`
    color: #000;
    font-family: Pretendard;
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
    width: 100%;
    min-height: 4.25rem;
    padding: 0.5rem 0;
    position: relative;
    border-top: 1px solid #F0F0F0;

    &:first-child {
        border-top: none;
    }
`;

export const NewsImageWrapper = styled.div`
  width: 4rem;
  height: 3rem;
  border-radius: 0.175rem;
  overflow: hidden;
  margin-left: 0.6rem;
  background-color: #DCDCDC;
`;

export const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NewsTitle = styled.div`
    width: 8.94rem;
    padding-left: 0.4rem;
    color: #000;
    font-family: Pretendard, serif;
    font-size: 0.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: 0.9rem;
    display: flex;
    align-items: center;
`;