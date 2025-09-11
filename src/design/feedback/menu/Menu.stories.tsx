import { BrowserRouter } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { Meta, StoryFn } from "@storybook/react";
import { IMenu } from "@ptypes/design/IMenu";
import { IMenuOptions } from "@ptypes/design/IMenuOptions";
import { Menu } from ".";

const meta: Meta<typeof Menu> = {
  title: "feedback/Menu",
  component: Menu,
  decorators: [
    (Story: StoryFn, context) => (
      <BrowserRouter>{Story(context.args, context)}</BrowserRouter>
    ),
  ],
};

const options: IMenuOptions[] = [
  {
    description: "Agregar nómina",
    icon: <MdAdd />,
    path: "/",
    disabled: true,
  },
  {
    description: "Agregar nómina",
    icon: <MdAdd />,
    path: "/",
    disabled: true,
  },
];

export const Default = (args: IMenu) => <Menu {...args} />;
Default.args = {
  options,
};

export default meta;
