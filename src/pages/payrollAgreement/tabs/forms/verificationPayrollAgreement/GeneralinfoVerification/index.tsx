import { Grid } from "@inubekit/inubekit";

import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { normalizeEnumTranslation } from "@utils/normalizeEnumTranslation";
import { verificationLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/verificationLabels";
import { IRenderGeneralInfoVerification } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IRenderGeneralinfoVerification";

const RenderGeneralinfoVerification = (
  props: IRenderGeneralInfoVerification,
) => {
  const { values, isMobile } = props;
  return (
    <>
      <Grid
        width="100%"
        templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
        templateRows={isMobile ? "repeat(4, 1fr)" : "repeat(2, 1fr)"}
        gap={tokens.spacing.s200}
      >
        <BoxAttribute
          direction="column"
          label={verificationLabels.payrollName}
          value={values.abbreviatedName}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.PayrollTypeAgreement}
          value={normalizeEnumTranslation(values.typePayroll)?.name}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.SourcesIncome}
          value={values.sourcesOfIncome}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.daysToDetermineApplication}
          value={values.applicationDaysPayroll}
        />
      </Grid>
    </>
  );
};

export { RenderGeneralinfoVerification };
