import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    background-color: ${(props) => (props.isDark ? "#363636" : "#fff")};
    padding: 0.4rem 10rem; /* 좌우 여백 */
    border-bottom: 0.1rem solid #ddd; /* 하단 경계선 */
`;

export const Logo = styled.div`
    /* 로고가 왼쪽에 위치하도록 설정 */
    margin-right: 4rem; /* 로고와 첫 번째 NavItem 사이 간격 */

    a img {
        height: 2.5rem; /* 로고 이미지 높이 */
        width: auto;
    }
`;

export const NavMenu = styled.nav`
    display: flex;
`;

export const NavItem = styled(Link)`
    margin-left: 4rem; /* 네비게이션 아이템 간 간격 */
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none; /* 밑줄 제거 */
    color: ${(props) => (props.isDark ? "#FFFFFF" : "#222")};
`;