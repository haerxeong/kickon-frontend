import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  // 중앙 정렬
  height: 100%;
  width: 100%;
  padding: 1.5rem;
`;

const Image = styled.img`
  margin-bottom: 1.3rem;
`;

const Message = styled.p`
  color: #000;
  text-align: center;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 1.2rem;
`;

const RetryButton = styled.button`
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

const RetryText = styled.span`
  color: #fff;
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 400;
`;

export { Container, Image, Message, RetryButton, RetryText };