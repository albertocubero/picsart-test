import React, { memo } from "react";
import useGetImages from "@/ui/hooks/useGetImages";
import { Card } from "./Card";

const Gallery: React.FC = () => {
  const { images, isLoading } = useGetImages();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {images.length === 0 ? (
        <p>No images available</p>
      ) : (
        images.map(({ id, url }) => <Card key={id} id={id} url={url} />)
      )}
    </div>
  );
};

export default memo(Gallery);
