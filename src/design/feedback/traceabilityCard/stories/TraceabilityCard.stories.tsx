import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { ITraceabilityCard, TraceabilityCard } from "..";

const meta: Meta<typeof TraceabilityCard> = {
  title: "feedback/TraceabilityCard",
  component: TraceabilityCard,
  decorators: [
    (Story: StoryFn, context) => (
      <BrowserRouter>{Story(context.args, context)}</BrowserRouter>
    ),
  ],
};

const labels = [
  {
    id: "dateExecution",
    titleName: "Fecha de ejecución",
  },
  {
    id: "actioExecuted",
    titleName: "Acción ejecutada",
  },
  {
    id: "userWhoExecuted",
    titleName: "Usuario que ejecutó",
  },
  {
    id: "description",
    titleName: "Descripción",
  },
];

const data = {
  id: "1",
  dateExecution: "02/Sep/2024",
  actioExecuted: "AccionDeEjemplo",
  userWhoExecuted: "Marcela María González Suarez",
  description:
    "La solicitud tuvo 3 errores no fatales y aún así logró ser procesada con éxito.",
};

const Template: StoryFn<ITraceabilityCard> = (args) => {
  return (
    <>
      <TraceabilityCard {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: data,
  labels,
  isMobile: false,
};

export default meta;
