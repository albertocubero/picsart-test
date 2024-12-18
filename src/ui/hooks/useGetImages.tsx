import { useState, useEffect } from "react";
import { getImagesUseCase } from "@/domain/useCases/getImagesUseCase";
import { IImage } from "@/domain/interfaces/IImage";

export interface UseGetImagesResult {
  images: IImage[];
  isLoading: boolean;
  isError: boolean;
}

const useGetImages = (page: number = 1): UseGetImagesResult => {
  const [images, setImages] = useState<IImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedImages: IImage[] = await getImagesUseCase.execute(page);
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
