import React from "react";

interface LazyLoadingImageProps {
  id: string;
  url: string;
}

export const LazyLoadingImage: React.FC<LazyLoadingImageProps> = ({
  url,
  id,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        minHeight: "200px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
      }}
    >
      <img
        src={url}
        alt={`Image ${id}`}
        loading="lazy"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};
