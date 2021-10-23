import { Story, Meta } from "@storybook/react/types-6-0";

import InputWithLabel, { InputWithLabelProps } from ".";

export default {
  title: "InputWithLabel",
  component: InputWithLabel,
} as Meta;

export const Basic: Story<InputWithLabelProps> = (props) => (
  <InputWithLabel {...props} />
);
