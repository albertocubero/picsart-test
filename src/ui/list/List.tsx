import React from "react";
import useGetImages from "@/ui/hooks/useGetImages";

const List: React.FC = () => {
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
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Image ${index + 1}`}
              style={{ width: "100%", height: "auto" }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default List;
