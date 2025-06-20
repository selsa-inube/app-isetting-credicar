import { Meta, StoryFn } from "@storybook/react";
import { MdAndroid } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { BoxAttribute } from ".";
import { IBoxAttribute } from "@ptypes/design/IBoxAttribute";

const meta: Meta<typeof BoxAttribute> = {
  title: "feedback/BoxAttribute",
  component: BoxAttribute,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default: StoryFn<IBoxAttribute> = (args) => (
  <BoxAttribute {...args} />
);
Default.args = {
  label: "Label",
  value: "Value",
};

export const WithButton: StoryFn<IBoxAttribute> = (args) => (
  <BoxAttribute {...args} />
);

WithButton.args = {
  label: "Label",
  value: "Value",
  withButton: true,
  buttonValue: 2,
  buttonIcon: <MdAndroid />,
};

export default meta;
