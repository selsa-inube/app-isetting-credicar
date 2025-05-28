import { ComponentAppearance } from "@enum/appearances";

const flowAutomaticMessages = {
  errorSendingData: {
    title: "¡Ups! Algo salió mal",
    description: "La solicitud de edición no se pudo radicar correctamente",
    appearance: ComponentAppearance.DANGER,
    duration: 5000,
  },
  errorQueryingData: {
    title: "Error al consultar la creacion solicitud",
    description:
      "No fue posible consultar la creacion solicitud por favor intenta más tarde",
    appearance: ComponentAppearance.DANGER,
    duration: 5000,
  },
  errorCreateRequest: {
    title: "Error en la solicitud",
    description: "Verifique su solicitud en solicitudes en tramite",
    appearance: ComponentAppearance.DANGER,
    duration: 5000,
  },
  SuccessfulCreateRequest: {
    title: "¡Creación de solicitud exitosa!",
    description: "Se creo la solicitud con éxito",
    appearance: ComponentAppearance.SUCCESS,
    duration: 5000,
  },
};

export { flowAutomaticMessages };
