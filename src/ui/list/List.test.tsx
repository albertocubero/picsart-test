import { render, screen } from "@testing-library/react";
import List from "./List";

describe("List component", () => {
  it("renders a message when there are no images", () => {
    render(<List />);
    expect(screen.getByText(/No images available/i)).toBeInTheDocument();
  });
});
