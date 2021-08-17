import { Story, Meta } from "@storybook/react/types-6-0";

import Wrapper from ".";

export default {
  title: "Wrapper",
  component: Wrapper,
} as Meta;

export const Basic: Story = () => <Wrapper>test </Wrapper>;
