import React, { useState } from 'react';
import {
    Container,
    Title,
    Divider,
    InputBox,
    Input,
    ClearButton,
    PlayerImage,
    PredictButton,
    BallIcon,
    ButtonText,
} from './transferability.style.js';
import ballIcon from '../../assets/good_black.svg';
import playerImage from '../../assets/player.png'; // 선수 이미지 경로에 맞게 수정하세요

const Transferability = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <Container>
            <Title>킥온과 선수 이적 예측을 해보세요!</Title>
            <Divider />
            <InputBox>
                <Input
                    placeholder="선수 이름을 입력해주세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {inputValue && (
                    <ClearButton onClick={() => setInputValue('')}>×</ClearButton>
                )}
            </InputBox>
            <PlayerImage src={playerImage} alt="선수 이미지" />
            <PredictButton>
                <BallIcon src={ballIcon} alt="축구공" />
                <ButtonText>갈까? 말까?</ButtonText>
            </PredictButton>
        </Container>
    );
};

export default Transferability;