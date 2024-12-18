import { render, screen } from "@testing-library/react";
import LoadingText from "./LoadingText";

test("renders loading text", () => {
  render(<LoadingText>Loading...</LoadingText>);
  
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
