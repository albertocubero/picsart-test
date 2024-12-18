import React, { memo } from "react";
import styled from "styled-components";
import ImageDetails from "@/ui/detailPage/ImageDetails";

const Container = styled.div`
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  backgroundColor: red;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

interface ImageDetailsContainerProps {
  imageInfo: any;
}

const ImageDetailsContainer: React.FC<ImageDetailsContainerProps> = ({ imageInfo }) => {
  return (
    <Container>
      <ImageDetails imageInfo={imageInfo} />
    </Container>
  );
};

export default memo(ImageDetailsContainer);
