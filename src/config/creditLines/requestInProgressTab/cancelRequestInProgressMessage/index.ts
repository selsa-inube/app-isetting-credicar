import { EComponentAppearance } from "@enum/appearances";

const cancelRequestInProgressMessage = {
  success: {
    title: "Solicitud cancelada",
    description: "La solicitud se canceló correctamente.",
    appearance: EComponentAppearance.SUCCESS,
    duration: 5000,
  },
  error: {
    title: "Error al cancelar la solicitud",
    description:
      "No fue posible cancelar la solicitud por favor intenta más tarde",
    appearance: EComponentAppearance.DANGER,
    duration: 5000,
  },
};

export { cancelRequestInProgressMessage };
