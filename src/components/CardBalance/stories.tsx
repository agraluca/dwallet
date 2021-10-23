import { Story, Meta } from "@storybook/react/types-6-0";

import Card, { CardProps } from ".";

export default {
  title: "Card",
  component: Card,
} as Meta;

export const Basic: Story<CardProps> = (args) => (
  <div style={{ width: "40rem", margin: "5rem auto" }}>
    <Card {...args} />
  </div>
);
