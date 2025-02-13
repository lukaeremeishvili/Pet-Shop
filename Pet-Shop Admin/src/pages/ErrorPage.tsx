import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PAGE } from "./pageConig";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #d32f2f;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-top: 20px;
  background-color: #1d69e4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0062ff;
  }
`;

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => navigate(PAGE.base);

  return (
    <Container>
      <Heading>404 - Page Not Found</Heading>
      <Button onClick={goHome}>Go Back to Home</Button>
    </Container>
  );
};

export default ErrorPage;
