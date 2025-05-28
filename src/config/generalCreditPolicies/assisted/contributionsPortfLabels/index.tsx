import { Text } from "@inubekit/inubekit";
import { ComponentAppearance } from "@enum/appearances";

const contributionsPortfLabels = {
  titleContentAddCard: "Agregar decisión",
  messageEmptyDecisions: (
    <Text
      as="span"
      type="label"
      size="large"
      appearance={ComponentAppearance.GRAY}
    >
      Aún
      <Text
        as="span"
        type="label"
        size="large"
        appearance={ComponentAppearance.GRAY}
        weight="bold"
      >
        {` NO `}
      </Text>
      hay decisiones. Define # de veces los ingresos como cupo total de la
      cartera con el botón.
    </Text>
  ),
};

export { contributionsPortfLabels };
