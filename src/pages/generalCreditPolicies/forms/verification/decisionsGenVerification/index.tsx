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

  const renderMethodTags = (values: {
    reciprocity: boolean;
    factor: boolean;
    calculation: boolean;
  }) => {
    const methods = [
      { condition: values.reciprocity, label: verificationLabels.reciprocity },
      { condition: values.factor, label: verificationLabels.factor },
      { condition: values.calculation, label: verificationLabels.calculation },
    ];

    const activeMethods = methods.filter((method) => method.condition);

    if (activeMethods.length === 0) {
      return (
        <Tag
          appearance={ComponentAppearance.DANGER}
          label={verificationLabels.noDefined}
          displayIcon={false}
        />
      );
    }

    return activeMethods.map((method) => (
      <Tag
        key={method.label}
        appearance={ComponentAppearance.GRAY}
        label={method.label}
        displayIcon={false}
      />
    ));
  };

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

        <BoxAttribute
          direction="column"
          label={verificationLabels.methods}
          withTag
        >
          <Stack
            gap={tokens.spacing.s100}
            direction={isMobile ? "column" : "row"}
          >
            {renderMethodTags(values)}
          </Stack>
        </BoxAttribute>

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
