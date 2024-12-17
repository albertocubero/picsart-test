import { renderHook, waitFor, act } from "@testing-library/react";
import useGetImages from "./useGetImages";
import { getImagesUseCase } from "@/domain/useCases/getImagesUseCase";

jest.mock("@/domain/useCases/getImagesUseCase", () => ({
  getImagesUseCase: {
    execute: jest.fn(),
  },
}));

describe("useGetImages", () => {
  it("should initially be loading", async () => {
    const { result } = renderHook(() => useGetImages());

    await act(async () => {
      expect(result.current.isLoading).toBe(true);
      expect(result.current.images).toEqual([]);
    });
  });

  it("should return images after the fetch is complete", async () => {
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

    (getImagesUseCase.execute as jest.Mock).mockResolvedValue(mockImages);

    const { result } = renderHook(() => useGetImages());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.images).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.images).toEqual(mockImages);
    });
  });

});
