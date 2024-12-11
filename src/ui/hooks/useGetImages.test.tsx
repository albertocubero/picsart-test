import { renderHook, waitFor } from "@testing-library/react";
import useGetImages from "./useGetImages";

describe("useGetImages en Node 18", () => {
  it("Should return the loading state at the beginning", () => {
    const { result } = renderHook(() => useGetImages());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.images).toEqual([]);
  });
  it("Should return the images after the fetch call has completed", async () => {
    const { result } = renderHook(() => useGetImages());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.images).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.images).toEqual([
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ]);
    });
  });
});
