import styled from "styled-components";

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.8rem; // PostsWrapper와의 간격 조정
    margin-bottom: 0.9rem;
`;

export const PageButton = styled.button`
    width: 1.2rem; /* 기존의 0.8배 */
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    font-size: 0.56rem; /* 기존의 0.8배 */
    color: ${props => (props.active ? '#000' : '#8F8F8F')};
    cursor: pointer;
    position: relative;

    &:hover {
        color: #000;
    }

    /* 활성화된 페이지에 밑줄 추가 */
    &::after {
        content: "";
        display: ${props => (props.active ? 'block' : 'none')};
        width: 50%;
        height: 1.6px; /* 기존의 0.8배 */
        background-color: #000;
        position: absolute;
        bottom: -1.6px;
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const NavButton = styled.button`
    border: none;
    background: transparent;
    font-size: 0.56rem; /* 기존의 0.8배 */
    color: ${props => (props.disabled ? '#D4D4D4' : '#8F8F8F')};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    display: flex;
    align-items: center;

    &:hover {
        color: ${props => (props.disabled ? '#D4D4D4' : '#000')};
    }
`;