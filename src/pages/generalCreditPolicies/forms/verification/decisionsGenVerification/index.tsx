import { Grid, Stack } from "@inubekit/inubekit";

import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { renderValue } from "@utils/renderValue";
import { validateOptionVerification } from "@utils/validateOptionVerification";
import { rowsAttribute } from "@utils/rowsAttribute";
import { rows } from "@utils/rowsVerificationPolicies";
import { verificationLabels } from "@config/generalCreditPolicies/assisted/verificationLabels";
import { IRenderDecisionsGenVerification } from "@ptypes/generalCredPolicies/forms/IRenderDecisionsGenVerification";
import { RenderMethodTags } from "./renderMethodTags";
import { RenderCreditBurTags } from "../rendercreditBurTags";

const RenderDecisionsGenVerification = (
  props: IRenderDecisionsGenVerification,
) => {
  const { values, isMobile, optionsGenDecision } = props;

  const {
    additionalDebtors,
    realGuarantees,
    PaymentCapacityBasedCreditLimit,
    ReciprocityBasedCreditLimit,
    RiskAnalysisBasedCreditLimit,
    DATACREDITO_EXPERIAN,
    TRANSUNION,
    inquiryValidityPeriod,
    lineCreditPayrollAdvance,
    lineCreditPayrollSpecialAdvance,
    maximumNotifDocSize,
  } = values;

  return (
    <>
      <Grid
        width="100%"
        height="auto"
        templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
        templateRows={rowsAttribute(rows(values), isMobile)}
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
          label={verificationLabels.creditBureausConsultReq}
          withTag
        >
          <Stack
            gap={tokens.spacing.s100}
            direction={isMobile ? "column" : "row"}
            wrap="wrap"
          >
            {
              <RenderCreditBurTags
                datacreditoExperian={DATACREDITO_EXPERIAN}
                transunion={TRANSUNION}
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
        {inquiryValidityPeriod && inquiryValidityPeriod > 0 && (
          <BoxAttribute
            direction="column"
            label={verificationLabels.inquiryValidityPeriod}
            value={inquiryValidityPeriod}
          />
        )}
        {lineCreditPayrollAdvance && lineCreditPayrollAdvance.length > 0 && (
          <BoxAttribute
            direction="column"
            label={verificationLabels.lineCreditPayrollAdvance}
            value={validateOptionVerification(
              optionsGenDecision,
              "payrollAdvance",
              lineCreditPayrollAdvance,
            )}
          />
        )}
        {lineCreditPayrollSpecialAdvance &&
          lineCreditPayrollSpecialAdvance.length > 0 && (
            <BoxAttribute
              direction="column"
              label={verificationLabels.lineCreditPayrollSpecialAdvance}
              value={validateOptionVerification(
                optionsGenDecision,
                "payrollSpecialAdvance",
                lineCreditPayrollSpecialAdvance,
              )}
            />
          )}
        {maximumNotifDocSize && maximumNotifDocSize > 0 && (
          <BoxAttribute
            direction="column"
            label={verificationLabels.maximumNotifDocSize}
            value={maximumNotifDocSize}
          />
        )}
      </Grid>
    </>
  );
};

export { RenderDecisionsGenVerification };
