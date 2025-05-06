import React, { useState } from 'react';
import * as S from './transferability.style.js';
import ballIcon from '../../assets/good_black.svg';
import playerImage from '../../assets/player.png';
import NoData from '../../components/NoData/noData.jsx';

const Transferability = () => {
    const [inputValue, setInputValue] = useState('');
    const [transferResult, setTransferResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handlePredict = async () => {
        if (!inputValue.trim()) return;
        setIsLoading(true);
        setHasError(false);

        try {
            const response = await fetch(`/api/predict?player_name=${encodeURIComponent(inputValue)}`);
            const text = await response.text(); // JSON 파싱 전에 원본 확인
            console.log("예측 응답 원문:", text);

            // '와 " 자동 치환해서 파싱 시도 (임시 fix, 보안 주의)
            const safeText = text.replace(/'/g, '"'); // ' → "로 교체
            const data = JSON.parse(safeText);

            if (!data.transfer_chance && data.message) {
                throw new Error(data.message);
            }

            setTransferResult(data);
        } catch (error) {
            console.error('예측 요청 실패:', error);
            setHasError(true); // 에러 감지
            setTransferResult(null); // 결과 초기화
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
        <S.Container>
            <S.ContentWrapper>
                <S.Title>킥온과 선수 이적 예측을 해보세요!</S.Title>
                <S.Divider />
                <S.InputBox>
                    <S.Input
                        placeholder="선수 이름을 입력해주세요"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    {inputValue && (
                        <S.ClearButton onClick={() => setInputValue('')}>×</S.ClearButton>
                    )}
                </S.InputBox>

                {isLoading ? (
                    <S.Spinner />
                ) : hasError ? (
                    <NoData onRetry={handlePredict} />
                ) : !transferResult ? (
                    <S.PlayerImage src={playerImage} alt="선수 이미지" />
                ) : (
                    <>
                        <S.ResultChance>
                            {(transferResult.transfer_chance * 100).toFixed(1)}%
                        </S.ResultChance>
                        <S.ResultMessage>
                            {getMessage(transferResult.transfer_chance)}
                        </S.ResultMessage>
                    </>
                )}
            </S.ContentWrapper>

            <S.PredictButton onClick={handlePredict} disabled={isLoading}>
                <S.BallIcon src={ballIcon} alt="축구공" />
                <S.ButtonText>갈까? 말까?</S.ButtonText>
            </S.PredictButton>
        </S.Container>
    );
};

export default Transferability;