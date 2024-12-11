import { imagesRepository, ImagesRepository } from "../../infrastructure/repositories/imagesRepository";

export class GetImagesUseCase {
  private static instance: GetImagesUseCase;
  private imagesRepository: ImagesRepository;

  public constructor(imagesRepository: ImagesRepository) {
    this.imagesRepository = imagesRepository;
  }

  static getInstance(): GetImagesUseCase {
    if (!GetImagesUseCase.instance) {
      GetImagesUseCase.instance = new GetImagesUseCase(imagesRepository);
    }
    return GetImagesUseCase.instance;
  }

  async execute(): Promise<string[]> {
    return this.imagesRepository.getImages();
  }
}

export const getImagesUseCase = GetImagesUseCase.getInstance();
