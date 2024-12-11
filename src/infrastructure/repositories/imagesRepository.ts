import { imagesService, ImagesService } from "../services/imagesService";

export class ImagesRepository {
  private static instance: ImagesRepository;
  private imagesService: ImagesService;

  public constructor(imagesService: ImagesService) {
    this.imagesService = imagesService;
  }

  static getInstance(imagesService: ImagesService): ImagesRepository {
    if (!ImagesRepository.instance) {
      ImagesRepository.instance = new ImagesRepository(imagesService);
    }
    return ImagesRepository.instance;
  }

  async getImages(): Promise<string[]> {
    return this.imagesService.getImages();
  }
}

export const imagesRepository = ImagesRepository.getInstance(imagesService);
