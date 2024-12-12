import { GetImagesUseCase } from "./getImagesUseCase";
import { ImagesRepository } from "@/infrastructure/repositories/imagesRepository";

describe("GetImagesUseCase", () => {
  it("should return the same instance from getInstance()", () => {
    const instance1 = GetImagesUseCase.getInstance();
    const instance2 = GetImagesUseCase.getInstance();

    expect(instance1).toBe(instance2);
  });

  it("should return images after calling execute()", async () => {
    const mockImages = [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
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
