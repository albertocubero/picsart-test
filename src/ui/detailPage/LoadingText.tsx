import React from "react";
import styled from "styled-components";

const LoadingTextStyled = styled.p`
  font-size: 1.2rem;
  color: #888;
  text-align: center;
`;

interface LoadingTextProps {
  children: React.ReactNode;
}

const LoadingText: React.FC<LoadingTextProps> = ({ children }) => {
  return <LoadingTextStyled>{children}</LoadingTextStyled>;
};

export default LoadingText;
