import { BrowserRouter } from "react-router-dom";
import { MdDoorBack } from "react-icons/md";
import { Meta, StoryFn } from "@storybook/react";
import { ITitleOfDecisions } from "@ptypes/design/ITitleOfDecisions";
import { TitleOfDecisions } from "../index";

const meta: Meta<typeof TitleOfDecisions> = {
  title: "data/Title",
  component: TitleOfDecisions,
  decorators: [
    (Story: StoryFn, context) => (
      <BrowserRouter>{Story(context.args, context)}</BrowserRouter>
    ),
  ],
};

const Template: StoryFn<ITitleOfDecisions> = (args) => (
  <TitleOfDecisions {...args} />
);

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
