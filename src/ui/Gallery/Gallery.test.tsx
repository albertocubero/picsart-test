import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { renderWithRouter } from "@/test-utils/renderWithRouter";
import Gallery from "@/ui/Gallery/Gallery";

jest.mock("@/ui/hooks/useGetImages", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const useGetImagesMock = require("@/ui/hooks/useGetImages").default;

describe("Gallery Component", () => {
  it("should render loading state", () => {
    useGetImagesMock.mockReturnValue({
      isLoading: true,
      images: [],
    });

    renderWithRouter({
      route: "/",
      children: (
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      ),
    });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("should render images when available", () => {
    const imagesFetched = [
      { id: "1", url: "https://via.placeholder.com/150" },
      { id: "2", url: "https://via.placeholder.com/150" },
      { id: "3", url: "https://via.placeholder.com/150" },
    ]
    useGetImagesMock.mockReturnValue({
      isLoading: false,
      images: imagesFetched
    });

    renderWithRouter({
      route: "/",
      children: (
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      ),
    });

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);

    images.forEach((image, index) => {
      const link = image.closest("a");
      expect(link).toHaveAttribute("href", `/image/${imagesFetched[index].id}`);
      expect(image).toHaveAttribute("src", `${imagesFetched[index].url}`);
      expect(image).toHaveAttribute("alt", `Image ${imagesFetched[index].id}`);
    });
  });

  it("should render No images available when the array is empty", () => {
    useGetImagesMock.mockReturnValue({
      isLoading: false,
      images: [],
    });

    renderWithRouter({
      route: "/image/1",
      children: (
        <Routes>
          <Route path="/image/:id" element={<Gallery />} />
        </Routes>
      ),
    });

    expect(screen.getByText(/No images available/i)).toBeInTheDocument();
  });
});
