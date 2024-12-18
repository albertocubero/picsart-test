import React, { memo } from "react";
import styled from "styled-components";
import ButtonBack from "@/ui/detailPage/ButtonBack";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(90deg, #3498db, #2980b9);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DetailPageHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <ButtonBack />
    </HeaderContainer>
  );
};

export default memo(DetailPageHeader);
