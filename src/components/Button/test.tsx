import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { Button } from ".";

describe("Button Component", () => {
  it("should render correctly", () => {
    renderWithTheme(<Button>Adicionar</Button>);

    expect(screen.getByText("Adicionar")).toBeInTheDocument();
  });
  it("should render with icon variant", () => {
    renderWithTheme(
      <Button variant="icon" icon="/icons/plus.svg">
        Adicionar
      </Button>
    );

    const iconImg = screen.getByRole("img");
    expect(screen.getByAltText("icone")).toBeInTheDocument();
    expect(iconImg).toHaveAttribute("src", "/icons/plus.svg");
  });
  it("should render with default variant", () => {
    renderWithTheme(<Button variant="default">Adicionar</Button>);
    expect(screen.getByText("Adicionar")).toBeInTheDocument();
  });
});
