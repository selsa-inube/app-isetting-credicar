import { inube } from "@inubekit/inubekit";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { IBoxContainer } from "@ptypes/design/IBoxContainer";
import { tokens } from "@design/tokens";
import { BoxContainer } from "..";

const meta: Meta<typeof BoxContainer> = {
  title: "layout/BoxContainer",
  component: BoxContainer,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<IBoxContainer> = (args) => {
  return (
    <>
      <BoxContainer {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: <div>Content</div>,
  height: "100px",
  width: "200px",
  backgroundColor: `${inube.palette.neutral.N50}`,
  boxSizing: "border-box",
  borderRadius: tokens.spacing.s100,
  borderColor: `${inube.palette.neutral.N100}`,
  padding: tokens.spacing.s100,
};

export default meta;
