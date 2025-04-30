import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderWrapper = styled.header`
  display: flex;
  height: 3.15rem;
  align-items: center;
  background-color: ${(props) => (props.isDark ? "#363636" : "#fff")};
  flex-shrink: 0;
`;

export const Logo = styled.div`
  margin: 0 4rem 0 12.25rem;

  a img {
    height: 2.1rem; /* 로고 이미지 높이 */
    width: auto;
  }
`;

export const NavItem = styled(Link)`
  margin-left: 4rem;
  font-size: 0.85rem;
  font-weight: 400;
  text-decoration: none;
  color: ${(props) => {
    const { currentPath, itemPath } = props;

    // Case 1: Home - both #000
    if (currentPath === "/") return "#000";

    // Case 2: News - News #FFF, Club Community #8F8F8F
    if (currentPath.includes("/news")) {
      return itemPath === "/news" ? "#FFF" : "#8F8F8F";
    }

    // Case 3: Club Community #FFF, News #8F8F8F
    if (currentPath.includes("/community")) {
      return itemPath === "/community" ? "#FFF" : "#8F8F8F";
    }

    // Case 4: Transferability - Transferability #FFF, others #8F8F8F
    if (currentPath.includes("/transferability")) {
        return itemPath === "/transferability" ? "#FFF" : "#8F8F8F";
    }

    // Case 5: Signup - same as profile settings (both #FFF)
    if (currentPath === "/signup") return "#FFF";

    // Default (fallback) using isDark prop
    return props.isDark ? "#FFF" : "#000";
  }};
`;

export const LoginButton = styled(Link)`
  display: ${(props) => (props.currentPath === "/signup" ? "flex" : "none")};
  position: absolute;
  right: 12.5rem;
  height: 1.7rem;
  padding: 0.4375rem 0.7875rem;
  justify-content: center;
  align-items: center;
  gap: 0.4375rem;
  border-radius: 0.875rem;
  border: 1px solid #dcdcdc;
  background: #fff;
  color: #c00c0b;
  text-align: right;
  font-size: 0.7875rem;
  font-style: normal;
  font-weight: 400;
  text-decoration: none;
`;
