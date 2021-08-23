import { screen } from "@testing-library/react";
import theme from "styles/theme";
import { renderWithTheme } from "utils/tests/helpers";

import Main from ".";

describe("<Main />", () => {
  it("should render the heading", () => {
    const { container } = renderWithTheme(<Main />);

    expect(
      screen.getByRole("heading", { name: /DWallet/i })
    ).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render the colors correctly", () => {
    const { container } = renderWithTheme(<Main />);
    expect(container.firstChild).toHaveStyle({
      "background-color": theme.colors.black,
    });
  });

  it("should render the button correctly", () => {
    renderWithTheme(<Main />);
    const button = screen.getByText(/Entrar com o Google/i);
    expect(button).toBeInTheDocument();
  });
});
