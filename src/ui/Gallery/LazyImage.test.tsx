import { render, screen } from "@testing-library/react";
import { LazyImage } from "@/ui/Gallery/LazyImage";

describe("LazyImage Component", () => {
  const mockProps = {
    url: "https://example.com/image.jpg",
    height: 200,
  };

  it("should render a div with the correct styles", () => {
    render(<LazyImage url={mockProps.url} height={mockProps.height} />);

    const lazyImageDiv = screen.getByTestId("lazy-image");

    expect(lazyImageDiv).toBeInTheDocument();
    expect(lazyImageDiv).toHaveStyle(`
      height: ${mockProps.height}px;
      background-image: url(${mockProps.url});
    `);
  });
});
