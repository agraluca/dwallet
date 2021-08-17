import { render, screen } from "@testing-library/react";

import Wrapper from ".";

describe("<Wrapper />", () => {
  it("should render the heading", () => {
    const { container } = render(<Wrapper />);

    expect(
      screen.getByRole("heading", { name: /Wrapper/i })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
})
