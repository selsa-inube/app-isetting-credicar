import { EComponentAppearance } from "@enum/appearances";

const flowAutomaticMessages = (action?: string) => {
  const flowAutomatic = {
    errorSendingData: {
      title: "¡Ups! Algo salió mal",
      description: "La solicitud no se pudo radicar correctamente",
      appearance: EComponentAppearance.DANGER,
      duration: 3000,
    },
    errorQueryingData: {
      title: "Error al consultar la creacion solicitud",
      description:
        "No fue posible consultar la creacion solicitud por favor intenta más tarde",
      appearance: EComponentAppearance.DANGER,
      duration: 3000,
    },
    errorCreateRequest: {
      title: "Error en la solicitud",
      description: "Verifique su solicitud en solicitudes en tramite",
      appearance: EComponentAppearance.DANGER,
      duration: 3000,
    },
    SuccessfulCreateRequest: {
      title: `Nomina de convenio ${action} con éxito!`,
      description: `Nomina de convenio fue ${action} con éxito!`,
      appearance: EComponentAppearance.SUCCESS,
      duration: 3000,
    },
  };
  return flowAutomatic;
};

export { flowAutomaticMessages };
