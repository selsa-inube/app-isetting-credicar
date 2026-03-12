import { EComponentAppearance } from "@enum/appearances";

const interventionHumanMessage = {
  SuccessfulCreateRequestIntHuman: {
    title: "Solicitud agregada con éxito",
    description: "Tu solicitud ha sido agregada a las solicitudes en trámite.",
    appearance: EComponentAppearance.SUCCESS,
    duration: 3000,
  },
  SuccessCreatePolicies: {
    title: "Politicas generales creadas con éxito",
    description: "Las politicas generales ha sido creadas con éxito.",
    appearance: EComponentAppearance.SUCCESS,
    duration: 3000,
  },
};

export { interventionHumanMessage };
