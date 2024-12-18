import { render, screen } from "@testing-library/react";
import ImageDetails from "./ImageDetails";

jest.mock("@/ui/galleryPage/LazyImage", () => ({
  __esModule: true,
  LazyImage: jest.fn(() => <div>Mocked LazyImage</div>),
}));

describe("ImageDetails Component", () => {
  it("renders ImageDetails with correct image info", () => {
    const imageInfo = {
      id: "1",
      photographer: "John Doe",
      photographer_url: "https://example.com",
      alt: "A beautiful sunset",
      src: "https://example.com/sunset.jpg",
    };

    render(<ImageDetails imageInfo={imageInfo} />);
    
    expect(screen.getByText("Mocked LazyImage")).toBeInTheDocument();

    expect(screen.getByText(/Image ID:/)).toBeInTheDocument();
    expect(screen.getByText(imageInfo.id)).toBeInTheDocument();
    
    expect(screen.getByText("Photographer:")).toBeInTheDocument();
    expect(screen.getByText(imageInfo.photographer)).toBeInTheDocument();
    
    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByText(imageInfo.alt)).toBeInTheDocument();

    const photographerLink = screen.getByRole("link");
    expect(photographerLink).toHaveAttribute("href", imageInfo.photographer_url);
  });
});
