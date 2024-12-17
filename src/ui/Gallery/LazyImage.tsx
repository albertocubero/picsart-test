import React, { memo } from "react";

interface LazyImageProps {
  url: string;
  height: number;
}

export const LazyImage: React.FC<LazyImageProps> = memo(
  ({ url, height }) => {
    return (
      <div
        data-testid="lazy-image"
        style={{
          width: "100%",
          height: `${height}px`,
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "16px",
          borderRadius: "8px",
        }}
      />
    );
  }
);
