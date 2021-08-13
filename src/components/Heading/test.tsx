import { screen } from "@testing-library/react";
import theme from "styles/theme";
import { renderWithTheme } from "utils/tests/helpers";

import Heading from ".";

describe("<Heading />", () => {
  it("should render a white heading by default", () => {
    renderWithTheme(<Heading>Zapt</Heading>);
    expect(screen.getByRole("heading", { name: /Zapt/i })).toHaveStyle({
      color: theme.colors.white,
    });
  });

  it("should render a black heading when color is passed", () => {
    renderWithTheme(<Heading color="black">Zapt</Heading>);
    expect(screen.getByRole("heading", { name: /Zapt/i })).toHaveStyle({
      color: theme.colors.black,
    });
  });
});
