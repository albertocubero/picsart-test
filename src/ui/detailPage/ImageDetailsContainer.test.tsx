import { render, screen } from "@testing-library/react";
import ImageDetailsContainer from "./ImageDetailsContainer";

jest.mock('@/ui/detailPage/ImageDetails', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked ImageDetails</div>),
}));

test("renders ImageDetailsContainer with ImageDetails", () => {
  const imageInfo = {
    id: "1",
    photographer: "John Doe",
    photographer_url: "https://example.com",
    alt: "A beautiful sunset",
    src: "https://example.com/sunset.jpg",
  };

  render(<ImageDetailsContainer imageInfo={imageInfo} />);
  
  expect(screen.getByText("Mocked ImageDetails")).toBeInTheDocument();
});
