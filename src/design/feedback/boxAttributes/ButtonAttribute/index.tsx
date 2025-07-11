import { Stack, Text, Icon } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { IButtonAttribute } from "@ptypes/design/IButtonAttribute";
import { StyledContainer } from "./styles";

const ButtonAttribute = (props: IButtonAttribute) => {
  const { onClick, icon, value } = props;
  return (
    <StyledContainer onClick={onClick}>
      {icon && (
        <Stack
          justifyContent="center"
          alignItems="center"
          padding={tokens.spacing.s025}
        >
          <Icon icon={icon} appearance={EComponentAppearance.DARK} />
        </Stack>
      )}

      <Text size="small">{value}</Text>
    </StyledContainer>
  );
};

export { ButtonAttribute };
