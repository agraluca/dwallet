import { Story, Meta } from "@storybook/react/types-6-0";

import Modal, { ModalProps } from ".";

export default {
  title: "Modal",
  component: Modal,
} as Meta;

export const Basic: Story<ModalProps> = (args) => <Modal {...args} />;
