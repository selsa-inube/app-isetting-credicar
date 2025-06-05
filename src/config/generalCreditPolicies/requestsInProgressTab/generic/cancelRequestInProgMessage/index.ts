import { ComponentAppearance } from "@enum/appearances";

const cancelRequestInProgMessage = {
  success: {
    title: "Solicitud cancelada",
    description: "La solicitud se canceló correctamente.",
    appearance: ComponentAppearance.SUCCESS,
    duration: 5000,
  },
  error: {
    title: "Error al cancelar la solicitud",
    description:
      "No fue posible cancelar la solicitud por favor intenta más tarde",
    appearance: ComponentAppearance.DANGER,
    duration: 5000,
  },
};

export { cancelRequestInProgMessage };
