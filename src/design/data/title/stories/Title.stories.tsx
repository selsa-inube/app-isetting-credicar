import { BrowserRouter } from "react-router-dom";
import { MdDoorBack } from "react-icons/md";
import { Meta, StoryFn } from "@storybook/react";
import { Title, ITitle } from "../index";

const meta: Meta<typeof Title> = {
  title: "data/Title",
  component: Title,
  decorators: [
    (Story: StoryFn, context) => (
      <BrowserRouter>{Story(context.args, context)}</BrowserRouter>
    ),
  ],
};

const Template: StoryFn<ITitle> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Title",
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  title: "Title",
  icon: <MdDoorBack />,
  navigatePage: "/",
};

export default meta;
