import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import Card from ".";

describe("<Card />", () => {
  it("should render total balance card", () => {
    renderWithTheme(<Card type="total" value={1000} />);

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("R$ 1.000,00")).toBeInTheDocument();
  });

  it("should render fixed income card", () => {
    renderWithTheme(<Card type="rf" value={30} />);

    expect(screen.getByText("Renda Fixa")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
  });

  it("should render variable income card", () => {
    renderWithTheme(<Card type="rv" value={70} />);

    expect(screen.getByText("Renda Variável")).toBeInTheDocument();
    expect(screen.getByText("70%")).toBeInTheDocument();
  });
});
