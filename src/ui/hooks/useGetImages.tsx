import { useState, useEffect } from "react";
import { getImagesUseCase } from "@/domain/useCases/getImagesUseCase";

export interface UseGetImagesResult {
  images: Image[];
  isLoading: boolean;
}

interface Image {
  id: string;
  url: string;
}

const useGetImages = (page: number = 1): UseGetImagesResult => {
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const fetchedImages = await getImagesUseCase.execute(page);
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  return { images, isLoading };
};

export default useGetImages;
