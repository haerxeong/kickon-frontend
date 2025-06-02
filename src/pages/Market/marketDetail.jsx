import React, { useState, useEffect } from "react";
import * as S from "./marketDetail.style.js";
import ProfileIcon from "../../assets/profile.svg";
import NoData from "../../components/NoData/noData.jsx";
import { useParams } from "react-router-dom";
import { getItemDetail } from "../../apis/domains/market/getItemDetail.js";

const MarketDetail = () => {
    const { pk } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            const res = await getItemDetail(pk);
            setData(res.data);
            setError(res.error);
        };
        fetchDetail();
    }, [pk]);

    if (error || !data) {
        return (
            <S.ArticleContainer>
                <NoData onRetry={() => window.location.reload()} />
            </S.ArticleContainer>
        );
    }

    return (
        <S.ArticleContainer>
            {data.profileImageUrl && (
                <S.ArticleImage src={data.profileImageUrl} alt="상품 이미지" />
            )}

            <S.ArticleLabel>
                <S.ArticleCategory>{data.category}</S.ArticleCategory>
                <S.ArticleStatus status={data.usedProductStatus}>
                    {data.usedProductStatus === "SOLD" ? "판매완료" : "판매중"}
                </S.ArticleStatus>
            </S.ArticleLabel>

            <S.ArticleHeader>
                <S.ArticleTitle>{data.productName}</S.ArticleTitle>
                <S.ArticleInfo>
                    <img
                        src={data.user?.profileImageUrl || ProfileIcon}
                        alt="프로필 아이콘"
                        width={24}
                        height={24}
                        style={{ borderRadius: "50%" }}
                    />
                    {data.user?.nickname}
                    <S.TimeLabel>
                        {new Date(
                            new Date(data.createdAt).getTime() + 9 * 60 * 60 * 1000
                        ).toLocaleString()}
                    </S.TimeLabel>
                </S.ArticleInfo>
            </S.ArticleHeader>

            <S.ArticleContent>
                <S.ArticleText>
                    <b>상품 설명</b>
                    <div>{data.description}</div>
                </S.ArticleText>

                <S.ArticleText>
                    <b>가격</b>
                    <div>{data.price.toLocaleString()}원</div>
                </S.ArticleText>

                <S.ArticleText>
                    <b>연락처</b>
                    <div>{data.phoneNumber}</div>
                </S.ArticleText>
            </S.ArticleContent>
        </S.ArticleContainer>
    );
};

export default MarketDetail;