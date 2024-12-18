import React, { memo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetImageInfo from "@/ui/hooks/useGetImageInfo";
import styled from "styled-components";
import { LazyImage } from "@/ui/galleryPage/LazyImage";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 24px;
  text-align: center;
  color: #333;
`;

const InfoContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 24px;
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
  max-width: 800px;
  margin: 16px 0;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #888;
  text-align: center;
`;

const BackButton = styled.button`
  padding: 10px 16px;
  background-color: #3498db;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    background-color: #1f6391;
  }

  margin-bottom: 24px;
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
    <LazyImageWrapper>
      <LazyImage url={imageInfo.src} height={400} />
    </LazyImageWrapper>
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
  </>
));

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (!id) {
    return <LoadingText>Image ID is required</LoadingText>;
  }

  const { imageInfo, isLoading } = useGetImageInfo(id);

  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  if (!imageInfo) {
    return <LoadingText>Image not found</LoadingText>;
  }

  return (
    <Container>
      <Header>Image Detail</Header>
      <BackButton onClick={handleBackClick}>← Back to Gallery</BackButton>
      <ImageDetails imageInfo={imageInfo} />
    </Container>
  );
};

export default memo(DetailPage);
