import { Grid } from "@inubekit/inubekit";
import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { EComponentAppearance } from "@enum/appearances";
import { columnsAttribute } from "@utils/columnsAttribute";
import { formatValueOfCondition } from "@utils/formatValueOfCondition";
import { rowsAttribute } from "@utils/rowsAttribute";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IRenderContributionsVerification } from "@ptypes/generalCredPolicies/forms/IRenderContributionsVerification";

const RendersRuleVerification = (props: IRenderContributionsVerification) => {
  const { values, isMobile } = props;

  return (
    <BoxContainer
      direction="column"
      borderRadius={tokens.spacing.s100}
      width="100%"
      backgroundColor={EComponentAppearance.LIGHT}
      boxSizing="initial"
    >
      {values && (
        <Grid
          key={values[0].decisionId}
          width="100%"
          height="auto"
          templateColumns={columnsAttribute(values as IEntry[], isMobile)}
          templateRows={rowsAttribute(values as IEntry[], isMobile)}
          gap={tokens.spacing.s200}
        >
          {values.map((item) => (
            <BoxAttribute
              key={item.businessRuleId}
              direction="column"
              label={item.decisionId ?? ""}
              value={`${item.labelName}: ${formatValueOfCondition(item.value)}`}
            />
          ))}
        </Grid>
      )}
    </BoxContainer>
  );
};

export { RendersRuleVerification };
