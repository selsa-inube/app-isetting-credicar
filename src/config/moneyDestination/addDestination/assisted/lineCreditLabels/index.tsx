import { Text } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
const lineCreditLabels = {
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
      hay decisiones. Define línea de crédito con el botón.
    </Text>
  ),
};

export { lineCreditLabels };
