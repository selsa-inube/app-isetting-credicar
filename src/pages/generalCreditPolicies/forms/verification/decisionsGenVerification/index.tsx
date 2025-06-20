import { Grid, Stack, Tag } from "@inubekit/inubekit";

import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { IRenderDecisionsGenVerification } from "@ptypes/generalCredPolicies/forms/IRenderDecisionsGenVerification";
import { ComponentAppearance } from "@enum/appearances";
import { verificationLabels } from "@config/generalCreditPolicies/assisted/verificationLabels";
import { renderValue } from "@utils/renderValue";
import { dataTranslations } from "@utils/dataTranslations";

const RenderDecisionsGenVerification = (
  props: IRenderDecisionsGenVerification,
) => {
  const { values, isMobile } = props;

  const showMethods = values.reciprocity || values.factor || values.calculation;

  return (
    <>
      <Grid
        width="100%"
        templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
        templateRows={isMobile ? "repeat(6, 1fr)" : "repeat(3, 1fr)"}
        gap={tokens.spacing.s200}
      >
        <BoxAttribute
          direction="column"
          label={verificationLabels.reference}
          value={dataTranslations[values.reference] ?? values.reference}
        />
        {showMethods && (
          <BoxAttribute
            direction="column"
            label={verificationLabels.methods}
            withTag
          >
            <Stack
              gap={tokens.spacing.s100}
              direction={isMobile ? "column" : "row"}
            >
              {values.reciprocity && (
                <Tag
                  appearance={ComponentAppearance.GRAY}
                  label={verificationLabels.reciprocity}
                  displayIcon={false}
                />
              )}
              {values.factor && (
                <Tag
                  appearance={ComponentAppearance.GRAY}
                  label={verificationLabels.factor}
                  displayIcon={false}
                />
              )}
              {values.calculation && (
                <Tag
                  appearance={ComponentAppearance.GRAY}
                  label={verificationLabels.calculation}
                  displayIcon={false}
                />
              )}
            </Stack>
          </BoxAttribute>
        )}

        <BoxAttribute
          direction="column"
          label={verificationLabels.additionalDebtors}
          value={renderValue(values.additionalDebtors)}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.sourcesIncome}
          value={renderValue(values.sourcesIncome)}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.financialObligations}
          value={renderValue(values.financialObligations)}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.realGuarantees}
          value={renderValue(values.realGuarantees)}
        />
      </Grid>
    </>
  );
};

export { RenderDecisionsGenVerification };
