import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import Dropdown from ".";

describe("Dropdown Component", () => {
  it("should renders correctly", () => {
    renderWithTheme(
      <Dropdown title="Teste">
        <h1>Sair</h1>
      </Dropdown>
    );

    expect(screen.getByText("Teste")).toBeInTheDocument();
  });

  it("should renders correctly when title is clicked", async () => {
    renderWithTheme(
      <Dropdown title="Teste">
        <h1>Sair</h1>
      </Dropdown>
    );
    const dropdownButton = screen.getByText("Teste");
    await fireEvent.click(dropdownButton);

    expect(screen.getByText("Sair")).toBeInTheDocument();
  });
});
