import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { IBoxContainer } from "@ptypes/design/IBoxContainer";
import { tokens } from "@design/tokens";
import { BoxContainer } from "..";
import { EComponentAppearance } from "@enum/appearances";

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
  backgroundColor: `${EComponentAppearance.GRAY}`,
  boxSizing: "border-box",
  borderRadius: tokens.spacing.s100,
  borderColor: `${EComponentAppearance.DARK}`,
  padding: tokens.spacing.s100,
};

export default meta;
