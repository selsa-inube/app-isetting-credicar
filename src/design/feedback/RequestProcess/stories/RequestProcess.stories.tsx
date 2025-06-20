import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Button } from "@inubekit/inubekit";
import { requestStatusMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestStatusMessage";
import { IRequestProcessContent } from "@ptypes/design/IRequestProcessContent";
import { RequestProcess } from "..";

const meta: Meta<typeof RequestProcess> = {
  title: "feedback/RequestProcess",
  component: RequestProcess,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const InterventionAutomaticData = {
  settingRequestId: "12444",
  requestNumber: "00001234",
  requestStatus: "ProcessingRequest",
};

const InterventionHumanData = {
  settingRequestId: "12444",
  requestNumber: "00001234",
  requestStatus: "PendingApproval",
};

const Template: StoryFn<IRequestProcessContent> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <RequestProcess
          {...args}
          onCloseRequestStatus={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export const InterventionAutomatic = Template.bind({});
InterventionAutomatic.args = {
  portalId: "portal",
  saveData: InterventionAutomaticData,
  descriptionRequestProcess: {
    title: "Procesando solicitud",
    description:
      "Hemos recibido tu solicitud y se encuentra en proceso.Por favor, espera mientras la gestionamos.",
  },
  descriptionRequestStatus: () => requestStatusMessage("Juan Perez"),
  requestProcessSteps: [
    { name: "Solicitud radicada", status: "completed" },
    { name: "Agregando", status: "completed" },
    { name: "Destino agregado", status: "pending" },
  ],
};

export const InterventionHuman = Template.bind({});
InterventionHuman.args = {
  portalId: "portal",
  saveData: InterventionHumanData,
  descriptionRequestProcess: {
    title: "Procesando solicitud",
    description:
      "Hemos recibido tu solicitud y se encuentra en proceso.Por favor, espera mientras la gestionamos.",
  },
  descriptionRequestStatus: () => requestStatusMessage("Juan Perez"),
  requestProcessSteps: [
    { name: "Solicitud radicada", status: "completed" },
    { name: "Agregando", status: "completed" },
    { name: "Destino agregado", status: "pending" },
  ],
};

export default meta;
