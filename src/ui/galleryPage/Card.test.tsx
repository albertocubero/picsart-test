import { screen } from "@testing-library/react";
import { renderWithRouter } from "@/test-utils/renderWithRouter";
import { Card } from "@/ui/galleryPage/Card";

jest.mock("@/ui/GalleryPage/LazyImage", () => ({
  LazyImage: jest.fn(({ url, height }) => (
    <img src={url} alt="LazyImage" data-testid="lazy-image" style={{ height: `${height}px` }} />
  )),
}));

describe("Card Component", () => {
  const mockProps = {
    id: 123,
    url: "https://example.com/image.jpg",
    height: 200,
  };

  it("should render a link with the correct href", () => {
    renderWithRouter({
      route: `/image/${mockProps.id}`,
      children: <Card id={mockProps.id} url={mockProps.url} height={mockProps.height} />,
    });

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/image/${mockProps.id}`);
  });

  it("should render the LazyImage component with the correct props", () => {
    renderWithRouter({
      route: `/image/${mockProps.id}`,
      children: <Card id={mockProps.id} url={mockProps.url} height={mockProps.height} />,
    });

    const lazyImage = screen.getByTestId("lazy-image");
    expect(lazyImage).toBeInTheDocument();
    expect(lazyImage).toHaveAttribute("src", mockProps.url);
    expect(lazyImage).toHaveStyle(`height: ${mockProps.height}px`);
  });
});
