import { render, screen } from "@testing-library/react";
import ImageDetailsContainer from "./ImageDetailsContainer";
import { IImageDetails } from "@/domain/interfaces/IImageDetails";

jest.mock('@/ui/detailPage/ImageDetails', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked ImageDetails</div>),
}));

describe("ImageDetailsContainer Component", () => {
  it("renders ImageDetailsContainer with ImageDetails", () => {
    const imageId = "12345";
    const imageInfo: IImageDetails = {
      id: imageId,
      url: `https://www.pexels.com/photo/${imageId}`,
      photographer: "John Doe",
      photographer_url: "https://www.pexels.com/@johndoe",
      alt: "A beautiful sunset over the ocean",
      src: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345.jpeg`,
    };

    render(<ImageDetailsContainer imageInfo={imageInfo} />);
    
    expect(screen.getByText("Mocked ImageDetails")).toBeInTheDocument();
  });
});
