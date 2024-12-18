import {
  imagesRepository,
  IImagesRepository,
} from "@/infrastructure/repositories/imagesRepository";
import { IImageDetails } from "../interfaces/IImageDetails";

export class GetImageInfoUseCase {
  private static instance: GetImageInfoUseCase;
  private imagesRepository: IImagesRepository;

  public constructor(imagesRepository: IImagesRepository) {
    this.imagesRepository = imagesRepository;
  }

  static getInstance(): GetImageInfoUseCase {
    if (!GetImageInfoUseCase.instance) {
      GetImageInfoUseCase.instance = new GetImageInfoUseCase(imagesRepository);
    }
    return GetImageInfoUseCase.instance;
  }

  async execute(id: string): Promise<IImageDetails> {
    return this.imagesRepository.getImageById(id);
  }
}

export const getImageInfoUseCase = GetImageInfoUseCase.getInstance();
