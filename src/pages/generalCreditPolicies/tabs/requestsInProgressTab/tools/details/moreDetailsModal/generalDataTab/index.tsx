import { Text, useMediaQuery } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { mediaQueryMobile } from "@config/environment";
import { IGeneralDecisionsTab } from "@ptypes/generalCredPolicies/IGeneralDecisionsTab";
import { BoxContainer } from "@design/layout/boxContainer";
import { ILabel } from "@ptypes/ILabel";

const GeneralTab = (props: IGeneralDecisionsTab) => {
  const { data, labelsDetails } = props;
  const isMobile = useMediaQuery(mediaQueryMobile);

  const isField = (field: { id: string }) => data[field.id as keyof ILabel];

  const filteredFieldData = labelsDetails.filter((field) =>
    isField({ id: field.id }),
  );

  return (
    <BoxContainer
      direction="column"
      gap={isMobile ? tokens.spacing.s200 : tokens.spacing.s300}
      height="85%"
      boxSizing="border-box"
      overflowY="auto"
    >
      <BoxContainer
        direction="column"
        gap={tokens.spacing.s200}
        width="100%"
        height="300px"
        boxSizing="border-box"
      >
        {filteredFieldData.map((field, id) => (
          <BoxContainer
            key={id}
            direction="column"
            width="100%"
            height="200px"
            minHeight="52px"
            borderRadius={tokens.spacing.s100}
            padding={
              isMobile
                ? `${tokens.spacing.s0}`
                : `${tokens.spacing.s075} ${tokens.spacing.s200}`
            }
            boxSizing="border-box"
            backgroundColor={EComponentAppearance.GRAY}
          >
            <Text size="medium" type="label" weight="bold">
              {field.titleName}
            </Text>
            <Text size="medium" appearance={EComponentAppearance.GRAY} ellipsis>
              {data[field.id]}
            </Text>
          </BoxContainer>
        ))}
      </BoxContainer>
    </BoxContainer>
  );
};

export { GeneralTab };
