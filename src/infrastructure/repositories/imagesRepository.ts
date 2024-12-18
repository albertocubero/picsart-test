import { IImagesService } from "@/infrastructure/services/imagesService";
import { cachedImagesService } from "@/infrastructure/services/cachedImagesService";
import { IImage } from "@/domain/interfaces/IImage";
import { IImageDetails } from "@/domain/interfaces/IImageDetails";

export interface IImagesRepository {
  getImages(page: number): Promise<IImage[]>;
  getImageById(id: string): Promise<IImageDetails>;
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

  async getImages(page: number): Promise<IImage[]> {
    return this.imagesService.getImages(page);
  }

  async getImageById(id: string): Promise<IImageDetails> {
    return this.imagesService.getImageById(id);
  }
}

export const imagesRepository = ImagesRepository.getInstance();
