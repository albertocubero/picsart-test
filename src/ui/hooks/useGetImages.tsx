import { useState, useEffect } from "react";

const useGetImages = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = () => {
      const fetchedImages = [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ];
      setTimeout(() => {
        setImages(fetchedImages);
        setIsLoading(false);
      }, 500);
    };

    fetchImages();
  }, []);

  return { images, isLoading };
};

export default useGetImages;
