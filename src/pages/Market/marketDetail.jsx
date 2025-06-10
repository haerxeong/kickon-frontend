import React, {useState, useEffect, useRef} from "react";
import * as S from "./marketDetail.style.js";
import ProfileIcon from "../../assets/profile.svg";
import NoData from "../../components/NoData/noData.jsx";
import { useParams } from "react-router-dom";
import { getItemDetail } from "../../apis/domains/market/getItemDetail.js";
import { Phone } from "lucide-react";
import { updateUsedProductStatus } from '../../apis/domains/market/usedProduct';
import {MdIosShare} from "react-icons/md";
import {LuSiren} from "react-icons/lu";
import {openReportModal} from "../../features/modal/modalSlice.js";
import {useDispatch} from "react-redux";
import {FiMoreHorizontal} from "react-icons/fi";
import parse, { domToReact } from 'html-react-parser';

const MarketDetail = () => {
    const { pk } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef(null);
    const dispatch = useDispatch();

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


    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.more-button')) {
            setIsMenuOpen(false);
        }
    };

    const handleReport = () => {
        setIsMenuOpen(false);
        // 현재 경로에 따라 신고 타입 결정
        const reportType = 'market';
        const contentId = Number(pk)

        // 신고 모달 열기
        dispatch(openReportModal({ type: reportType, id: contentId }));
    };

    const copyToClipboard = () => {
        const currentUrl = window.location.href;

        // 모던 브라우저에서는 Clipboard API 사용
        if (navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl)
                .then(() => {
                    alert("URL이 클립보드에 복사되었습니다.");
                })
                .catch((err) => {
                    console.error('클립보드 복사 실패:', err);
                });
        } else {
            // 구형 브라우저를 위한 대체 방법
            const tempInput = document.createElement('input');
            tempInput.value = currentUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            alert("URL이 클립보드에 복사되었습니다.");
        }
    };

    //여기
    useEffect(() => {
        // 메뉴 닫기 이벤트 리스너 추가
        document.addEventListener('click', handleClickOutside);
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        console.log("isMenuOpen:", isMenuOpen);
    }, [isMenuOpen]);


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
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>
                        <FiMoreHorizontal
                            className="more-button"
                            alt="더보기 버튼"
                            onClick={toggleMenu}
                            style={{ cursor: "pointer" }}
                        />
                    </span>
                    {isMenuOpen && (
                        <S.MoreMenu ref={menuRef}>
                            <S.MenuItem onClick={copyToClipboard}>
                                <MdIosShare alt="공유 아이콘" size={15} />
                                공유하기
                            </S.MenuItem>
                            <S.MenuItem onClick={handleReport}>
                                <LuSiren alt="신고 아이콘" size={15} />
                                신고하기
                            </S.MenuItem>
                        </S.MoreMenu>
                    )}
                </S.ArticleInfo>
            </S.ArticleHeader>

            <S.ArticleContent>
                <S.ArticleText>
                    <b>상품 설명</b>
                    <div>
                        {parse(data.description || '', {
                            replace: (domNode) => {
                                if (domNode.name === 'a' && domNode.attribs?.href?.includes('youtu')) {
                                    const href = domNode.attribs.href;
                                    let videoId = '';

                                    if (href.includes('youtu.be/')) {
                                        videoId = href.split('youtu.be/')[1]?.split('?')[0];
                                    } else if (href.includes('v=')) {
                                        videoId = href.split('v=')[1]?.split('&')[0];
                                    }

                                    if (videoId) {
                                        return (
                                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${videoId}`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title="YouTube video"
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                />
                                            </div>
                                        );
                                    }
                                }
                            },
                        })}
                    </div>
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