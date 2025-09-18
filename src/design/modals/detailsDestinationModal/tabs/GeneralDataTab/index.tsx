import { Stack, Text, useMediaQuery } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import {
  StyledContainerDataName,
  StyledContainerDescription,
  StyledContainerName,
} from "./styles";
import { mediaQueryMobile } from "@config/environment";
import { generalDataTabLabels } from "@config/moneyDestination/moneyDestinationTab/generics/generalDataTabLabels";
import { IGeneralDataTab } from "@ptypes/design/IGeneralDataTab";

const GeneralDataTab = (props: IGeneralDataTab) => {
  const { data } = props;
  const isMobile = useMediaQuery(mediaQueryMobile);
  return (
    <Stack direction="column" gap={tokens.spacing.s200} height="auto">
      {data.typeDestination !== "undefined" && (
        <StyledContainerName $smallScreen={isMobile}>
          <Text
            type="label"
            size="medium"
            appearance={EComponentAppearance.DARK}
            weight="bold"
          >
            {generalDataTabLabels.type}
          </Text>
          <Text size="medium" appearance={EComponentAppearance.GRAY}>
            {data.typeDestination}
          </Text>
        </StyledContainerName>
      )}
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

      {data.creditLine !== "undefined" && (
        <StyledContainerName $smallScreen={isMobile}>
          <Text
            type="label"
            size="medium"
            appearance={EComponentAppearance.DARK}
            weight="bold"
          >
            {generalDataTabLabels.creditLine}
          </Text>
          <Text size="medium" appearance={EComponentAppearance.GRAY}>
            {data.creditLine}
          </Text>
        </StyledContainerName>
      )}

      {data.descriptionUse !== "undefined" && (
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
