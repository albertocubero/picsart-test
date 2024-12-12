import { GetImagesUseCase } from "./getImagesUseCase";
import { ImagesRepository } from "@/infrastructure/repositories/imagesRepository";

describe("GetImagesUseCase", () => {
  it("should return the same instance", () => {
    const instance1 = GetImagesUseCase.getInstance();
    const instance2 = GetImagesUseCase.getInstance();

    expect(instance1).toBe(instance2);
  });

  it("should return images after calling execute()", async () => {
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
    const imagesRepositoryMock = {
      getImages: jest.fn().mockResolvedValue(mockImages),
    };
    const getImagesUseCase = new GetImagesUseCase(
      imagesRepositoryMock as unknown as ImagesRepository
    );

    const images = await getImagesUseCase.execute();

    expect(images).toEqual(mockImages);
  });
});
