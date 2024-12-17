import { IImagesService } from "@/infrastructure/services/imagesService";
import { cachedImagesService } from "@/infrastructure/services/cachedImagesService";

export interface IImagesRepository {
  getImages(page: number): Promise<{ id: string; url: string }[]>;
  getImageById(id: string): Promise<any>;
}

export class ImagesRepository implements IImagesRepository {
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

  async getImages(page: number): Promise<{ id: string; url: string }[]> {
    return this.imagesService.getImages(page);
  }

  async getImageById(id: string): Promise<any> {
    return this.imagesService.getImageById(id);
  }
}

export const imagesRepository = ImagesRepository.getInstance();
