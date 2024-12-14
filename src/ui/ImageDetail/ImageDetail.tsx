import React, { memo } from "react";
import { useParams } from "react-router-dom";
import useGetImageInfo from "@/ui/hooks/useGetImageInfo";

const ImageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Image ID is required</p>;
  }

  const { imageInfo, isLoading } = useGetImageInfo(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!imageInfo) {
    return <p>Image not found</p>;
  }

  return (
    <div>
      <h1>Image Detail</h1>
      <p>Image ID: {imageInfo.id}</p>
      <p>Photographer: {imageInfo.photographer}</p>
      <p>
        <a href={imageInfo.photographer_url} target="_blank" rel="noopener noreferrer">
          View photographer's profile
        </a>
      </p>
      <p>{imageInfo.alt}</p>
      <img
        src={imageInfo.src}
        alt={imageInfo.alt}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default memo(ImageDetail);
