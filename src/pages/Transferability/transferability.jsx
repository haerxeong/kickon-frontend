import React, { useState, useEffect, useRef, useContext } from 'react';
import * as S from './transferability.style.js';
import ballIcon from '../../assets/good_black.svg';
import playerImage from '../../assets/player.png';
import NoData from '../../components/NoData/noData.jsx';
import NewsList from '../../components/NewsList/newsList.jsx';
import { FaCheckCircle } from "react-icons/fa";
import defaultTeamLogo from '../../assets/good.svg';
import { useNavigate } from 'react-router-dom';
import { useAuthGuard } from '../../hooks/useAuthGuard.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useDispatch } from 'react-redux';
import { openLoginModal } from '../../features/modal/modalSlice.js';
import defaultProfileImage from "../../assets/profile.svg";

const Transferability = () => {
    const [inputValue, setInputValue] = useState('');
    const [transferResult, setTransferResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [predictionDone, setPredictionDone] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    
    // 로그인 상태 검증을 위한 설정
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const dispatch = useDispatch();
    
    // 뉴스 컨텐츠 참조
    const newsContentRef = useRef(null);

    // 페이지 접근 시 로그인 상태 검증
    useEffect(() => {
        if (!isAuthenticated) {
            // 로그인하지 않은 경우 홈으로 리다이렉트 후 로그인 모달 표시
            navigate('/');
            dispatch(openLoginModal());
        }
    }, [isAuthenticated, navigate, dispatch]);

    // 뉴스 상세보기 시 내용 부분만 스크롤 가능하도록 설정
    useEffect(() => {
        if (newsContentRef.current) {
            newsContentRef.current.scrollTop = 0;
        }
    }, [selectedNews]);

    const handlePredict = async () => {
        if (!inputValue.trim()) return;
        setIsLoading(true);
        setHasError(false);
        setPredictionDone(false);
        setShowResult(false);
        setSelectedNews(null);

        try {
            const baseUrl = import.meta.env.VITE_API_PREDICT_URL;
            const url = `${baseUrl}/default/kickon-transfer-predict?player_name=${encodeURIComponent(inputValue)}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store', // 304 방지
            });

            const text = await response.text();
            console.log("예측 응답 원문:", text);

            const safeText = text.replace(/'/g, '"');
            const data = JSON.parse(safeText);

            if (!data.transfer_chance && data.message) {
                throw new Error(data.message);
            }

            setTransferResult(data);
            setPredictionDone(true);
        } catch (error) {
            console.error('예측 요청 실패:', error);
            setHasError(true);
            setTransferResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowResult = () => {
        setShowResult(true);
        setSelectedNews(null);
    };
    
    const handleNewsClick = (newsItem) => {
        setSelectedNews(newsItem);
    };
    
    const handleBackToNewsList = () => {
        setSelectedNews(null);
    };

    const getMessage = (chance) => {
        if (chance > 0.7) return '🔥 이적 가능성이 매우 높습니다!';
        if (chance > 0.4) return '🧐 고민 중인 이적 후보입니다!';
        if (chance > 0.2) return '🙃 이적 가능성이 조금 있긴 합니다.';
        return `👉 "로열티 높은 '우리' 팀 선수입니다!"`;
    };

    // 컨테이너 높이 결정
    const getContainerClass = () => {
        if (selectedNews) {
            return 'expanded';
        }
        if (isLoading || (predictionDone && !showResult)) {
            return 'loading';
        }
        return '';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // 뉴스 내용 요약 (500자로 제한)
    const getSummaryContent = (content) => {
        if (!content) return '';
        
        // HTML 태그 제거 및 요약
        const textOnly = content.replace(/<[^>]*>/g, '');
        if (textOnly.length > 500) {
            return textOnly.substring(0, 500) + '...';
        }
        return textOnly;
    };

    return (
        <S.Container className={getContainerClass()}>
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

                {selectedNews ? (
                    <S.NewsDetailContainer>
                        <S.ActionButton isNavigation onClick={handleBackToNewsList}>
                            <S.ButtonText>뉴스 목록으로</S.ButtonText>
                        </S.ActionButton>

                        {predictionDone && !showResult && (
                            <S.PredictionNotice onClick={handleShowResult}>
                                <S.BallIcon src={ballIcon} alt="축구공" />
                                <span style={{ marginLeft: '6px' }}>예측이 완료되었습니다! 결과 확인하기</span>
                                <S.ArrowIcon>→</S.ArrowIcon>
                            </S.PredictionNotice>
                        )}
                        
                        {selectedNews.thumbnailUrl && (
                            <S.NewsDetailImage src={selectedNews.thumbnailUrl} alt="뉴스 이미지" />
                        )}
                        
                        {selectedNews.category && (
                            <div style={{padding: '0 1.3rem', marginTop: '2.37rem', display: 'flex', alignItems: 'center'}}>
                                <img 
                                    src={selectedNews.team?.logoUrl || defaultTeamLogo} 
                                    alt={selectedNews.team?.nameKr || "팀 로고"} 
                                    style={{
                                        width: '0.6rem',
                                        height: 'auto',
                                        marginRight: '0.5rem'
                                    }} 
                                />
                                <S.NewsDetailBadge>{selectedNews.category}</S.NewsDetailBadge>
                            </div>
                        )}
                        
                        <S.NewsDetailHeader>
                            <S.NewsDetailTitle>{selectedNews.title}</S.NewsDetailTitle>
                            <S.NewsDetailAuthor>
                                <img
                                    src={selectedNews.user?.profileImageUrl || defaultProfileImage}
                                    alt="프로필"
                                    width={24}
                                    height={24}
                                    style={{borderRadius: '50%'}}
                                />
                                {selectedNews.user?.nickname}
                                <FaCheckCircle />
                                <span>{formatDate(selectedNews.createdAt)}</span>
                                <span>|</span>
                                <span>읽음 {selectedNews.views}</span>
                            </S.NewsDetailAuthor>
                        </S.NewsDetailHeader>
                        
                        <S.NewsDetailContent 
                            ref={newsContentRef} 
                            dangerouslySetInnerHTML={{ 
                                __html: selectedNews.content 
                            }} 
                        />
                    </S.NewsDetailContainer>
                ) : isLoading ? (
                    <S.LoadingContainer>
                        <S.SpinnerContainer>
                            <S.Spinner />
                        </S.SpinnerContainer>
                        <S.NewsSection>
                            <S.NewsTitle>예측이 진행되는 동안 뉴스를 확인해보세요!</S.NewsTitle>
                            <NewsList type="other" onNewsClick={handleNewsClick} isCompact={true} />
                        </S.NewsSection>
                    </S.LoadingContainer>
                ) : predictionDone && !showResult ? (
                    <S.LoadingContainer>
                        <S.NewsSection>
                            <S.NewsTitle>예측이 완료되었습니다!</S.NewsTitle>
                            <S.ActionButton onClick={handleShowResult}>
                                <S.BallIcon src={ballIcon} alt="축구공" />
                                <S.ButtonText>결과 확인하기</S.ButtonText>
                            </S.ActionButton>
                            <NewsList type="other" onNewsClick={handleNewsClick} isCompact={true} />
                        </S.NewsSection>
                    </S.LoadingContainer>
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

            <S.PredictButton 
                onClick={handlePredict} 
                disabled={isLoading || (predictionDone && !showResult)} 
                isLoading={isLoading}
            >
                <S.BallIcon src={ballIcon} alt="축구공" />
                <S.ButtonText>갈까? 말까?</S.ButtonText>
            </S.PredictButton>
        </S.Container>
    );
};

export default Transferability;