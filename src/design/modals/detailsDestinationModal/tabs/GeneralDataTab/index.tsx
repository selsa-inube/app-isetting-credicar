import { Stack, Text, useMediaQuery } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@enum/appearances";
import {
  StyledContainerDataName,
  StyledContainerDescription,
  StyledContainerName,
} from "./styles";
import { mediaQueryMobile } from "@config/environment";
import { IEntry } from "@ptypes/design/table/IEntry";

interface IGeneralDataTab {
  data: IEntry;
}

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
            appearance={ComponentAppearance.DARK}
            weight="bold"
          >
            Nombre
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
            appearance={ComponentAppearance.DARK}
            weight="bold"
          >
            Descripción
          </Text>
          <Text type="body" size="medium" appearance={ComponentAppearance.GRAY}>
            {data.descriptionUse}
          </Text>
        </StyledContainerDescription>
      )}
    </Stack>
  );
};

export { GeneralDataTab };
