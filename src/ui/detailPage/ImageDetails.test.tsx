import { render, screen } from "@testing-library/react";
import ImageDetails from "./ImageDetails";
import { IImageDetails } from "@/domain/interfaces/IImageDetails";

jest.mock("@/ui/galleryPage/LazyImage", () => ({
  __esModule: true,
  LazyImage: jest.fn(() => <div>Mocked LazyImage</div>),
}));

describe("ImageDetails Component", () => {
  it("renders ImageDetails with correct image info", () => {
    const imageId = "12345";
    const imageInfo: IImageDetails = {
      id: imageId,
      url: `https://www.pexels.com/photo/${imageId}`,
      photographer: "John Doe",
      photographer_url: "https://www.pexels.com/@johndoe",
      alt: "A beautiful sunset over the ocean",
      src: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345.jpeg`,
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
    expect(photographerLink).toHaveAttribute(
      "href",
      imageInfo.photographer_url
    );
  });
});
