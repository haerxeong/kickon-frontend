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
    ResultChance,
    ResultMessage,
} from './transferability.style.js';
import ballIcon from '../../assets/good_black.svg';
import playerImage from '../../assets/player.png';

const Transferability = () => {
    const [inputValue, setInputValue] = useState('');
    const [transferResult, setTransferResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePredict = async () => {
        if (!inputValue.trim()) return;
        setIsLoading(true);

        try {
            const response = await fetch(
                `https://w7ufflahpf.execute-api.ap-northeast-2.amazonaws.com/default/kickon-transfer-predict?player_name=${encodeURIComponent(
                    inputValue
                )}`
            );
            const data = await response.json();
            setTransferResult(data);
        } catch (error) {
            console.error('예측 요청 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getMessage = (chance) => {
        if (chance > 0.7) return '🔥 이적 가능성이 매우 높습니다!';
        if (chance > 0.4) return '🧐 고민 중인 이적 후보입니다!';
        if (chance > 0.2) return '🙃 이적 가능성이 조금 있긴 합니다.';
        return '👉 “로열티 높은 ‘우리’ 팀 선수입니다!”';
    };

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

            {!transferResult ? (
                <PlayerImage src={playerImage} alt="선수 이미지" />
            ) : (
                <>
                    <ResultChance>
                        {(transferResult.transfer_chance * 100).toFixed(1)}%
                    </ResultChance>
                    <ResultMessage>
                        {getMessage(transferResult.transfer_chance)}
                    </ResultMessage>
                </>
            )}

            <PredictButton onClick={handlePredict} disabled={isLoading}>
                <BallIcon src={ballIcon} alt="축구공" />
                <ButtonText>갈까? 말까?</ButtonText>
            </PredictButton>
        </Container>
    );
};

export default Transferability;