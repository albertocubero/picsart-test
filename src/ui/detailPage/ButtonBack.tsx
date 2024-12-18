import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackButtonStyled = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  color: #3498db;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ecf0f1;
  }

  &:active {
    transform: scale(0.95);
    background-color: #dce1e3;
  }
`;

const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <BackButtonStyled onClick={handleBackClick} data-testid="back-button">
      ← Back
    </BackButtonStyled>
  );
};

export default ButtonBack;
