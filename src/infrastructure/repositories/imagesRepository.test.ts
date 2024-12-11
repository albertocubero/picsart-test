import { imagesRepository } from "./imagesRepository";
import { imagesService } from "../services/imagesService";

jest.mock("../services/imagesService");

describe("ImagesRepository Singleton", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return a list of image URLs", async () => {
    const mockImages = [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ];
    
    (imagesService.getImages as jest.Mock).mockResolvedValue(mockImages);
    
    const images = await imagesRepository.getImages();

    expect(images).toEqual(mockImages);
  });

  it("should always return the same instance", () => {
    const firstInstance = imagesRepository;
    const secondInstance = imagesRepository;

    expect(firstInstance).toBe(secondInstance);
  });

  it("should resolve after the simulated delay", async () => {
    const mockImages = [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ];
    (imagesService.getImages as jest.Mock).mockResolvedValue(mockImages);

    const promise = imagesRepository.getImages();

    jest.advanceTimersByTime(500);

    await expect(promise).resolves.toEqual(mockImages);
  });
});
