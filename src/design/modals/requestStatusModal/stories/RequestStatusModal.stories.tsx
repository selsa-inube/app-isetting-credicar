import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/inubekit";
import { useState } from "react";

import { IRequestStatusModal, RequestStatusModal } from "..";

const meta: Meta<typeof RequestStatusModal> = {
  title: "modals/RequestStatusModal",
  component: RequestStatusModal,
  decorators: [
    (Story: StoryFn, context) => (
      <BrowserRouter>{Story(context.args, context)}</BrowserRouter>
    ),
  ],
};

const Template: StoryFn<IRequestStatusModal> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <RequestStatusModal
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
  title: "Solicitud",
  requestNumber: "123245",
  description:
    "Este proceso será gestionado por Jose Perez, puede tardar algún tiempo mientras se gestiona la aprobación.",
  actionText: "Enterado",
};

export default meta;
