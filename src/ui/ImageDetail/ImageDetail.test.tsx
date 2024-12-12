import { screen, waitFor } from "@testing-library/react";
import ImageDetail from "./ImageDetail";
import useGetImageInfo from "@/ui/hooks/useGetImageInfo";
import { renderWithRouter } from "@/test-utils/renderWithRouter";
import { Route, Routes } from "react-router-dom";


jest.mock("@/ui/hooks/useGetImageInfo", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ImageDetail", () => {
  it("should render 'Image ID is required' when no id is provided", () => {
    renderWithRouter({
      route: "/image-detail",
      children: (
        <Routes>
          <Route path="/image-detail" element={<ImageDetail />} />
        </Routes>
      ),
    });

    expect(screen.getByText("Image ID is required")).toBeInTheDocument();
  });

  it("should display loading message while fetching image info", () => {
    (useGetImageInfo as jest.Mock).mockReturnValue({
      imageInfo: null,
      isLoading: true,
    });

    renderWithRouter({
      route: "/image/123",
      children: (
        <Routes>
          <Route path="/image/:id" element={<ImageDetail />} />
        </Routes>
      ),
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display 'Image not found' when imageInfo is not available", () => {
    (useGetImageInfo as jest.Mock).mockReturnValue({
      imageInfo: null,
      isLoading: false,
    });

    renderWithRouter({
      route: "/image/123",
      children: (
        <Routes>
          <Route path="/image/:id" element={<ImageDetail />} />
        </Routes>
      ),
    });

    expect(screen.getByText("Image not found")).toBeInTheDocument();
  });

  it("should display image details when imageInfo is available", async () => {
    const mockImageInfo = {
      id: "123",
      photographer: "John Doe",
      photographer_url: "https://www.pexels.com/@johndoe",
      alt: "A beautiful sunset",
      src: "https://images.pexels.com/photos/123/pexels-photo.jpeg",
    };

    (useGetImageInfo as jest.Mock).mockReturnValue({
      imageInfo: mockImageInfo,
      isLoading: false,
    });

    renderWithRouter({
      route: "/image/123",
      children: (
        <Routes>
          <Route path="/image/:id" element={<ImageDetail />} />
        </Routes>
      ),
    });

    await waitFor(() => expect(screen.getByText("Image ID: 123")).toBeInTheDocument());
    expect(screen.getByText("Photographer: John Doe")).toBeInTheDocument();
    expect(screen.getByText("View photographer's profile")).toBeInTheDocument();
    expect(screen.getByAltText("A beautiful sunset")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockImageInfo.src);
  });
});
