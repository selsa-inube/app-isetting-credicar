/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IRuleDecision } from "@isettingkit/input";
import { interestRateTypeTemplate } from "..";

const placeholderTemplate = (ruleName: string): any => ({
  ruleName,
  labelName: ruleName,
  descriptionUse: "",
  decisionDataType: 0 as any,
  howToSetTheDecision: 0 as any,
  value: "",
  effectiveFrom: "",
  validUntil: "",
  conditionsThatEstablishesTheDecision: [],
  i18n: { es: ruleName, en: ruleName },
});

const decisionTemplates: Record<string, IRuleDecision> = {
  "interest-rate-type": interestRateTypeTemplate as any,
  "loan-term": placeholderTemplate("Loan Term"),
  "amortization-methods": placeholderTemplate("Amortization Methods"),
  "rate-increase": placeholderTemplate("Rate Increase"),
  "increment-value": placeholderTemplate("Increment Value"),
  "disbursement-methods": placeholderTemplate("Disbursement Methods"),
  "suggested-payment-channel": placeholderTemplate("Suggested Payment Channel"),
  "percentage-requested-amount": placeholderTemplate(
    "Percentage Requested Amount",
  ),
  "grace-period": placeholderTemplate("Grace Period"),
  "payment-channel-extraInstallments": placeholderTemplate(
    "Payment Channel Extra Installments",
  ),
  "adjustment-interest-payment-type": placeholderTemplate(
    "Adjustment Interest Payment Type",
  ),
  "line-credit": placeholderTemplate("Line Credit"),
  "channels-credit-by-Line": placeholderTemplate("Channels Credit by Line"),
  "loan-amount-limit": placeholderTemplate("Loan Amount Limit"),
  "maximum-percentage-extraordinary": placeholderTemplate(
    "Maximum Percentage Extraordinary",
  ),
  "percentage-available-monthly-payment": placeholderTemplate(
    "Percentage Available Monthly Payment",
  ),
  "lines-not-subtracted-analysis": placeholderTemplate(
    "Lines Not Subtracted Analysis",
  ),
};

export { decisionTemplates };
