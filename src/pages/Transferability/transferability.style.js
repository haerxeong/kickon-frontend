import styled from 'styled-components';

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  overflow: visible;
`;

export const Container = styled.div`
    //width: 30rem;
    width: 100%;
    height: 37rem;
    border-radius: 0.45rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 버튼을 하단으로 */
    align-items: center;
    padding: 1.35rem 1rem;
    box-sizing: border-box;
    transition: height 0.3s ease-in-out;
    
    &.expanded {
      height: auto;
      min-height: 37rem;
      max-height: none;
    }

    &.loading {
      height: auto;
      padding-bottom: 1rem;
    }
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
    background: ${props => props.disabled ? 'rgba(192, 12, 11, 0.5)' : 'rgba(192, 12, 11, 0.90)'};
    box-shadow: 0px 2px 10px 0px rgba(217, 25, 32, 0.20);
    border: none;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    margin-top: ${props => props.isLoading ? '1.5rem' : '0'};
    transition: background 0.3s ease;
    
    &:hover {
        background: ${props => props.disabled ? 'rgba(192, 12, 11, 0.5)' : 'rgba(192, 12, 11, 1)'};
    }
    
    /* 버튼이 비활성화되면 내부의 모든 요소에 투명도 적용 */
    ${props => props.disabled && `
        img, span {
            opacity: 0.7;
        }
    `}
`;

export const BallIcon = styled.img`
    width: 0.8rem;
    height: 0.8rem;
    transition: opacity 0.3s ease;
`;

export const BallIconWithMargin = styled(BallIcon)`
  margin-right: 0.8rem;
`;

export const ButtonText = styled.span`
  color: #FFF;
  font-size: 0.65rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
`;

export const ResultChance = styled.div`
  color: #000;
  font-size: 5.71rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 5rem 0 3.5rem 0;
`;

export const ResultMessage = styled.div`
  color: #000;
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 3rem;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6rem;
`;

export const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #000;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: none;
  overflow-y: visible;
`;

export const NewsSection = styled.div`
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  width: 100%;
  overflow: visible;
`;

export const NewsTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`;

export const ActionButton = styled.button`
  display: flex;
  width: ${props => props.isNavigation ? '8rem' : '12rem'};
  height: ${props => props.isNavigation ? '1.4rem' : '1.7rem'};
  padding: 0.1rem 0.54rem;
  justify-content: center;
  align-items: center;
  gap: 0.45rem;
  margin: ${props => props.isNavigation ? '1rem 0 1rem 1rem' : '1rem auto 1rem'};
  border-radius: 0.36rem;
  background: ${props => props.isNavigation ? '#6E6E6E' : props.disabled ? 'rgba(192, 12, 11, 0.5)' : 'rgba(192, 12, 11, 0.90)'};
  color: #FFF;
  font-size: ${props => props.isNavigation ? '0.6rem' : '0.65rem'};
  font-weight: 400;
  box-shadow: ${props => props.isNavigation ? '0px 1px 4px rgba(0, 0, 0, 0.1)' : '0px 2px 10px 0px rgba(217, 25, 32, 0.20)'};
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background: ${props => props.isNavigation ? '#5A5A5A' : props.disabled ? 'rgba(192, 12, 11, 0.5)' : 'rgba(192, 12, 11, 1)'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
  }
  
  /* 버튼이 비활성화되면 내부의 모든 요소에 투명도 적용 */
  ${props => props.disabled && `
    img, span {
      opacity: 0.7;
    }
  `}
`;

export const NewsDetailContainer = styled.div`
  width: 100%;
  max-height: none; 
  overflow-y: visible;
  padding: 0;
  margin-bottom: 1rem;
  border: 1px solid #DCDCDC;
  border-radius: 0.625rem;
  background: #FFF;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const NewsDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-bottom: 0.0625rem solid #eee;
`;

export const NewsDetailBadge = styled.div`
  display: flex;
  height: 1.07rem;
  padding: 0.125rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.25rem;
  background: #000;
  color: #fff;
  font-size: 0.53rem;
  font-weight: 500;
  margin-right: 0.5rem;
  display: inline-block;
`;

export const NewsDetailAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.583rem;
  color: #666;
  margin-top: 0.75rem;
`;

export const NewsDetailTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0 0 0.75rem 0;
  color: black;
`;

export const NewsDetailImage = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

export const NewsDetailContent = styled.div`
  margin: 0.7rem;
  margin-bottom: 1rem;
  font-size: 0.718rem;
  line-height: 1.6;
  color: #333;
  max-height: none; // 15rem에서 none으로 변경
  overflow-y: visible; // auto에서 visible로 변경
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0.7rem auto;
    border-radius: 0.625rem;
    object-fit: contain;
  }
  
  p {
    margin-bottom: 1rem;
  }
`;

export const PredictionNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  margin: 0.5rem 1rem 1rem 1rem;
  background: rgba(192, 12, 11, 0.1);
  border-left: 3px solid rgba(192, 12, 11, 0.9);
  border-radius: 0.25rem;
  color: rgba(192, 12, 11, 0.9);
  font-size: 0.7rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(192, 12, 11, 0.15);
    transform: translateY(-1px);
  }
`;

export const ArrowIcon = styled.span`
  margin-left: 0.5rem;
  font-weight: bold;
`;