import styled from "styled-components";

export const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 10rem;
    padding: 0 20rem 0 10rem;
    background-color: ${(props) => (props.isDark ? "#363636" : "#fff")};

    @media (max-width: 960px) {
        flex-direction: column;
        align-items: flex-start;
        height: auto;
        padding: 2rem;
    }
`;

export const FooterContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    @media (max-width: 960px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.8rem;
        width: 100%;
    }
`;

export const FooterLogo = styled.div`
    display: flex;
    margin-right: 2rem;

    img {
        width: 7rem;
        height: auto;
        max-height: 100%;
        display: block;
    }
`;

export const FooterTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: ${(props) => (props.isDark ? "#F0F0F0" : "#666")};

    @media (max-width: 960px) {
        width: 100%;
    }
`;

export const FooterMenu = styled.nav`
    font-size: 0.7rem;
    margin-bottom: 0.5rem;

    a {
        text-decoration: none;
        color: ${(props) => (props.isDark ? "#F0F0F0" : "#676767")};
        margin-right: 0.625rem;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const FooterTextRow = styled.div`
    font-size: 0.75rem;
    color: ${(props) => (props.isDark ? "#F0F0F0" : "#666")};

    @media (max-width: 960px) {
        margin-top: 1rem;
    }
`;