import { useState } from "react";
import { MdOutlineBeachAccess } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { textValuesBusinessRules } from "@config/moneyDestination/moneyDestinationTab/businessRules";
import { IconWithText } from "@design/data/iconWithText";
import { DetailsDestinationModal, IDetailsDestinationModal } from "..";

const meta: Meta<typeof DetailsDestinationModal> = {
  title: "modals/DetailsDestinationModal",
  component: DetailsDestinationModal,
  decorators: [
    (Story: StoryFn, context) => (
      <BrowserRouter>{Story(context.args, context)}</BrowserRouter>
    ),
  ],
};

const detailsTabsConfig = {
  generalData: {
    id: "generalData",
    isDisabled: false,
    label: "Datos generales",
  },
  creditLine: {
    id: "creditLine",
    isDisabled: false,
    label: "Línea de crédito",
    notificationIndicators: 2,
  },
};

const data = {
  id: "1",
  name: (
    <IconWithText icon={<MdOutlineBeachAccess size={16} />} text="Vacaciones" />
  ),
  description:
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
};

const Template: StoryFn<IDetailsDestinationModal> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <DetailsDestinationModal
          {...args}
          onCloseModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "portal",
  filteredTabsConfig: detailsTabsConfig,
  detailsTabsConfig: detailsTabsConfig,
  data: data,
  isMoreDetails: false,
  isMobile: false,
  isSelected: detailsTabsConfig.generalData.id,
  defaultSelectedTab: detailsTabsConfig.creditLine.id,
  onTabChange: (selectedTabId: string) => {
    console.log(`Tab changed to: ${selectedTabId}`);
  },
  textValues: textValuesBusinessRules,
};

export default meta;
