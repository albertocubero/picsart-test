import React from "react";
import { Link } from "react-router-dom";
import useGetImages from "@/ui/hooks/useGetImages";

const Gallery: React.FC = () => {
  const { images, isLoading } = useGetImages();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {images.length === 0 ? (
        <p>No images available</p>
      ) : (
        <>
          {images.map(({ id, url }) => (
            <Link key={id} to={`/image/${id}`}>
              <img
                src={url}
                alt={`Image ${id}`}
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Gallery;
