import { useState, useEffect } from "react";
import { getImagesUseCase } from "@/domain/useCases/getImagesUseCase";

export interface UseGetImagesResult {
  images: Image[];
  isLoading: boolean;
  isError: boolean;
}

interface Image {
  id: string;
  url: string;
}

const useGetImages = (page: number = 1): UseGetImagesResult => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedImages = await getImagesUseCase.execute(page);
        setImages(fetchedImages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  return { images, isLoading, isError };
};

export default useGetImages;
