import { renderHook, waitFor, act } from "@testing-library/react";
import useGetImageInfo from "./useGetImageInfo";
import { getImageInfoUseCase } from "@/domain/useCases/getImageInfoUseCase";

jest.mock("@/domain/useCases/getImageInfoUseCase", () => ({
  getImageInfoUseCase: {
    execute: jest.fn(),
  },
}));

describe("useGetImageInfo", () => {
  it("should initially be loading", async () => {
    const { result } = renderHook(() => useGetImageInfo("12345"));

    await act(async () => {
      expect(result.current.isLoading).toBe(true);
      expect(result.current.imageInfo).toBeNull();
    });
  });

  it("should return image details after the fetch is complete", async () => {
    const mockImageInfo = {
      id: "12345",
      url: "https://www.pexels.com/photo/12345",
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

});
