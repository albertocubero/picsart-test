
import { render, screen } from "@testing-library/react";
import { Spinner } from "@/ui/galleryPage/Spinner";

describe("Spinner Component", () => {
  it("should render the spinner", () => {
    render(<Spinner containerHeight="200px" />);

    const spinnerWrapper = screen.getByTestId("spinner-wrapper");
    expect(spinnerWrapper).toBeInTheDocument();
    expect(spinnerWrapper).toHaveStyle("height: 200px");

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
});
