import { CachedImagesService } from "./cachedImagesService";
import { IImagesService } from "./imagesService";
import { LocalStorageCache } from "./LocalStorageCache";

describe("CachedImagesService", () => {
  let mockLocalStorageCache: jest.Mocked<LocalStorageCache>;
  let mockImagesService: jest.Mocked<IImagesService>;
  let cachedImagesService: CachedImagesService;

  beforeEach(() => {
    mockImagesService = {
      getImages: jest.fn(),
      getImageById: jest.fn(),
    };

    mockLocalStorageCache = {
      getFromStorage: jest.fn(),
      saveToStorage: jest.fn(),
    };

    cachedImagesService = new CachedImagesService(
      mockLocalStorageCache,
      mockImagesService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getImages", () => {
    it("should return cached images if data is in localStorage", async () => {
      const cachedImages = [
        {
          id: "12345",
          url: "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg",
        },
        {
          id: "67890",
          url: "https://images.pexels.com/photos/67890/pexels-photo-67890.jpeg",
        },
      ];

      mockLocalStorageCache.getFromStorage.mockReturnValueOnce(cachedImages);

      const result = await cachedImagesService.getImages();

      expect(result).toEqual(cachedImages);
      expect(mockLocalStorageCache.getFromStorage).toHaveBeenCalledWith(
        "pexels_images"
      );
      expect(mockImagesService.getImages).not.toHaveBeenCalled();
    });

    it("should fetch and cache images if data is not in localStorage", async () => {
      const fetchedImages = [
        {
          id: "12345",
          url: "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg",
        },
        {
          id: "67890",
          url: "https://images.pexels.com/photos/67890/pexels-photo-67890.jpeg",
        },
      ];

      mockLocalStorageCache.getFromStorage.mockReturnValueOnce(null);

      mockImagesService.getImages.mockResolvedValueOnce(fetchedImages);

      const result = await cachedImagesService.getImages();

      expect(result).toEqual(fetchedImages);
      expect(mockLocalStorageCache.getFromStorage).toHaveBeenCalledWith(
        "pexels_images"
      );
      expect(mockLocalStorageCache.saveToStorage).toHaveBeenCalledWith(
        "pexels_images",
        fetchedImages
      );
      expect(mockImagesService.getImages).toHaveBeenCalled();
    });
  });

  describe("getImageById", () => {
    it("should return cached image if data is in localStorage", async () => {
      const imageId = "12345";
      const cachedImageData = {
        id: imageId,
        url: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg`,
        photographer: "John Doe",
        photographer_url: "https://www.pexels.com/@johndoe",
        alt: "A beautiful sunset",
        src: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg`,
      };

      mockLocalStorageCache.getFromStorage.mockReturnValueOnce(cachedImageData);

      const result = await cachedImagesService.getImageById(imageId);

      expect(result).toEqual(cachedImageData);
      expect(mockLocalStorageCache.getFromStorage).toHaveBeenCalledWith(
        `pexels_image_${imageId}_info`
      );
      expect(mockImagesService.getImageById).not.toHaveBeenCalled();
    });

    it("should fetch and cache image if data is not in localStorage", async () => {
      const imageId = "12345";
      const fetchedImageData = {
        id: imageId,
        url: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg`,
        photographer: "John Doe",
        photographer_url: "https://www.pexels.com/@johndoe",
        alt: "A beautiful sunset",
        src: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg`,
      };

      mockLocalStorageCache.getFromStorage.mockReturnValueOnce(null);

      mockImagesService.getImageById.mockResolvedValueOnce(fetchedImageData);

      const result = await cachedImagesService.getImageById(imageId);

      expect(result).toEqual(fetchedImageData);
      expect(mockLocalStorageCache.getFromStorage).toHaveBeenCalledWith(
        `pexels_image_${imageId}_info`
      );
      expect(mockLocalStorageCache.saveToStorage).toHaveBeenCalledWith(
        `pexels_image_${imageId}_info`,
        fetchedImageData
      );
      expect(mockImagesService.getImageById).toHaveBeenCalledWith(imageId);
    });
  });
});
