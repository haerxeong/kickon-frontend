import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const NewsContainer = styled.div`
    width: 30rem;
    //height: 116.2rem;
    flex-shrink: 0;
    border-radius: 0.44rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    padding: 1.33rem 0.7rem 1.77rem 0.7rem;
    margin-bottom: 6.19rem;
    position: relative;
`;

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #F0F0F0;
    margin-bottom: 1rem;
`;

export const Tab = styled.div`
    color: ${props => props.active ? '#C00C0B' : '#676767'};
    font-family: Pretendard;
    font-size: 0.8rem;
    font-weight: ${props => props.active ? '600' : '500'};
    padding: 0.5rem 1rem;
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

// 리그 드롭다운을 위한 특별 탭 스타일
export const LeagueTab = styled(Tab)`
    display: flex;
    align-items: center;
    
    /* 레이아웃 조정을 위한 스타일 */
    & > div {
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        /* 텍스트 위치 조정 */
        transform: translateY(0);
        line-height: normal;
    }
    
    /* 드롭다운 컴포넌트 내부 스타일 조정 */
    & > div > * {
        font-size: 0.8rem;
        font-weight: inherit;
        margin: 0;
        padding: 0;
        vertical-align: middle;
    }
    
    /* 텍스트가 중앙에 위치하도록 조정 */
    & div {
        display: flex;
        align-items: center;
    }
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