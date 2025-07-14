import { Text } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";

const scoreModelsLabels = {
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
      hay decisiones. Define modelos de score con el botón.
    </Text>
  ),
};

export { scoreModelsLabels };
