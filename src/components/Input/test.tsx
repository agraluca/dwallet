import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import Input from ".";

describe("<Input />", () => {
  it("should render the heading", () => {
    renderWithTheme(<Input value="Teste" onChange={jest.fn()} />);

    expect(screen.getByDisplayValue("Teste")).toBeInTheDocument();
  });
});
