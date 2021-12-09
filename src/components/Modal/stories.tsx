import { Story, Meta } from "@storybook/react/types-6-0";
import { ModalProps } from "./index";

import Modal from ".";

export default {
  title: "Modal",
  component: Modal,
} as Meta;

export const Basic: Story = (args: ModalProps) => <Modal {...args} />;
