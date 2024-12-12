import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

interface RenderWithRouterOptions {
  route?: string;
  children: React.ReactNode;
}

export const renderWithRouter = (
  { route = "/", children }: RenderWithRouterOptions,
  futureFlags = { v7_relativeSplatPath: true, v7_startTransition: true }
) => {
  return render(
    <MemoryRouter initialEntries={[route]} future={futureFlags}>
      {children}
    </MemoryRouter>
  );
};
