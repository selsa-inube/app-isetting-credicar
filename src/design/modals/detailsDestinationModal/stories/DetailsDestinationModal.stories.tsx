import { useState } from "react";
import { MdOutlineBeachAccess } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { IconWithText } from "@design/data/iconWithText";
import { DetailsDestinationModal } from "..";
import { IDetailsDestinationModal } from "@ptypes/moneyDestination/tabs/IDetailsDestinationModal";

const meta: Meta<typeof DetailsDestinationModal> = {
  title: "modals/DetailsDestinationModal",
  component: DetailsDestinationModal,
  decorators: [
    (Story: StoryFn, context) => (
      <BrowserRouter>{Story(context.args, context)}</BrowserRouter>
    ),
  ],
};

const data = {
  id: "1",
  name: (
    <IconWithText
      withIconBefore
      icon={<MdOutlineBeachAccess size={16} />}
      text="Vacaciones"
    />
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
  data: data,
};

export default meta;
