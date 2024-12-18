import { useState, useEffect } from "react";
import { getImageInfoUseCase } from "@/domain/useCases/getImageInfoUseCase";
import { IImageDetails } from "@/domain/interfaces/IImageDetails";

export interface useGetImageInfoResult {
  imageInfo: IImageDetails | null;
  isLoading: boolean;
  isError: boolean;
}

const useGetImageInfo = (id: string): useGetImageInfoResult => {
  const [imageInfo, setImageInfo] = useState<IImageDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchImageInfo = async () => {
      try {
        const fetchedImageInfo: IImageDetails = await getImageInfoUseCase.execute(id);
        setImageInfo(fetchedImageInfo);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageInfo();
  }, [id]);

  return { imageInfo, isLoading, isError };
};

export default useGetImageInfo;
