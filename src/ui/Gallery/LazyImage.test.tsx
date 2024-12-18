import { render, screen, act } from "@testing-library/react";
import { LazyImage } from "@/ui/Gallery/LazyImage";

describe("LazyImage Component", () => {
  const mockProps = {
    url: "https://example.com/image.jpg",
    height: 200,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a div with the correct initial styles", () => {
    global.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
    })) as unknown as jest.Mock;

    render(<LazyImage url={mockProps.url} height={mockProps.height} />);

    const lazyImageDiv = screen.getByTestId("lazy-image");

    expect(lazyImageDiv).toBeInTheDocument();
    expect(lazyImageDiv).toHaveStyle(`
      height: ${mockProps.height}px;
      background-image: none;
    `);
  });

  it("should apply the background image when it is intersecting", async () => {
    global.IntersectionObserver = jest.fn((callback) => ({
      observe: jest.fn(() => {
        act(() => {
          callback([{ isIntersecting: true }], {});
        });
      }),
      disconnect: jest.fn(),
    })) as unknown as jest.Mock;

    render(<LazyImage url={mockProps.url} height={mockProps.height} />);

    const lazyImageDiv = screen.getByTestId("lazy-image");

    expect(lazyImageDiv).toHaveStyle(`
      height: ${mockProps.height}px;
      background-image: url(${mockProps.url});
    `);
  });
});
