import styled from "styled-components";

export const ArticleContainer = styled.div`
    width: 30rem;
    padding: 1rem;
    background: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 0.45rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const ArticleImage = styled.img`
    width: 100%;
    height: auto;
    //max-height: 14rem;
    object-fit: cover;
    border-radius: 0.5rem;
`;

export const ArticleLabel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ArticleCategory = styled.span`
    font-size: 0.75rem;
    color: #c00c0b;
    font-weight: 600;
`;

export const ArticleStatus = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.3rem 0.6rem;
  border-radius: 0.3rem;
  color: white;
  background-color: ${({ status }) =>
    status === "SOLD" ? "#8f8f8f" : "#c00c0b"};
`;

export const StatusControl = styled.div`
  .status-select {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #E0E0E0;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: #1976D2;
    }
    
    &:focus {
      outline: none;
      border-color: #1976D2;
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
    }
  }
`;

export const ArticleHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

export const ArticleTitle = styled.h2`
    font-size: 1rem;
    font-weight: bold;
    color: #000;
`;

export const ArticleInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    color: #444;
    position: relative;

    svg {
        margin-left: 0.25rem;
    }
`;

export const TimeLabel = styled.span`
    margin-left: auto;
    font-size: 0.7rem;
    color: #8f8f8f;
`;

export const ArticleContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
`;

export const ArticleText = styled.div`
    font-size: 0.75rem;
    color: #222;

    b {
        display: block;
        margin-bottom: 0.3rem;
        color: #000;
    }

    div {
        line-height: 1.4;
    }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  text-align: center;
`;

export const ContactButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 8px 14px;
  background: #c00c0b;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(255, 71, 87, 0.2);
  position: relative;
  overflow: hidden;
  width: fit-content;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #c00c0b;
  }

  &:hover {
    background: #a00a0a;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const MoreMenu = styled.div`
    width: 6.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 0.5rem;
    border: 0.0625rem solid #dcdcdc;
    background: #fff;
    box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.16);

    position: absolute; /* 버튼 옆에 위치하도록 설정 */
    top: calc(100% + 0.2rem);
    left: calc(100% - 0.6rem);
    z-index: 100; /* 다른 요소들보다 위에 표시되도록 */
`;

export const MenuItem = styled.div`
    width: 100%;
    display: flex; /* 이모티콘과 텍스트를 수평 배치 */
    align-items: center; /* 수직 정렬 */
    padding: 0.42rem 0.89rem;
    gap: 0.5rem; /* 이모티콘과 텍스트 간 간격 */
    font-size: 0.7rem; /* 글자 크기 */
    font-weight: 500;
    color: #333;

    cursor: pointer;


    &:hover {
        background-color: #f9f9f9;
    }

    &:first-child:hover {
        border-radius: 0.5rem 0.5rem 0 0;
    }

    &:last-child:hover {
        border-radius: 0 0 0.5rem 0.5rem;
    }
    img, svg {
        display: block; /* 이미지와 아이콘이 올바르게 표시되도록 설정 */
        width: auto;
        height: auto;
        vertical-align: middle; /* 텍스트와 아이콘 정렬 */
        margin-right: auto;
    }
`;