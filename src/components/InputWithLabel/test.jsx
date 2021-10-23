import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import InputWithLabel from ".";

describe("InputWithLabel Component", () => {
  it("should render correctly", () => {
    renderWithTheme(<InputWithLabel label="Usuário" />);

    expect(screen.getByText("Usuário")).toBeInTheDocument();
  });

  it("should render correctly when is write a data in input", () => {
    const mockFunction = jest.fn();

    renderWithTheme(
      <InputWithLabel label="Usuário" onInputChange={mockFunction} />
    );

    const inputElement = screen.getByPlaceholderText("Digite aqui");

    fireEvent.change(inputElement, {
      target: {
        value: "Lucas",
      },
    });

    expect(inputElement.value).toBe("Lucas");
    expect(mockFunction).toBeCalledTimes(1);
  });
});
