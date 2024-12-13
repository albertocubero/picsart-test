import { ImagesRepository } from "@/infrastructure/repositories/imagesRepository";

describe("ImagesRepository", () => {
  it("should always return the same instance", () => {
    const firstInstance = ImagesRepository.getInstance();
    const secondInstance = ImagesRepository.getInstance();

    expect(firstInstance).toBe(secondInstance);
  });

  it("should return a list of image URLs", async () => {
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

    const images = await imagesRepository.getImages();

    expect(images).toEqual(mockImages);
  });

  it("should return image details for a specific image by ID", async () => {
    const imageId = "12345";
    const mockImageDetails = {
      id: imageId,
      url: `https://www.pexels.com/photo/${imageId}`,
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
