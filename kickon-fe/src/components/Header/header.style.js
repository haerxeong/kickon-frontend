import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;

  a {
    text-decoration: none;
    color: #ff1b6d;
    font-weight: 1000; /* 두께 설정 */
  }
`;

export const NavMenu = styled.nav`
  display: flex;
`;

export const NavItem = styled.div`
  margin-left: 20px;
  font-size: 16px;

  a {
    text-decoration: none;
    color: #222;

    &:hover {
      color: #ff1b6d;
    }
  }
`;
