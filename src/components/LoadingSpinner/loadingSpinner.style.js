import styled from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.25rem; // 100px -> 6.25rem
`;

export const SpinnerCircle = styled.div`
  width: 2.5rem;   // 40px -> 2.5rem
  height: 2.5rem;  // 40px -> 2.5rem
  border: 0.25rem solid rgba(0, 0, 0, 0.1); // 4px -> 0.25rem
  border-top-color: #000;
  border-radius: 50%;
  transform: rotate(${props => props.rotation}deg);
  transition: transform 0.05s linear;
`;