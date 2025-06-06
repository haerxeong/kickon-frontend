// import styled from "styled-components";
// import { Link } from "react-router-dom";
//
// export const HeaderWrapper = styled.header`
//   display: flex;
//   height: 3.15rem;
//   align-items: center;
//   background-color: ${(props) => (props.isDark ? "#363636" : "#fff")};
//   flex-shrink: 0;
// `;
//
// export const Logo = styled.div`
//   margin: 0 4rem 0 12.25rem;
//
//   a img {
//     height: 2.1rem; /* 로고 이미지 높이 */
//     width: auto;
//   }
// `;
//
// export const NavItem = styled(Link)`
//   margin-left: 4rem;
//   font-size: 0.85rem;
//   font-weight: 400;
//   text-decoration: none;
//   color: ${(props) => {
//     const { currentPath, itemPath } = props;
//
//     // Case 1: Home - both #000
//     if (currentPath === "/") return "#000";
//
//     // Case 2: News - News #FFF, Club Community #8F8F8F
//     if (currentPath.includes("/news")) {
//       return itemPath === "/news" ? "#FFF" : "#8F8F8F";
//     }
//
//     // Case 3: Club Community #FFF, News #8F8F8F
//     if (currentPath.includes("/community")) {
//       return itemPath === "/community" ? "#FFF" : "#8F8F8F";
//     }
//
//     // Case 4: Transferability - Transferability #FFF, others #8F8F8F
//     if (currentPath.includes("/transferability")) {
//         return itemPath === "/transferability" ? "#FFF" : "#8F8F8F";
//     }
//
//     // Case 5: Signup - same as profile settings (both #FFF)
//     if (currentPath === "/signup") return "#FFF";
//
//     // Default (fallback) using isDark prop
//     return props.isDark ? "#FFF" : "#000";
//   }};
// `;
//
// export const LoginButton = styled(Link)`
//   display: ${(props) => (props.currentPath === "/signup" ? "flex" : "none")};
//   position: absolute;
//   right: 12.5rem;
//   height: 1.7rem;
//   padding: 0.4375rem 0.7875rem;
//   justify-content: center;
//   align-items: center;
//   gap: 0.4375rem;
//   border-radius: 0.875rem;
//   border: 1px solid #dcdcdc;
//   background: #fff;
//   color: #c00c0b;
//   text-align: right;
//   font-size: 0.7875rem;
//   font-style: normal;
//   font-weight: 400;
//   text-decoration: none;
// `;

import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderWrapper = styled.header`
    display: flex;
    height: 3.15rem;
    align-items: center;
    background-color: ${(props) => (props.isDark ? "#363636" : "#fff")};
    flex-shrink: 0;
    position: relative;

    @media (max-width: 1200px) {
        padding: 0 2rem;
    }
    @media (max-width: 768px) {
        padding: 0 1rem;
    }
`;


export const Logo = styled.div`
    margin: 0 4rem 0 12.25rem;

    a img {
        height: 2.1rem;
        width: auto;
    }

    @media (max-width: 1200px) {
        margin: 0 2rem 0 2rem;
    }
    @media (max-width: 768px) {
        margin: 0 1rem 0 1rem;
        a img {
            height: 1.5rem;
        }
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

        if (currentPath.includes("/market")) {
            return itemPath === "/market" ? "#FFF" : "#8F8F8F";
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
    
    &:visited,
    &:active,
    &:focus {
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

            if (currentPath.includes("/market")) {
                return itemPath === "/market" ? "#FFF" : "#8F8F8F";
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
        outline: none;
    }

    @media (max-width: 1200px) {
        margin-left: 2rem;
        font-size: 0.8rem;
    }
    @media (max-width: 768px) {
        margin-left: 1rem;
        font-size: 0.75rem;
    }
    @media (max-width: 480px) {
        margin-left: 0.5rem;
        font-size: 0.7rem;
    }
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

    @media (max-width: 1200px) {
        right: 2rem;
    }
    @media (max-width: 768px) {
        right: 1rem;
        height: 1.3rem;
        font-size: 0.65rem;
        padding: 0.3rem 0.5rem;
    }
    @media (max-width: 960px) {
        display: flex; /* 960px 이하일 때만 보임 */
    }
`;
