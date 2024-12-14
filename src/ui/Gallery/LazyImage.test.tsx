import { render, screen } from "@testing-library/react";
import { LazyImage } from "@/ui/Gallery/LazyImage";

describe("LazyImage Component", () => {
  const mockUrl = "https://via.placeholder.com/150";
  const mockId = "1";

  it("should render the image with lazy configuration", () => {
    render(<LazyImage id={mockId} url={mockUrl} />);

    const imgElement = screen.getByRole("img");

    expect(imgElement).toHaveAttribute("src", mockUrl);
    expect(imgElement).toHaveAttribute("alt", `Image ${mockId}`);
    expect(imgElement).toHaveAttribute("loading", "lazy");
  });
});
