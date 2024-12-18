import React from "react";
import styled from "styled-components";

const LoadingMessageWrapper = styled.p`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  background-color: red;
  color: white;
  padding: 8px;
  border-radius: 4px;
`;

export const LoadingMessage: React.FC = () => (
  <LoadingMessageWrapper data-testid="loading-message">
    Loading more images...
  </LoadingMessageWrapper>
);
