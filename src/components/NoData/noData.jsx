import React from "react";
import xCard from "../../assets/xCard.svg";
import { FiRotateCw } from "react-icons/fi";
import * as S from "./noData.style";

const NoData = ({ onRetry }) => {
    const handleRetry = () => {
        if (onRetry) {
            onRetry();
        } else {
            window.location.reload();
        }
    };

    return (
        <S.Container>
            <S.Image src={xCard} alt="No data" />
            <S.Message>데이터를 불러오지 못했어요.</S.Message>
            <S.RetryButton onClick={handleRetry}>
                <FiRotateCw size="0.6rem" color="#FFF" />
                <S.RetryText>다시 시도하기</S.RetryText>
            </S.RetryButton>
        </S.Container>
    );
};

export default NoData;