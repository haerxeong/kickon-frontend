import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const NewsContainer = styled.div`
    //width: 30rem;
    //height: 116.2rem;
    width: 100%;
    flex-shrink: 0;
    border-radius: 0.44rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    padding: 0.7rem;
    margin-bottom: 6.19rem;
    position: relative;
`;

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #F0F0F0;
    margin-bottom: 1rem;
`;

export const Tab = styled.div`
    color: ${props => props.active ? '#C00C0B' : '#000'};
    font-family: Pretendard;
    font-size: 0.7rem;
    font-weight: ${props => props.active ? '500' : '400'};
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    position: relative;
    &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${props => props.active ? '#C00C0B' : 'transparent'};
    }
`;

export const LeagueTab = styled(Tab)`
    display: flex;
    align-items: center;
    
`;

export const NewsList = styled.div`
  margin-top: 1rem;
        /* 첫 번째 아이템을 제외한 모든 아이템에 상단 간격 추가 */
        & > div + div {
                margin-top: 1rem;
        }

        /* 마지막 아이템의 하단 테두리 제거 */
        & > div:last-child {
                border-bottom: none;
        }
`;

export const NoDataWrapper = styled.div`
  margin: 7rem 0 20rem 0; // 위아래 마진
`;