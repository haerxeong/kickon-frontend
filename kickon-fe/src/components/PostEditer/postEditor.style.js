import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 31rem;
    padding: 1.4rem 0.74rem 4.625rem 0.74rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.39rem;
    border-radius: 0.46rem;
    border: 1px solid #dcdcdc;
    background: #fff;
`;

export const ImageUploadSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    cursor: pointer;
`;

export const ImageUploadText = styled.span`
    color: #8F8F8F;
    font-size: 0.65rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.75rem;
`;

export const SearchAndTabSection = styled.div`
    display: flex;
    width: 100%;
    gap: 0.7rem;
    align-items: center;
`;

export const TeamSearchInput = styled.div`
    display: flex;
    width: 13.13rem;
    height: 1.166rem;
    padding: 0.416rem 0.74rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.462rem;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #fff;
    position: relative;

    input {
        width: 100%;
        border: none;
        outline: none;
        font-size: 0.65rem;
    }
`;

export const ClearButton = styled.button`
    position: absolute;
    right: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
`;

export const TabSectionWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

export const TabSelector = styled.div`
    display: flex;
    padding: 0.416rem 0.74rem;
    justify-content: center;
    align-items: flex-start;
    gap: 1.48rem;
    align-self: stretch;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    font-size: 0.65rem;
    cursor: pointer;
`;

export const NewsTabDropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    padding: 0.462rem 0.74rem;
    align-items: center;
    gap: 0.462rem;
    align-self: stretch;
    flex-direction: column;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    z-index: 10;
`;

export const CommunityTabSelector = styled.div`
    display: flex;
    padding: 0.416rem 0.7rem;
    justify-content: center;
    align-items: flex-start;
    gap: 1.48rem;
    align-self: stretch;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    font-size: 0.65rem;
    cursor: pointer;
`;

export const CommunityTabDropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    padding: 0.462rem 3.2rem 0.462rem 0.7rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.92rem;
    align-self: stretch;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    z-index: 10;
`;

export const TabOption = styled.div`
    color: #000;
    font-size: 0.65rem;
    padding: 0.1rem 0;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const HelpIcon = styled.div`
    margin-left: 0.5rem;
    cursor: pointer;
`;

export const TitleInput = styled.input`
    display: flex;
    height: 2.6rem;
    padding: 0.7rem 0.74rem;
    align-items: flex-start;
    gap: 0.462rem;
    align-self: stretch;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    width: 100%;
    outline: none;
    font-size: 0.7rem;
`;

export const EditorToolbar = styled.div`
    display: flex;
    align-items: center;
`;

export const FormatDropdown = styled.div`
    display: inline-flex;
    height: 1.572rem;
    padding: 0.416rem 0.37rem;
    justify-content: center;
    align-items: flex-start;
    gap: 0.277rem;
    flex-shrink: 0;
    border-radius: 0.185rem;
    border: 1px solid #D9D9D9;
    background: #FFF;
    font-size: 0.65rem;
    cursor: pointer;
`;

export const Divider = styled.div`
    width: 1px;
    height: 0.83rem;
    margin: 0 0.7rem;
    background-color: #D9D9D9;
`;

export const FormattingToolsContainer = styled.div`
    display: flex;
    width: 5.55rem;
    height: 1.572rem;
    padding: 0.323rem 0.37rem;
    justify-content: center;
    align-items: flex-start;
    gap: 0.37rem;
    flex-shrink: 0;
    border-radius: 0.185rem;
    border: 1px solid #D9D9D9;
    background: #FFF;
`;

export const ToolIcon = styled.div`
    display: flex;
    width: 1.572rem;
    height: 1.572rem;
    padding: 0.323rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 0.185rem;
    border: 1px solid #D9D9D9;
    background: #FFF;
    cursor: pointer;
    margin-right: 0.2rem;
`;

export const ContentTextarea = styled.textarea`
    display: flex;
    width: 30rem;
    height: 21.275rem;
    padding: 1.1rem 0.7rem;
    justify-content: center;
    align-items: flex-start;
    gap: 0.462rem;
    border-radius: 0.462rem;
    border: 1px solid #D9D9D9;
    background: #FFF;
    resize: none;
    outline: none;
    color: #000;
    font-size: 0.6rem;
    font-weight: 300;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.7rem;
    width: 100%;
`;

export const CancelButton = styled.button`
    display: flex;
    width: 7.585rem;
    height: 2rem;
    padding: 0.37rem 0.7rem;
    justify-content: center;
    align-items: center;
    gap: 0.462rem;
    border-radius: 0.37rem;
    background: #F0F0F0;
    color: #676767;
    border: none;
    cursor: pointer;
    font-size: 0.7rem;
`;

export const SubmitButton = styled.button`
    display: flex;
    width: 7.585rem;
    height: 2rem;
    padding: 0.37rem 0.7rem;
    justify-content: center;
    align-items: center;
    gap: 0.462rem;
    border-radius: 0.37rem;
    background: #C00C0B;
    color: #FFF;
    border: none;
    cursor: pointer;
    font-size: 0.7rem;
`;