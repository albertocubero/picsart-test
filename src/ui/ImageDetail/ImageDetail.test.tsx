import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import ImageDetail from "./ImageDetail";
import { renderWithRouter } from "../../test-utils/renderWithRouter";

describe("ImageDetail", () => {
  it("should display the image ID from the URL", () => {
    const imageId = 12345;
    renderWithRouter({
      route: `/image/${imageId}`,
      children: (
        <Routes>
          <Route path="/image/:id" element={<ImageDetail />} />
        </Routes>
      ),
    });

    expect(screen.getByText(/Image ID:/)).toHaveTextContent(
      `Image ID: ${imageId}`
    );
  });
});
