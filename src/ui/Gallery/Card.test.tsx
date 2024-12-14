import { screen } from "@testing-library/react";
import { renderWithRouter } from "@/test-utils/renderWithRouter";
import { Card } from "@/ui/Gallery/Card";

jest.mock("@/ui/Gallery/LazyImage", () => ({
  LazyImage: jest.fn(({ url, id }) => (
    <img src={url} alt={`Image ${id}`} data-testid="lazy-image" />
  )),
}));

describe("Card component", () => {
  const id = "123";
  const url = "https://example.com/image.jpg";

  it("should render a card with the info to show", () => {
    renderWithRouter({
      route: `/image/${id}`,
      children: <Card id={id} url={url} />,
    });

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/image/${id}`);

    const image = screen.getByTestId("lazy-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", url);
    expect(image).toHaveAttribute("alt", `Image ${id}`);
  });

});
