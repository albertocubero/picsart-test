import { render, screen } from "@testing-library/react";
import LoadingText from "./LoadingText";

describe("LoadingText Component", () => {
  it("renders loading text", () => {
    render(<LoadingText>Loading...</LoadingText>);
    
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
