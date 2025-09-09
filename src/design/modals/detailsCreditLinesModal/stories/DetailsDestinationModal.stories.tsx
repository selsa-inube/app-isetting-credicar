import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { DetailsCreditLinesModal, IDetailsCreditLinesModal } from "..";

const meta: Meta<typeof DetailsCreditLinesModal> = {
  title: "modals/DetailsCreditLinesModal",
  component: DetailsCreditLinesModal,
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
    label: "1. Datos generales",
  },
  creditProspectusOptions: {
    id: "creditProspectusOptions",
    isDisabled: false,
    label: "2. Opciones para el prospecto de crédito",
  },
  maximumAmount: {
    id: "maximumAmount",
    isDisabled: false,
    label: "3. Monto máximo",
  },
  term: {
    id: "term",
    isDisabled: false,
    label: "4. Plazo",
  },
};

const data = {
  id: "1",
  name: "Línea de crédito 1",
  description:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit, non sem nisi magna proin enim primis, sollicitudin pretium diam massa posuere tristique. Feugiat ante sed ultrices nec sociis metus hendrerit sollicitudin erat est.",
};

const Template: StoryFn<IDetailsCreditLinesModal> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <DetailsCreditLinesModal
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
  detailsTabsConfig: detailsTabsConfig,
  data: data,
};

export default meta;
