import { imagesRepository, IImagesRepository } from "@/infrastructure/repositories/imagesRepository";
import { IImage } from "../interfaces/IImage";

export class GetImagesUseCase {
  private static instance: GetImagesUseCase;
  private imagesRepository: IImagesRepository;

  public constructor(imagesRepository: IImagesRepository) {
    this.imagesRepository = imagesRepository;
  }

  static getInstance(): GetImagesUseCase {
    if (!GetImagesUseCase.instance) {
      GetImagesUseCase.instance = new GetImagesUseCase(imagesRepository);
    }
    return GetImagesUseCase.instance;
  }

  async execute(page: number): Promise<IImage[]> {
    return this.imagesRepository.getImages(page);
  }
}

export const getImagesUseCase = GetImagesUseCase.getInstance();
