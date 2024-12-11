import { imagesRepository } from "./imagesRepository";

describe("ImagesRepository Singleton", () => {
  it("should return a list of image URLs", async () => {
    const images = await imagesRepository.getImages();

    expect(images).toEqual([
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ]);
  });

  it("should always return the same instance", () => {
    const firstInstance = imagesRepository;
    const secondInstance = imagesRepository;

    expect(firstInstance).toBe(secondInstance);
  });
});
