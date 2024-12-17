import { screen, waitFor, fireEvent } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithRouter } from "@/test-utils/renderWithRouter";
import Gallery from "@/ui/Gallery/Gallery";
import useGetImages from "@/ui/hooks/useGetImages";

jest.mock("@/ui/hooks/useGetImages");

describe("Gallery", () => {
  it("should display a loading message when images are loading", () => {
    (useGetImages as jest.Mock).mockReturnValue({
      images: [],
      isLoading: true,
    });

    renderWithRouter({
      route: "/",
      children: (
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      ),
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display images when available", async () => {
    const mockImages = [
      { id: "1", url: "https://via.placeholder.com/150" },
      { id: "2", url: "https://via.placeholder.com/150" },
    ];

    (useGetImages as jest.Mock).mockReturnValue({
      images: mockImages,
      isLoading: false,
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
        expect(screen.getByAltText(`Image ${image.id}`)).toBeInTheDocument();
      });
    });
  });

  it("should display a message when no images are available", () => {
    (useGetImages as jest.Mock).mockReturnValue({
      images: [],
      isLoading: false,
    });

    renderWithRouter({
      route: "/",
      children: (
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      ),
    });

    expect(screen.getByText(/no images available/i)).toBeInTheDocument();
  });

  it("should load more images when scrolling to the bottom", async () => {
    const initialImages = [
      { id: "1", url: "https://via.placeholder.com/150" },
      { id: "2", url: "https://via.placeholder.com/150" },
    ];
    const newImages = [
      { id: "3", url: "https://via.placeholder.com/150" },
      { id: "4", url: "https://via.placeholder.com/150" },
    ];
    
    (useGetImages as jest.Mock).mockImplementation((currentPage) => {
      return {
        images: currentPage === 1 ? initialImages : newImages,
        isLoading: false,
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

    const galleryContainer = screen.getByTestId("gallery-container");

    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Image 2")).toBeInTheDocument();

    fireEvent.scroll(galleryContainer, {
      target: { scrollTop: galleryContainer.scrollHeight },
    });

    await waitFor(() => {
      expect(screen.getByAltText("Image 3")).toBeInTheDocument();
      expect(screen.getByAltText("Image 4")).toBeInTheDocument();
    });
  });
  
});
