import { inube, Stack, Text, useMediaQuery } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@enum/appearances";
import { mediaQueryMobile } from "@config/environment";
import { IGeneralDecisionsTab } from "@ptypes/generalCredPolicies/IGeneralDecisionsTab";
import { BoxContainer } from "@design/layout/boxContainer";
import { useThemeData } from "@utils/theme";
import { ILabel } from "@ptypes/ILabel";

const GeneralDecisionsTab = (props: IGeneralDecisionsTab) => {
  const { data, labelsDetails } = props;
  const isMobile = useMediaQuery(mediaQueryMobile);

  const theme = useThemeData();

  const isField = (field: { id: string }) => data[field.id as keyof ILabel];

  const filteredFieldData = labelsDetails.filter((field) =>
    isField({ id: field.id }),
  );

  return (
    <Stack
      direction="column"
      gap={isMobile ? tokens.spacing.s200 : tokens.spacing.s300}
      height="85%"
    >
      <Stack gap={tokens.spacing.s200} direction="column" width="100%">
        {filteredFieldData.map((field, id) => (
          <BoxContainer
            key={id}
            direction="column"
            width="100%"
            minHeight="52px"
            borderRadius={tokens.spacing.s100}
            padding={`${tokens.spacing.s075} ${tokens.spacing.s200}`}
            boxSizing="border-box"
            backgroundColor={
              theme ? theme?.palette?.neutral?.N10 : inube.palette.neutral.N10
            }
          >
            <Text size="medium" type="label" weight="bold">
              {field.titleName}
            </Text>
            <Text size="medium" appearance={ComponentAppearance.GRAY} ellipsis>
              {data[field.id]}
            </Text>
          </BoxContainer>
        ))}
      </Stack>
    </Stack>
  );
};

export { GeneralDecisionsTab };
