import { Stack, Text, Divider } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { IEntry } from "@ptypes/design/table/IEntry";
import { ComponentAppearance } from "@enum/appearances";
import { StyledContainerDescription, StyledContainerName } from "./styles";

interface IGeneralDataTab {
  data: IEntry;
}

function GeneralDataTab(props: IGeneralDataTab) {
  const { data } = props;
  return (
    <Stack direction="column" gap={tokens.spacing.s300}>
      <StyledContainerName>
        <Text
          type="label"
          size="medium"
          appearance={ComponentAppearance.DARK}
          weight="bold"
        >
          Nombre
        </Text>
        <Text size="medium">{data.name}</Text>
      </StyledContainerName>
      <StyledContainerDescription>
        <Text
          type="label"
          size="medium"
          appearance={ComponentAppearance.DARK}
          weight="bold"
        >
          Descripción
        </Text>
        <Text type="body" size="medium" appearance={ComponentAppearance.GRAY}>
          {data.description}
        </Text>
      </StyledContainerDescription>
      <Divider />
    </Stack>
  );
}

export { GeneralDataTab };
