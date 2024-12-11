import { imagesService } from "../services/imagesService";

export class ImagesRepository {
  private static instance: ImagesRepository;

  private constructor() {}

  static getInstance(): ImagesRepository {
    if (!ImagesRepository.instance) {
      ImagesRepository.instance = new ImagesRepository();
    }
    return ImagesRepository.instance;
  }

  async getImages(): Promise<string[]> {
    return imagesService.getImages();
  }
}

export const imagesRepository = ImagesRepository.getInstance();
