import { ImagesRepository } from "@/infrastructure/repositories/imagesRepository";

describe("ImagesRepository", () => {
  it("should always return the same instance", () => {
    const firstInstance = ImagesRepository.getInstance();
    const secondInstance = ImagesRepository.getInstance();

    expect(firstInstance).toBe(secondInstance);
  });

  it("should return a list of image URLs", async () => {
    const page = 1;
    const mockImages = [
      {
        id: "12345",
        url: "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg",
      },
      {
        id: "67890",
        url: "https://images.pexels.com/photos/67890/pexels-photo-67890.jpeg",
      },
    ];
    const imagesServiceMock = {
      getImages: jest.fn().mockResolvedValue(mockImages),
      getImageById: jest.fn(),
    };
    const imagesRepository = new ImagesRepository(imagesServiceMock);

    const images = await imagesRepository.getImages(page);

    expect(images).toEqual(mockImages);
    expect(imagesServiceMock.getImages).toHaveBeenCalledWith(page)
  });

  it("should return image details for a specific image by ID", async () => {
    const imageId = "12345";
    const mockImageDetails = {
      id: imageId,
      url: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg`,
      photographer: "John Doe",
      photographer_url: "https://www.pexels.com/@johndoe",
      alt: "A beautiful sunset over the ocean",
      src: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345.jpeg`,
    };

    const imagesServiceMock = {
      getImages: jest.fn().mockResolvedValue([]),
      getImageById: jest.fn().mockResolvedValue(mockImageDetails),
    };

    const imagesRepository = new ImagesRepository(imagesServiceMock);
    const imageDetails = await imagesRepository.getImageById(imageId);

    expect(imageDetails).toEqual(mockImageDetails);
    expect(imagesServiceMock.getImageById).toHaveBeenCalledWith(imageId);
  });
});
