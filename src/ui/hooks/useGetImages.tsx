import { useState, useEffect } from "react";
import { getImagesUseCase } from "../../domain/useCases/getImagesUseCase";

const useGetImages = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getImagesUseCase.execute();
        setImages(fetchedImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, isLoading };
};

export default useGetImages;
