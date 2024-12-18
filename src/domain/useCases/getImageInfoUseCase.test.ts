import { GetImageInfoUseCase } from "./getImageInfoUseCase";
import { IImagesRepository } from "@/infrastructure/repositories/imagesRepository";

describe("GetImageInfoUseCase", () => {
  it("should return the same instance ", () => {
    const instance1 = GetImageInfoUseCase.getInstance();
    const instance2 = GetImageInfoUseCase.getInstance();

    expect(instance1).toBe(instance2);
  });

  it("should return image details after calling execute()", async () => {
    const imageId = "12345";
    const mockImageDetails = {
      id: imageId,
      url: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg`,
      photographer: "John Doe",
      photographer_url: "https://www.pexels.com/@johndoe",
      alt: "A beautiful sunset over the ocean",
      src: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345.jpeg`,
    };

    const imagesRepositoryMock = {
      getImageById: jest.fn().mockResolvedValue(mockImageDetails),
    };

    const getImageInfoUseCase = new GetImageInfoUseCase(
      imagesRepositoryMock as unknown as IImagesRepository
    );

    const imageDetails = await getImageInfoUseCase.execute(imageId);

    expect(imageDetails).toEqual(mockImageDetails);
    expect(imagesRepositoryMock.getImageById).toHaveBeenCalledWith(imageId);
  });
});
