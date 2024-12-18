import React, { memo } from "react";
import styled from "styled-components";
import { LazyImage } from "@/ui/galleryPage/LazyImage";

const InfoContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 100%;
  margin-bottom: 24px;

  @media (min-width: 1024px) {
    max-width: 33.33%;
    margin-bottom: 0;
    margin-right: 16px;
    height: 100vh;
  }
`;

const InfoRow = styled.div`
  margin-bottom: 12px;
  font-size: 1rem;
  color: #555;

  a {
    color: #3498db;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LazyImageWrapper = styled.div`
  width: 100%;
  margin: 0 0 24px 0;
  // aspect-ratio: 16/9; /* Aquí se establece una relación de aspecto de 16:9 para la altura proporcional */

  @media (min-width: 1024px) {
    max-width: 66.66%;
    margin: 0;
    // aspect-ratio: unset; /* Desactiva la proporción en resoluciones grandes */
  }
`;

interface ImageDetailsProps {
  imageInfo: {
    id: string;
    photographer: string;
    photographer_url: string;
    alt: string;
    src: string;
  };
}

const ImageDetails: React.FC<ImageDetailsProps> = memo(({ imageInfo }) => (
  <>
    <InfoContainer>
      <InfoRow>
        <strong>Image ID:</strong> {imageInfo.id}
      </InfoRow>
      <InfoRow>
        <strong>Photographer:</strong>{" "}
        <a
          href={imageInfo.photographer_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {imageInfo.photographer}
        </a>
      </InfoRow>
      <InfoRow>
        <strong>Description:</strong> {imageInfo.alt || "No description"}
      </InfoRow>
    </InfoContainer>
    <LazyImageWrapper>
      <LazyImage url={imageInfo.src} height={"100vh"} />
    </LazyImageWrapper>
  </>
));

export default ImageDetails;
