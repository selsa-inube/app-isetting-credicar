import { Stack, Text, useMediaQuery } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import {
  StyledContainerDataName,
  StyledContainerDescription,
  StyledContainerName,
} from "./styles";
import { mediaQueryMobile } from "@config/environment";
import { IGeneralDataTab } from "@ptypes/design/IGeneralDataTab";
import { generalDataTabLabels } from "@config/moneyDestination/moneyDestinationTab/generics/generalDataTabLabels";

const GeneralDataTab = (props: IGeneralDataTab) => {
  const { data } = props;
  const isMobile = useMediaQuery(mediaQueryMobile);

  return (
    <Stack
      direction="column"
      gap={isMobile ? tokens.spacing.s200 : tokens.spacing.s300}
      height="85%"
    >
      {data.abbreviatedName && (
        <StyledContainerName $smallScreen={isMobile}>
          <Text
            type="label"
            size="medium"
            appearance={EComponentAppearance.DARK}
            weight="bold"
          >
            {generalDataTabLabels.name}
          </Text>
          <StyledContainerDataName>
            {data.abbreviatedName}
          </StyledContainerDataName>
        </StyledContainerName>
      )}

      {data.descriptionUse !== undefined && (
        <StyledContainerDescription $smallScreen={isMobile}>
          <Text
            type="label"
            size="medium"
            appearance={EComponentAppearance.DARK}
            weight="bold"
          >
            {generalDataTabLabels.description}
          </Text>
          <Text
            type="body"
            size="medium"
            appearance={EComponentAppearance.GRAY}
          >
            {data.descriptionUse}
          </Text>
        </StyledContainerDescription>
      )}
    </Stack>
  );
};

export { GeneralDataTab };
