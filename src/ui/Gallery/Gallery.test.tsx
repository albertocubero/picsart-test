import { render, screen } from "@testing-library/react";
import Gallery from "./Gallery";

jest.mock("@/ui/hooks/useGetImages", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const useGetImagesMock = require("../hooks/useGetImages").default;

describe("List Component", () => {
  it("renders loading state", () => {
    useGetImagesMock.mockReturnValue({
      isLoading: true,
      images: [],
    });

    render(<Gallery />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders images when available", () => {
    useGetImagesMock.mockReturnValue({
      isLoading: false,
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    });

    render(<Gallery />);
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("renders 'No images available' when the array is empty", () => {
    useGetImagesMock.mockReturnValue({
      isLoading: false,
      images: [],
    });

    render(<Gallery />);
    expect(screen.getByText(/No images available/i)).toBeInTheDocument();
  });
});
