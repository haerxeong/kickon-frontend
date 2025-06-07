import React from "react";
import xCard from "../../assets/xCard.svg";
import * as S from "./emptyState.style";

const EmptyState = ({ message, subMessage, buttonText, onRetry }) => (
    <S.Container>
        <S.Image src={xCard} alt="Empty state" />
        <S.Message>{message}</S.Message>
        {subMessage && <S.SubMessage>{subMessage}</S.SubMessage>}
        <S.RetryButton onClick={onRetry}>
            <S.RetryText>{buttonText}</S.RetryText>
        </S.RetryButton>
    </S.Container>
);

export default EmptyState; 