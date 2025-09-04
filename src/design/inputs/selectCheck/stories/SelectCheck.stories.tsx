import type { Meta, StoryObj } from "@storybook/react";

import { ControllerSelectCheck } from "./SelectCheck.controller";
import { SelectCheck } from "..";

const options = [
  { id: "uno", label: "Option 1", checked: false },
  { id: "dos", label: "Option 2", checked: false },
  { id: "tres", label: "Option 3", checked: true },
];

type Story = StoryObj<typeof SelectCheck>;

const meta: Meta<typeof SelectCheck> = {
  title: "inputs/SelectCheck",
  component: ControllerSelectCheck,
};

const Default: Story = {
  args: {
    label: "SelectCheck",
    name: "SelectCheck",
    id: "SelectCheck",
    placeholder: "SelectCheck",
    disabled: false,
    readonly: false,
    required: false,
    status: "pending",
    message: "SelectCheck",
    fullwidth: true,
    options: options,
    onBlur: () => () => void 0,
    onFocus: () => () => void 0,
    onClick: () => () => void 0,
  },
};

export { Default };
export default meta;
