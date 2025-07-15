import { Stack, Text, Divider } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { generalTabLabels } from "@config/creditLines/addCreditLine/assisted/generalTabLabels";
import { IGeneralDataTab } from "@ptypes/design/IGeneralDataTab";
import { StyledContainerDescription, StyledContainerName } from "./styles";

function GeneralDataTab(props: IGeneralDataTab) {
  const { data } = props;
  return (
    <Stack direction="column" gap={tokens.spacing.s300}>
      <StyledContainerName>
        <Text
          type="label"
          size="medium"
          appearance={EComponentAppearance.DARK}
          weight="bold"
        >
          {generalTabLabels.name}
        </Text>
        <Text size="medium">{data.name}</Text>
      </StyledContainerName>
      <StyledContainerDescription>
        <Text
          type="label"
          size="medium"
          appearance={EComponentAppearance.DARK}
          weight="bold"
        >
          {generalTabLabels.description}
        </Text>
        <Text type="body" size="medium" appearance={EComponentAppearance.GRAY}>
          {data.description}
        </Text>
      </StyledContainerDescription>
      <Divider />
    </Stack>
  );
}

export { GeneralDataTab };
