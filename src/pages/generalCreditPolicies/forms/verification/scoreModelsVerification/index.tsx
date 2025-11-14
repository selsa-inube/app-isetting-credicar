import { Grid } from "@inubekit/inubekit";
import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { columnsAttribute } from "@utils/columnsAttribute";
import { rowsAttribute } from "@utils/rowsAttribute";
import { formatValueOfCondition } from "@utils/formatValueOfCondition";
import { IEntry } from "@ptypes/design/table/IEntry";
import { BoxContainer } from "@design/layout/boxContainer";
import { IRenderContributionsVerification } from "@ptypes/generalCredPolicies/forms/IRenderContributionsVerification";
import { EComponentAppearance } from "@enum/appearances";

const RendersCoreModelsVerification = (
  props: IRenderContributionsVerification,
) => {
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

export { RendersCoreModelsVerification };
