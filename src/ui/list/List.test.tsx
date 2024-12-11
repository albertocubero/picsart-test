import { render, screen, waitFor } from "@testing-library/react";
import List from "./List";

describe("List Component", () => {
  it("renders 'Loading...' initially", () => {
    render(<List />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders 'No images available' if no images are present", async () => {
    render(<List />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    expect(screen.queryByText(/No images available/i)).not.toBeInTheDocument();
  });

  it("renders images", async () => {
    render(<List />);

    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(3);
    });

    expect(screen.getByAltText("Image 1")).toHaveAttribute("src", "https://via.placeholder.com/150");
    expect(screen.getByAltText("Image 2")).toHaveAttribute("src", "https://via.placeholder.com/150");
    expect(screen.getByAltText("Image 3")).toHaveAttribute("src", "https://via.placeholder.com/150");
  });
});
