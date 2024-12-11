import { getImagesUseCase } from "./getImagesUseCase";

describe("GetImagesUseCase", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return the same instance from getInstance()", () => {
    const instance1 = getImagesUseCase;
    const instance2 = getImagesUseCase;

    expect(instance1).toBe(instance2);
  });

  it("should return images after calling execute()", async () => {
    const mockImages = [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ];

    jest.spyOn(getImagesUseCase, "execute").mockResolvedValue(mockImages);

    const images = await getImagesUseCase.execute();

    expect(images).toEqual(mockImages);
  });

  it("should return a promise that resolves after a delay", async () => {
    const promise = getImagesUseCase.execute();

    expect(promise).toBeInstanceOf(Promise);

    jest.advanceTimersByTime(500);

    await expect(promise).resolves.toEqual([
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ]);
  });
});
