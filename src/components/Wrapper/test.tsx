import { screen } from "@testing-library/react";
import Heading from "components/Heading";
import { renderWithTheme } from "utils/tests/helpers";

import Wrapper from ".";

describe("<Wrapper />", () => {
  it("should render the heading", () => {
    const { container } = renderWithTheme(
      <Wrapper>
        <Heading level={1}>Wrapper</Heading>
      </Wrapper>
    );

    expect(
      screen.getByRole("heading", { name: /Wrapper/i })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
