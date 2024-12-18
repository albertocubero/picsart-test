import { IImage } from "@/domain/interfaces/IImage";
import { IImageDetails } from "@/domain/interfaces/IImageDetails";
import {
  IImagesService,
  imagesService,
} from "@/infrastructure/services/imagesService";
import {
  localStorageCache,
  LocalStorageCache,
} from "@/infrastructure/services/localStorageCache";

const STORAGE_KEY_PREFIX = "pexels";

export class CachedImagesService implements IImagesService {
  private static instance: CachedImagesService;
  private imageService: IImagesService;
  private localStorageCache: LocalStorageCache;

  public constructor(
    localStorageCache: LocalStorageCache,
    imageService: IImagesService
  ) {
    this.localStorageCache = localStorageCache;
    this.imageService = imageService;
  }

  static getInstance(): CachedImagesService {
    if (!CachedImagesService.instance) {
      CachedImagesService.instance = new CachedImagesService(
        localStorageCache,
        imagesService
      );
    }
    return CachedImagesService.instance;
  }

  async getImages(page: number): Promise<IImage[]> {
    const cacheKey = `${STORAGE_KEY_PREFIX}_images_${page}`;
    const cachedData: IImage[] | null =
      this.localStorageCache.getFromStorage(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const data = await this.imageService.getImages(page);
    this.localStorageCache.saveToStorage(cacheKey, data);
    return data;
  }

  async getImageById(id: string): Promise<IImageDetails> {
    const cacheKey = `${STORAGE_KEY_PREFIX}_image_${id}_info`;
    const cachedData: IImageDetails | null =
      this.localStorageCache.getFromStorage(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const data = await this.imageService.getImageById(id);
    this.localStorageCache.saveToStorage(cacheKey, data);
    return data;
  }
}

export const cachedImagesService = CachedImagesService.getInstance();
