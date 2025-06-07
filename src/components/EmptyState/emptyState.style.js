import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 1.5rem;
`;

export const Image = styled.img`
  height: 5rem;
  margin-bottom: 1.3rem;
`;

export const Message = styled.p`
  color: #000;
  text-align: center;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 1.2rem;
`;

export const SubMessage = styled.p`
  color: #888;
  text-align: center;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 1.2rem;
`;

export const RetryButton = styled.button`
  display: flex;
  height: 1.9rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
  border-radius: 1rem;
  background: #000;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
`;

export const RetryText = styled.span`
  color: #fff;
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 400;
`; 