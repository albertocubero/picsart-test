import { render, screen } from "@testing-library/react";
import { LazyLoadingImage } from "@/ui/Gallery/LazyLoadingImage";

describe("LazyLoadingImage Component", () => {
  const mockUrl = "https://via.placeholder.com/150";
  const mockId = "1";

  it("renders the image with the correct src, alt, and lazy loading", () => {
    render(<LazyLoadingImage id={mockId} url={mockUrl} />);

    const imgElement = screen.getByRole("img");

    expect(imgElement).toHaveAttribute("src", mockUrl);
    expect(imgElement).toHaveAttribute("alt", `Image ${mockId}`);
    expect(imgElement).toHaveAttribute("loading", "lazy");
  });
});
