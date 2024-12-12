import { IImagesService } from "@/infrastructure/services/imagesService";
import { cachedImagesService } from "../services/cachedImagesService";

export class ImagesRepository {
  private static instance: ImagesRepository;
  private imagesService: IImagesService;

  public constructor(imagesService: IImagesService) {
    this.imagesService = imagesService;
  }

  static getInstance(): ImagesRepository {
    if (!ImagesRepository.instance) {
      ImagesRepository.instance = new ImagesRepository(cachedImagesService);
    }
    return ImagesRepository.instance;
  }

  async getImages(): Promise<{ id: string; url: string }[]> {
    return this.imagesService.getImages();
  }

  async getImageById(id: string): Promise<any> {
    return this.imagesService.getImageById(id);
  }
}

export const imagesRepository = ImagesRepository.getInstance();
