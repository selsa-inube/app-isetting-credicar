import { EComponentAppearance } from "@enum/appearances";

const deletedCycleMessage = {
  success: {
    title: "Se quito el ciclo de pago.",
    description: "El ciclo de pago se retiro correctamente.",
    appearance: EComponentAppearance.SUCCESS,
    duration: 5000,
  },
  error: {
    title: "Error al quitar ciclo de pago.",
    description: "No fue posible quitar el ciclo, por favor intenta más tarde",
    appearance: EComponentAppearance.DANGER,
    duration: 5000,
  },
};

export { deletedCycleMessage };
