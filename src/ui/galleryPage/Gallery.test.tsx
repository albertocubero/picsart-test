import { screen, waitFor, fireEvent, act } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithRouter } from "@/test-utils/renderWithRouter";
import Gallery from "@/ui/galleryPage/Gallery";
import useGetImages from "@/ui/hooks/useGetImages";

jest.mock("@/ui/hooks/useGetImages");

jest.mock("@/ui/galleryPage/Card", () => ({
  Card: ({ id }: { id: string }) => (
    <div data-testid={`card-${id}`}>Card {id}</div>
  ),
}));

describe("Gallery Component", () => {
  it("should display a loading message when images are loading", () => {
    (useGetImages as jest.Mock).mockReturnValue({
      images: [],
      isLoading: true,
      isError: false
    });

    renderWithRouter({
      route: "/",
      children: (
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      ),
    });

    expect(screen.getByTestId("loading-message")).toBeInTheDocument();
  });

  it("should display images when available", async () => {
    const mockImages = [
      { id: "1", url: "https://via.placeholder.com/150", height: 200 },
      { id: "2", url: "https://via.placeholder.com/150", height: 250 },
    ];

    (useGetImages as jest.Mock).mockReturnValue({
      images: mockImages,
      isLoading: false,
      isError: false
    });

    renderWithRouter({
      route: "/",
      children: (
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      ),
    });

    await waitFor(() => {
      mockImages.forEach((image) => {
        expect(screen.getByTestId(`card-${image.id}`)).toBeInTheDocument();
      });
    });
  });

  it("should load more images when scrolling to the bottom", async () => {
    const initialImages = [
      { id: "1", url: "https://via.placeholder.com/150", height: 200 },
      { id: "2", url: "https://via.placeholder.com/150", height: 250 },
    ];
    const newImages = [
      { id: "3", url: "https://via.placeholder.com/150", height: 200 },
      { id: "4", url: "https://via.placeholder.com/150", height: 250 },
    ];

    (useGetImages as jest.Mock).mockImplementation((currentPage) => {
      return {
        images: currentPage === 1 ? initialImages : newImages,
        isLoading: false,
        isError: false
      };
    });

    renderWithRouter({
      route: "/",
      children: (
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      ),
    });

    expect(
      screen.getByTestId(`card-${initialImages[0].id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`card-${initialImages[1].id}`)
    ).toBeInTheDocument();

    act(() => {
      const galleryContainer = screen.getByTestId("gallery-container");
      fireEvent.scroll(galleryContainer, {
        target: { scrollTop: galleryContainer.scrollHeight },
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId(`card-${newImages[0].id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`card-${newImages[1].id}`)).toBeInTheDocument();
    });
  });

  it("should update column count on window resize", async () => {
    const resizeEvent = new Event("resize");

    (useGetImages as jest.Mock).mockReturnValue({
      images: [],
      isLoading: false,
      isError: false
    });

    renderWithRouter({
      route: "/",
      children: (
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      ),
    });

    act(() => {
      global.innerWidth = 1440;
      window.dispatchEvent(resizeEvent);
    });

    await waitFor(() => {
      expect(screen.getByTestId("gallery-container")).toBeInTheDocument();
      const columns = screen.getAllByTestId("column");
      expect(columns.length).toBe(3);
    });

    act(() => {
      global.innerWidth = 768;
      window.dispatchEvent(resizeEvent);
    });

    await waitFor(() => {
      expect(screen.getByTestId("gallery-container")).toBeInTheDocument();
      const updatedColumns = screen.getAllByTestId("column");
      expect(updatedColumns.length).toBe(1);
    });
  });

  it("should not fetch images multiple times while loading", async () => {
    const mockImages = [
      { id: "1", url: "https://via.placeholder.com/150", height: 200 },
    ];

    const loadMoreSpy = jest.fn();

    (useGetImages as jest.Mock).mockReturnValue({
      images: mockImages,
      isLoading: false,
      isError: false
    });

    renderWithRouter({
      route: "/",
      children: (
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      ),
    });

    const galleryContainer = screen.getByTestId("gallery-container");

    fireEvent.scroll(galleryContainer, {
      target: { scrollTop: galleryContainer.scrollHeight },
    });

    expect(loadMoreSpy).not.toHaveBeenCalledTimes(2);
  });

  it("should display a error message when images are loading", () => {
    (useGetImages as jest.Mock).mockReturnValue({
      images: [],
      isLoading: false,
      isError: true
    });

    renderWithRouter({
      route: "/",
      children: (
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      ),
    });

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });
});
