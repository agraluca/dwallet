import { Story, Meta } from "@storybook/react/types-6-0";

import Toast, { ToastProps } from ".";

export default {
  title: "Toast",
  component: Toast,
} as Meta;

export const Basic: Story<ToastProps> = (args) => (
  <div style={{ width: "50rem" }}>
    <Toast {...args} />
  </div>
);

Basic.args = {
  title: "Já existe esse ativo em sua carteira.",
  type: "warning",
};
