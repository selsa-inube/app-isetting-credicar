import { Grid, Stack } from "@inubekit/inubekit";

import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { renderValue } from "@utils/renderValue";
import { verificationLabels } from "@config/generalCreditPolicies/assisted/verificationLabels";
import { IRenderDecisionsGenVerification } from "@ptypes/generalCredPolicies/forms/IRenderDecisionsGenVerification";
import { RenderMethodTags } from "./renderMethodTags";

const RenderDecisionsGenVerification = (
  props: IRenderDecisionsGenVerification,
) => {
  const { values, isMobile } = props;

  const {
    additionalDebtors,
    realGuarantees,
    PaymentCapacityBasedCreditLimit,
    ReciprocityBasedCreditLimit,
    RiskAnalysisBasedCreditLimit,
    creditBureausConsultReq,
    inquiryValidityPeriod,
    // lineCreditPayrollAdvance,
    // lineCreditPayrollSpecialAdvance,
    maximumNotifDocSize,
  } = values;

  return (
    <>
      <Grid
        width="100%"
        templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
        templateRows={isMobile ? "repeat(8, 1fr)" : "repeat(4, 1fr)"}
        gap={tokens.spacing.s200}
      >
        <BoxAttribute
          direction="column"
          label={verificationLabels.methods}
          withTag
        >
          <Stack
            gap={tokens.spacing.s100}
            direction={isMobile ? "column" : "row"}
            wrap="wrap"
          >
            {
              <RenderMethodTags
                PaymentCapacityBasedCreditLimit={
                  PaymentCapacityBasedCreditLimit
                }
                ReciprocityBasedCreditLimit={ReciprocityBasedCreditLimit}
                RiskAnalysisBasedCreditLimit={RiskAnalysisBasedCreditLimit}
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
          label={verificationLabels.realGuarantees}
          value={renderValue(realGuarantees)}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.creditBureausConsultReq}
          value={renderValue(creditBureausConsultReq)}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.inquiryValidityPeriod}
          value={renderValue(inquiryValidityPeriod)}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.lineCreditPayrollAdvance}
          value={""} //////////////verificar
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.lineCreditPayrollSpecialAdvance}
          value={""}
        />
        <BoxAttribute
          direction="column"
          label={verificationLabels.maximumNotifDocSize}
          value={renderValue(maximumNotifDocSize)}
        />
      </Grid>
    </>
  );
};

export { RenderDecisionsGenVerification };
