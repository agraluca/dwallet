import { Story, Meta } from "@storybook/react/types-6-0";

import Modal from ".";

export default {
  title: "Modal",
  component: Modal,
} as Meta;

export const Basic: Story = (args) => <Modal {...args} />;
