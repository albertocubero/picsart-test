import { screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "@/test-utils/renderWithRouter";
import DetailPage from "./DetailPage";
import useGetImageInfo from "@/ui/hooks/useGetImageInfo";
import { Route, Routes } from "react-router-dom";

jest.mock("@/ui/hooks/useGetImageInfo", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/ui/detailPage/DetailPageHeader", () => ({
  __esModule: true,
  default: () => <div>Header</div>,
}));

jest.mock("@/ui/detailPage/ImageDetailsContainer", () => ({
  __esModule: true,
  default: ({ imageInfo }: { imageInfo: { id: string } }) => <div>{imageInfo.id}</div>,
}));

jest.mock("@/ui/detailPage/LoadingText", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("DetailPage", () => {

  const mockImageInfo = {
    id: "12345",
    photographer: "John Doe",
    photographer_url: "https://example.com",
    alt: "A beautiful landscape",
    src: "https://example.com/image.jpg",
  };
  
  it("shows loading text while fetching data", async () => {
    (useGetImageInfo as jest.Mock).mockReturnValue({ imageInfo: null, isLoading: true });
    
    renderWithRouter({
      route: "/image/1",
      children: (
        <Routes>
          <Route path="/image/:id" element={<DetailPage />} />
        </Routes>
      ),
    });

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  it("shows error message if no image found", () => {
    (useGetImageInfo as jest.Mock).mockReturnValue({ imageInfo: null, isLoading: false });
    renderWithRouter({
      route: "/image/1",
      children: (
        <Routes>
          <Route path="/image/:id" element={<DetailPage />} />
        </Routes>
      ),
    });
    expect(screen.getByText("Image not found")).toBeInTheDocument();
  });

  it("shows image details when data is fetched", async () => {
    (useGetImageInfo as jest.Mock).mockReturnValue({ imageInfo: mockImageInfo, isLoading: false });
    renderWithRouter({
      route: "/image/1",
      children: (
        <Routes>
          <Route path="/image/:id" element={<DetailPage />} />
        </Routes>
      ),
    });
    await waitFor(() => {
      expect(screen.getByText(mockImageInfo.id)).toBeInTheDocument();
    });
  });

  it("shows 'Image ID is required' if no id in params", () => {
    renderWithRouter({
      route: "/image/",
      children: (
        <Routes>
          <Route path="/image/" element={<DetailPage />} />
        </Routes>
      ),
    });
    expect(screen.getByText("Image ID is required")).toBeInTheDocument();
  });
});
