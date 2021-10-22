import { fireEvent, screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import Card from ".";

describe("<Card />", () => {
  it("should render total balance card", () => {
    renderWithTheme(<Card type="total" value={1000} />);

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("R$ 1.000,00")).toBeInTheDocument();
  });

  it("should render fixed income card", () => {
    renderWithTheme(<Card type="rf" value={0.3} />);

    expect(screen.getByText("Renda Fixa")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
  });

  it("should render variable income card", () => {
    renderWithTheme(<Card type="rv" value={0.7} />);

    expect(screen.getByText("Renda Variável")).toBeInTheDocument();
    expect(screen.getByText("70%")).toBeInTheDocument();
  });
  it("should render the total value when toggle button is clicked in variableincome card", () => {
    renderWithTheme(<Card type="rv" value={1000} total={35} />);

    fireEvent.click(screen.getByTitle("Percentual"));

    expect(screen.getByText("R$ 35,00"));
  });

  it("should render the total value when toggle button is clicked in fixed income card", () => {
    renderWithTheme(<Card type="rf" value={1000} total={35} />);

    fireEvent.click(screen.getByTitle("Percentual"));

    expect(screen.getByText("R$ 35,00"));
  });
});
