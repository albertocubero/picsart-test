import { ImagesRepository } from "./imagesRepository";

describe("ImagesRepository", () => {
  it("should always return the same instance", () => {
    const imagesServiceMock = { getImages: jest.fn() };
    const firstInstance = ImagesRepository.getInstance(imagesServiceMock);
    const secondInstance = ImagesRepository.getInstance(imagesServiceMock);

    expect(firstInstance).toBe(secondInstance);
  });

  it("should return a list of image URLs", async () => {
    const mockImages = [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ];
    const imagesServiceMock = {
      getImages: jest.fn().mockResolvedValue(mockImages),
    };
    const imagesRepository = new ImagesRepository(imagesServiceMock);

    const images = await imagesRepository.getImages();

    expect(images).toEqual(mockImages);
  });
});
