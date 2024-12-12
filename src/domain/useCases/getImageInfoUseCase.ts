import { imagesRepository, ImagesRepository } from "@/infrastructure/repositories/imagesRepository";

export class GetImageInfoUseCase {
  private static instance: GetImageInfoUseCase;
  private imagesRepository: ImagesRepository;

  public constructor(imagesRepository: ImagesRepository) {
    this.imagesRepository = imagesRepository;
  }

  static getInstance(): GetImageInfoUseCase {
    if (!GetImageInfoUseCase.instance) {
      GetImageInfoUseCase.instance = new GetImageInfoUseCase(imagesRepository);
    }
    return GetImageInfoUseCase.instance;
  }

  async execute(id: string): Promise<any> {
    return this.imagesRepository.getImageById(id);
  }
}

export const getImageInfoUseCase = GetImageInfoUseCase.getInstance();
