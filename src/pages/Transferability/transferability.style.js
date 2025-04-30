import styled from 'styled-components';

export const Container = styled.div`
    width: 30rem;
    height: 37rem;
    flex-shrink: 0;
    border-radius: 0.45rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1.35rem;
`;

export const Title = styled.div`
    align-self: stretch;
    color: #000;
    text-align: center;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.6rem;
    margin-bottom: 0.9rem;
`;

export const Divider = styled.div`
    width: 100%;
    height: 0;
    border-top: 1px solid #DCDCDC;
    margin-bottom: 2.15rem;
`;

export const InputBox = styled.div`
    position: relative;
    width: 15.45rem;
    height: 2.15rem;
    padding: 0.54rem 0.7rem;
    border-radius: 0.36rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    display: flex;
    align-items: center;
    margin-bottom: 0.9rem;
`;

export const Input = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.7rem;
    background: transparent;

    &::placeholder {
        color: #8F8F8F;
    }
`;

export const ClearButton = styled.button`
    background: none;
    border: none;
    font-size: 1.1rem;
    color: #aaa;
    cursor: pointer;
`;

export const PlayerImage = styled.img`
    width: 15.8rem;
    height: 23.5rem;
    flex-shrink: 0;
    object-fit: cover;
    margin-bottom: 0.9rem;
`;

export const PredictButton = styled.button`
    display: flex;
    width: 12rem;
    height: 1.7rem;
    padding: 0.1rem 0.54rem;
    justify-content: center;
    align-items: center;
    gap: 0.45rem;
    flex-shrink: 0;
    border-radius: 0.36rem;
    background: rgba(192, 12, 11, 0.90);
    box-shadow: 0px 2px 10px 0px rgba(217, 25, 32, 0.20);
    border: none;
    cursor: pointer;
`;

export const BallIcon = styled.img`
    width: 0.8rem;
    height: 0.8rem;
`;

export const ButtonText = styled.span`
  color: #FFF;
  font-size: 0.65rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
`;