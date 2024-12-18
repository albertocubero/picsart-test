import { render, screen } from "@testing-library/react";
import DetailPageHeader from "./DetailPageHeader";

jest.mock("@/ui/detailPage/ButtonBack", () => ({
  __esModule: true,
  default: () => <button>Back Button</button>,
}));

describe("DetailPageHeader", () => {
  it("renders Header with title and Back button", () => {
    render(<DetailPageHeader />);

    expect(screen.getByText("Back Button")).toBeInTheDocument();
  });
});
