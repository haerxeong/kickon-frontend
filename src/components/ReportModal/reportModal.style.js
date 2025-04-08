import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    position: relative;
    width: 15.75rem;
    height: auto;
    min-height: 17.75rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #FFF;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.40);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 0.67rem;
    right: 0.67rem;
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: '✕';
        font-size: 1rem;
        color: #8F8F8F;
    }
`;

export const ReportTitle = styled.p`
    color: #000;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 1.5rem;
`;

export const ReportForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CheckboxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
`;

export const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    font-family: Pretendard;
    font-size: 0.65rem;
    font-weight: 400;
    color: #000;
    cursor: pointer;
`;

export const CheckboxInput = styled.input`
    margin-right: 0.5rem;
    cursor: pointer;
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 1px solid #999;
    border-radius: 2px;
    position: relative;

    &:checked {
        background-color: #000;
        border-color: #000;
    }

    &:checked::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 5px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    &:focus {
        outline: none;
    }
`;

export const OtherInput = styled.textarea`
    width: 90%;
    height: 4rem;
    margin: 0.5rem auto 0;
    padding: 0.5rem;
    border: 1px solid #E0E0E0;
    border-radius: 0.25rem;
    resize: none;
    font-family: Pretendard;
    font-size: 0.65rem;

    &:focus {
        outline: none;
        border-color: #666;
    }

    &::placeholder {
        color: #BDBDBD;
    }
`;

export const SubmitButton = styled.button`
    width: 90%;
    height: 2.5rem;
    border-radius: 0.25rem;
    background-color: ${props => props.active ? '#000' : '#DCDCDC'};
    color: white;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-weight: 600;
    border: none;
    cursor: ${props => props.active ? 'pointer' : 'default'};
    transition: background-color 0.2s;
    margin-top: auto;
    margin-bottom: 0.5rem;

    &:hover {
        background-color: ${props => props.active ? '#000' : '#DCDCDC'};
    }
`;