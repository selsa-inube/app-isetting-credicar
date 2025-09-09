import { MdAdd } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { MenuItem } from ".";
import { IMenuItem } from "@ptypes/design/IMenuItem";

const meta: Meta<typeof MenuItem> = {
  title: "feedback/MenuItem",
  component: MenuItem,
  decorators: [
    (Story: StoryFn, context) => (
      <BrowserRouter>{Story(context.args, context)}</BrowserRouter>
    ),
  ],
};

type Story = StoryObj<typeof MenuItem>;

export const Default: Story = (args: IMenuItem) => <MenuItem {...args} />;
Default.args = {
  description: "Agregar nomina",
  icon: <MdAdd />,
  disabled: false,
  close: true,
  path: "/",
};
export const Disabled: Story = (args: IMenuItem) => <MenuItem {...args} />;
Disabled.args = {
  description: "Agregar nomina",
  icon: <MdAdd />,
  disabled: true,
  path: "",
};

export default meta;
