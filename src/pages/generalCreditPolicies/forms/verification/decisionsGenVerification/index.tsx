import { Grid, Stack } from "@inubekit/inubekit";

import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { IRenderDecisionsGenVerification } from "@ptypes/generalCredPolicies/forms/IRenderDecisionsGenVerification";
import { verificationLabels } from "@config/generalCreditPolicies/assisted/verificationLabels";
import { renderValue } from "@utils/renderValue";
import { dataTranslations } from "@utils/dataTranslations";
import { RenderMethodTags } from "./renderMethodTags";

const RenderDecisionsGenVerification = (
  props: IRenderDecisionsGenVerification,
) => {
  const { values, isMobile } = props;

  const {
    reference,
    additionalDebtors,
    sourcesIncome,
    financialObligations,
    realGuarantees,
    reciprocity,
    factor,
    calculation,
  } = values;

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
          value={dataTranslations[reference] ?? reference}
        />

        <BoxAttribute
          direction="column"
          label={verificationLabels.methods}
          withTag
        >
          <Stack
            gap={tokens.spacing.s100}
            direction={isMobile ? "column" : "row"}
          >
            {
              <RenderMethodTags
                reciprocity={reciprocity}
                factor={factor}
                calculation={calculation}
              />
            }
          </Stack>
        </BoxAttribute>

        <BoxAttribute
          direction="column"
          label={verificationLabels.additionalDebtors}
          value={renderValue(additionalDebtors)}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.sourcesIncome}
          value={renderValue(sourcesIncome)}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.financialObligations}
          value={renderValue(financialObligations)}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.realGuarantees}
          value={renderValue(realGuarantees)}
        />
      </Grid>
    </>
  );
};

export { RenderDecisionsGenVerification };
