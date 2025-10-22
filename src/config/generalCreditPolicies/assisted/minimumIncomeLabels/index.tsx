import { Text } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";

const minimumIncomeLabels = {
  titleContentAddCard: "Agregar decisión",
  messageEmptyDecisions: (
    <Text
      as="span"
      type="label"
      size="large"
      appearance={EComponentAppearance.GRAY}
    >
      Aún
      <Text
        as="span"
        type="label"
        size="large"
        appearance={EComponentAppearance.GRAY}
        weight="bold"
      >
        {` NO `}
      </Text>
      hay decisiones. Define porcentaje mínimo de reserva por la fuente de
      ingreso con el botón.
    </Text>
  ),
};

export { minimumIncomeLabels };
