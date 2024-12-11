import { imagesRepository } from "../../infrastructure/repositories/imagesRepository";

class GetImagesUseCase {
  private static instance: GetImagesUseCase;

  private constructor() {}

  static getInstance(): GetImagesUseCase {
    if (!GetImagesUseCase.instance) {
      GetImagesUseCase.instance = new GetImagesUseCase();
    }
    return GetImagesUseCase.instance;
  }

  async execute(): Promise<string[]> {
    return imagesRepository.getImages();
  }
}

export const getImagesUseCase = GetImagesUseCase.getInstance();
