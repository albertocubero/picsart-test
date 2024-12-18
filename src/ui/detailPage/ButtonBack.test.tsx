import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import ButtonBack from "./ButtonBack";
import { renderWithRouter } from "@/test-utils/renderWithRouter";
import userEvent from "@testing-library/user-event";

describe("ButtonBack Component", () => {
  it("renders Back button and navigates on click", async () => {
    renderWithRouter({
      route: "/image-detail",
      children: (
        <Routes>
          <Route path="/image-detail" element={<ButtonBack />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      ),
    });

    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();

    await userEvent.click(backButton);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
