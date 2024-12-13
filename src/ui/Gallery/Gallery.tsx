import React from "react";
import { Link } from "react-router-dom";
import useGetImages from "@/ui/hooks/useGetImages";

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
        <>
          {images.map(({ id, url }) => (
            <Link key={id} to={`/image/${id}`} style={{ flex: "1 0 400px" }}>
              <img
                src={url}
                alt={`Image ${id}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Gallery;
