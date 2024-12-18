import { renderHook, waitFor } from "@testing-library/react";
import useGetImageInfo from "./useGetImageInfo";
import { getImageInfoUseCase } from "@/domain/useCases/getImageInfoUseCase";

jest.mock("@/domain/useCases/getImageInfoUseCase", () => ({
  getImageInfoUseCase: {
    execute: jest.fn(),
  },
}));

describe("useGetImageInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initially be loading", async () => {
    const { result } = renderHook(() => useGetImageInfo("12345"));

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    
    expect(result.current.imageInfo).toBeUndefined();
  });

  it("should return image details after the fetch is complete", async () => {
    const imageId = "12345";
    const mockImageInfo = {
      id: imageId,
      url: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg`,
      photographer: "John Doe",
      photographer_url: "https://www.pexels.com/@johndoe",
      alt: "A beautiful sunset over the ocean",
      src: "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg",
    };

    (getImageInfoUseCase.execute as jest.Mock).mockResolvedValue(mockImageInfo);

    const { result } = renderHook(() => useGetImageInfo("12345"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.imageInfo).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.imageInfo).toEqual(mockImageInfo);
    });
  });

  it("should handle errors if the fetch fails", async () => {
    (getImageInfoUseCase.execute as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    const { result } = renderHook(() => useGetImageInfo("12345"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.imageInfo).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(true);
    });
  });
});
