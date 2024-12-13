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
  it("renders loading state", () => {
    useGetImagesMock.mockReturnValue({
      isLoading: true,
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

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders images when available", () => {
    useGetImagesMock.mockReturnValue({
      isLoading: false,
      images: [
        { id: "1", url: "https://via.placeholder.com/150" },
        { id: "2", url: "https://via.placeholder.com/150" },
        { id: "3", url: "https://via.placeholder.com/150" },
      ],
    });

    renderWithRouter({
      route: "/image/1",
      children: (
        <Routes>
          <Route path="/image/:id" element={<Gallery />} />
        </Routes>
      ),
    });

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);

    images.forEach((image, index) => {
      const link = image.closest("a");
      expect(link).toHaveAttribute("href", `/image/${index + 1}`);
      expect(image).toHaveAttribute("src", `https://via.placeholder.com/150`);
      expect(image).toHaveAttribute("alt", `Image ${index + 1}`);
    });
  });

  it("renders No images available when the array is empty", () => {
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
