import { Story, Meta } from "@storybook/react/types-6-0";

import Table from ".";

export default {
  title: "Table",
  component: Table,
} as Meta;

export const Basic: Story = (args) => (
  <div style={{ maxWidth: "1132px", margin: "0 auto" }}>
    <Table {...args} />{" "}
  </div>
);
