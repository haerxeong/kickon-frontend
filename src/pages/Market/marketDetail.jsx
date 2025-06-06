import React, { useState, useEffect } from "react";
import * as S from "./marketDetail.style.js";
import ProfileIcon from "../../assets/profile.svg";
import NoData from "../../components/NoData/noData.jsx";
import { useParams } from "react-router-dom";
import { getItemDetail } from "../../apis/domains/market/getItemDetail.js";
import { Phone } from "lucide-react";
import { updateUsedProductStatus } from '../../apis/domains/market/usedProduct';

const MarketDetail = () => {
    const { pk } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchDetail = async () => {
        const res = await getItemDetail(pk);
        setData(res.data);
        setError(res.error);
    };

    useEffect(() => {
        fetchDetail();
    }, [pk]);

    const handleCopyPhone = () => {
        if (data?.phoneNumber) {
            navigator.clipboard.writeText(data.phoneNumber)
                .then(() => alert("전화번호가 복사되었습니다!"))
                .catch(() => alert("복사에 실패했습니다."));
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await updateUsedProductStatus(pk, newStatus);
            await fetchDetail();
            alert('상태가 변경되었습니다.');
        } catch (error) {
            alert('상태 변경에 실패했습니다.');
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'SOLD':
                return '거래완료';
            case 'RESERVED':
                return '예약중';
            default:
                return '판매중';
        }
    };

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
                {data.isMine ? (
                    <S.StatusControl>
                        <select 
                            value={data.usedProductStatus}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="status-select"
                        >
                            <option value="SALE"> 판매중</option>
                            <option value="RESERVED"> 예약중</option>
                            <option value="SOLD">거래완료</option>
                        </select>
                    </S.StatusControl>
                ) : (
                    <S.ArticleStatus status={data.usedProductStatus}>
                        {getStatusText(data.usedProductStatus)}
                    </S.ArticleStatus>
                )}
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

                <S.ButtonWrapper>
                    <S.ContactButton onClick={handleCopyPhone}>
                        <Phone size={18} />
                        연락하기
                    </S.ContactButton>
                </S.ButtonWrapper>
            </S.ArticleContent>
        </S.ArticleContainer>
    );
};

export default MarketDetail;