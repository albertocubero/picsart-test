import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithRouter } from "@/test-utils/renderWithRouter";
import NotFound from "@/ui/404/NotFound";

describe("NotFound", () => {
  it("renders the 404 message and a link to the homepage", () => {
    renderWithRouter({
      route: "/wrong/route",
      children: (
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ),
    });

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument();
    const link = screen.getByText("Go back to the homepage");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
