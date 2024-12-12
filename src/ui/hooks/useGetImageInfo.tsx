import { useState, useEffect } from "react";
import { getImageInfoUseCase } from "@/domain/useCases/getImageInfoUseCase";

const useGetImageInfo = (id: string) => {
  const [imageInfo, setImageInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImageInfo = async () => {
      try {
        const fetchedImageInfo = await getImageInfoUseCase.execute(id);
        setImageInfo(fetchedImageInfo);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching image info:", error);
        setIsLoading(false);
      }
    };

    fetchImageInfo();
  }, [id]);

  return { imageInfo, isLoading };
};

export default useGetImageInfo;