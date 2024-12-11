import React, { useEffect, useState } from "react";

const List: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialImages = [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ];
    setTimeout(() => {
      setImages(initialImages);
      setIsLoading(false);
    }, 500);
  }, []);

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
