import styled from "styled-components";

export const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    background-color: #fff; /* 배경 흰색 */
    padding: 10px 5%; /* 좌우 여백 */
    border-bottom: 1px solid #ddd; /* 하단 경계선 */
`;

export const Logo = styled.div`
    flex: 1; /* 로고가 왼쪽에 위치하도록 설정 */

    a img {
        height: 40px; /* 로고 이미지 높이 */
        width: auto;
    }
`;

export const NavMenu = styled.nav`
    display: flex;
`;

export const NavItem = styled.div`
    margin-left: 20px; /* 네비게이션 아이템 간 간격 */
    font-size: 16px;
    font-weight: bold;

    a {
        text-decoration: none;
        color: #222;

        &:hover {
            color: #ff1b6d; /* 호버 시 강조 색상 */
        }
    }
`;
