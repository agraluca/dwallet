import { Story, Meta } from "@storybook/react/types-6-0";

import Table, { TableProps } from ".";

export default {
  title: "Table",
  component: Table,
} as Meta;

export const Basic: Story<TableProps> = (args) => (
  <div style={{ maxWidth: "1132px", margin: "0 auto" }}>
    <Table {...args} />{" "}
  </div>
);
