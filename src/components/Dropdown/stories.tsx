import { Story, Meta } from "@storybook/react/types-6-0";

import Dropdown, { DropDownProps } from ".";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
} as Meta;

export const Basic: Story<DropDownProps> = (args) => <Dropdown {...args} />;

Basic.args = {
  title: "lucaagra",
  children: "contents",
};
