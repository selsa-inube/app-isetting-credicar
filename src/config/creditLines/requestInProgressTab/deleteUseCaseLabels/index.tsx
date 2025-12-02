import { Text } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";

const deleteUseCaseLabels = (abbreviatedName: string) => {
  return {
    description: (
      <Text
        as="span"
        type="label"
        size="large"
        appearance={EComponentAppearance.GRAY}
      >
        {`Se solicitó la eliminación de la línea de crédito  `}
        <Text
          as="span"
          type="label"
          size="large"
          appearance={EComponentAppearance.GRAY}
          weight="bold"
        >
          {abbreviatedName}
        </Text>
      </Text>
    ),
  };
};

export { deleteUseCaseLabels };
