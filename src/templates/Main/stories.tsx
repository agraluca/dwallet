import { Story, Meta } from "@storybook/react/types-6-0";

import Main from ".";

export default {
  title: "Main",
  component: Main,
  // opcinal
  args: {
    title: "DWallet",
    description: "Seu sistema de balanceamento de carteira",
  },
} as Meta;

export const Basic: Story = (args) => <Main {...args} />;
