import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage Component", () => {
  it("renders the error message correctly", () => {
    render(<ErrorMessage />);
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Error loading images. Please try again."
    );
  });
});
