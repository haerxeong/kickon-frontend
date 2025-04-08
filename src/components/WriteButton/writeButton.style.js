import styled from "styled-components";

export const FloatingButton = styled.button`
    margin-top: 6.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #676767;
    color: white;
    border: none;
    border-radius: 2.3rem;
    padding: 0.7rem;
    font-size: 0.75rem;
    cursor: pointer;
    white-space: nowrap;
    transition: width 0.5s ease;
    width: 2.7rem;
    height: 2.7rem;
    overflow: hidden;
    position: relative;

    &:hover {
        width: 15rem;
    }
`;

export const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: white;
    flex-shrink: 0;
    transition: margin-right 0.5s ease; /* Match the button transition timing */

    ${FloatingButton}:hover & {
        margin-right: 0.6rem;
    }
`;

export const Text = styled.span`
    opacity: 0;
    max-width: 0;
    transition: opacity 0.3s ease, max-width 0.5s ease;
    white-space: nowrap;
    overflow: hidden;

    ${FloatingButton}:hover & {
        opacity: 1;
        max-width: 200px; /* Allow enough space for the text */
    }
`;