import { Story, Meta } from "@storybook/react/types-6-0";

import { Button, ButtonProps } from ".";

export default {
  title: "Button",
  component: Button,
} as Meta;

export const BasicButton: Story<ButtonProps> = (args) => (
  <Button {...args}>Adicionar</Button>
);
