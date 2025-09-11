import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { businessUnitDataMock } from "@mocks/businessUnits/businessUnits.mock";
import { RadioBusinessUnit, IRadioBusinessUnit } from "../index";

const meta: Meta<typeof RadioBusinessUnit> = {
  title: "feedback/RadioBusinessUnit",
  component: RadioBusinessUnit,
  decorators: [
    (Story: StoryFn, context) => (
      <BrowserRouter>{Story(context.args, context)}</BrowserRouter>
    ),
  ],
};
const Default = (args: IRadioBusinessUnit) => <RadioBusinessUnit {...args} />;

Default.args = {
  id: businessUnitDataMock[1].publicCode,
  name: "BusinessUnit",
  value: businessUnitDataMock[1].abbreviatedName,
  label: businessUnitDataMock[1].abbreviatedName,
  logo: businessUnitDataMock[1].urlLogo,
};

export default meta;

export { Default };
