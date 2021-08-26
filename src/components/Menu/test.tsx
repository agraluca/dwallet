import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import Menu from ".";

describe("<Menu />", () => {
  it("should render the heading", () => {
    renderWithTheme(<Menu />);

    expect(screen.getByText(/Sua carteira/i)).toBeInTheDocument();
    expect(screen.getByText(/Pesquisar/i)).toBeInTheDocument();
  });
});
