import React from "react";
import styled from "styled-components";

const ErrorMessageWrapper = styled.p`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  color: white;
  background-color: red;
  padding: 8px;
`;

export const ErrorMessage: React.FC = () => (
  <ErrorMessageWrapper data-testid="error-message">
    Error loading images. Please try again.
  </ErrorMessageWrapper>
);
