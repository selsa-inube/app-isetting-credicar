import { EComponentAppearance } from "@enum/appearances";

const interventionHumanMessage = {
  SuccessfulCreateRequestIntHuman: {
    title: "Solicitud agregada con éxito",
    description: "Tu solicitud ha sido agregada a las solicitudes en trámite.",
    appearance: EComponentAppearance.SUCCESS,
    duration: 3000,
  },
  SuccessCreatePolicies: {
    title: "Políticas generales agregadas con éxito",
    description: "Las políticas generales ha sido agregadas con éxito.",
    appearance: EComponentAppearance.SUCCESS,
    duration: 3000,
  },
  SuccessCreatePoliciesEdit: {
    title: "Las políticas generales han sido modificadas con éxito",
    description:
      "La solicitud de la modificación de políticas generales ha si exitosa.",
    appearance: EComponentAppearance.SUCCESS,
    duration: 3000,
  },
  SuccessCreatePoliciesEditreq: {
    title:
      "Solicitud para la creación de Políticas generales agregadas con éxito",
    description:
      "La solicitud para la creación políticas generales ha sido agregada a las solicitudes en trámite.",
    appearance: EComponentAppearance.SUCCESS,
    duration: 3000,
  },
};

export { interventionHumanMessage };
