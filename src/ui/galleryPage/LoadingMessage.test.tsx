import { render, screen } from "@testing-library/react";
import { LoadingMessage } from "./LoadingMessage";

describe("LoadingMessage Component", () => {
  it("renders the loading message correctly", () => {
    render(<LoadingMessage />);
    expect(screen.getByTestId("loading-message")).toHaveTextContent(
      "Loading more images..."
    );
  });
});
