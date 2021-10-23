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

  it("should render iconButton with small iconSize", () => {
    renderWithTheme(
      <Button variant="icon" icon="/icons/plus.svg" iconSize="small">
        Adicionar
      </Button>
    );
    const iconImg = screen.getByRole("img");
    expect(screen.getByAltText("icone")).toBeInTheDocument();
    expect(iconImg).toHaveAttribute("src", "/icons/plus.svg");
  });

  it("should render iconButton with medium iconSize", () => {
    renderWithTheme(
      <Button variant="icon" icon="/icons/plus.svg" iconSize="medium">
        Adicionar
      </Button>
    );
    const iconImg = screen.getByRole("img");
    expect(screen.getByAltText("icone")).toBeInTheDocument();
    expect(iconImg).toHaveAttribute("src", "/icons/plus.svg");
  });

  it("should render iconButton with medium iconSize", () => {
    renderWithTheme(
      <Button variant="icon" icon="/icons/plus.svg" iconSize="large">
        Adicionar
      </Button>
    );
    const iconImg = screen.getByRole("img");
    expect(screen.getByAltText("icone")).toBeInTheDocument();
    expect(iconImg).toHaveAttribute("src", "/icons/plus.svg");
  });
});
