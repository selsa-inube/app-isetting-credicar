import { ENameRules } from "@enum/nameRules";
import { EBooleanText } from "@enum/booleanText";
import { ERulesOfDecisions } from "@enum/rulesOfDecisions";
import { decisionWithMultipleValues } from "@utils/decisionWithMultipleValuesAdd";
import { formatRuleDecisions } from "@utils/formatRuleDecisions";
import { IUseRules } from "@ptypes/hooks/IUseRules";

const useRules = (props: IUseRules) => {
  const { formValues, dateVerification, rulesData } = props;
  const decisionGeneralData = formValues.decisionsGeneral.values;

  const decisionWithoutConditions = (
    ruleName: string,
    value: string | boolean | number | undefined,
  ) => {
    const data =
      typeof value === "boolean"
        ? value
          ? EBooleanText.Y
          : EBooleanText.N
        : value;

    return value
      ? [
          {
            decisionsByRule: [
              { effectiveFrom: dateVerification.date, value: data },
            ],
            ruleName: ruleName,
          },
        ]
      : [];
  };

  const calculation =
    decisionGeneralData.PaymentCapacityBasedCreditLimit &&
    ERulesOfDecisions.CALCULATION_BY_PAYMENT_CAPACITY;

  const factor =
    decisionGeneralData.RiskAnalysisBasedCreditLimit &&
    ERulesOfDecisions.RISK_FACTOR;

  const reciprocity =
    decisionGeneralData.ReciprocityBasedCreditLimit &&
    ERulesOfDecisions.RECIPROCITY_OF_CONTRIBUTIONS;

  const datacreditoExperian =
    decisionGeneralData.DATACREDITO_EXPERIAN &&
    ERulesOfDecisions.DATACREDITO_EXPERIAN;

  const transunion =
    decisionGeneralData.TRANSUNION && ERulesOfDecisions.TRANSUNION;

  const methodsArray =
    calculation || factor || reciprocity
      ? [calculation, factor, reciprocity].filter(Boolean)
      : [EBooleanText.NO];

  const creditBureausArray =
    datacreditoExperian || transunion
      ? [datacreditoExperian, transunion].filter(Boolean)
      : [EBooleanText.NO];

  const methods = {
    ruleName: ENameRules.METHODS,
    decisionsByRule: methodsArray.map((method) => ({
      effectiveFrom: dateVerification?.date && dateVerification?.date,
      value: method,
    })),
  };

  const creditBureaus = {
    ruleName: ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED,
    decisionsByRule: creditBureausArray.map((credit) => ({
      effectiveFrom: dateVerification?.date && dateVerification?.date,
      value: credit,
    })),
  };

  const additionalDebtorsValues = decisionWithoutConditions(
    ENameRules.ADDITIONAL_DEBTORS,
    decisionGeneralData.additionalDebtors,
  );

  const realGuaranteesValues = decisionWithoutConditions(
    ENameRules.REAL_GUARANTEES,
    decisionGeneralData.realGuarantees,
  );

  const inquiryValidityPeriodValues = decisionWithoutConditions(
    ENameRules.INQUIRY_VALIDITY_PERIOD,
    decisionGeneralData.inquiryValidityPeriod,
  );
  const lineCredPayrollAdvanceValues = decisionWithMultipleValues(
    ENameRules.LINE_CREDIT_PAYROLL_ADVANCE,
    decisionGeneralData.lineCreditPayrollAdvance,
    dateVerification,
  );
  const lineCredPayrollSpecialAdvanceValues = decisionWithMultipleValues(
    ENameRules.LINE_CREDIT_PAYROLL_SPECIAL_ADVANCE,
    decisionGeneralData.lineCreditPayrollSpecialAdvance,
    dateVerification,
  );

  const maximumNotifDocSizeValues = decisionWithoutConditions(
    ENameRules.MAXIMUM_NOTIFICATION_DOCUMENT_SIZE,
    decisionGeneralData.maximumNotifDocSize,
  );

  const rulesContributions = formatRuleDecisions(
    rulesData.ReciprocityFactorForCreditLimit,
    dateVerification?.date,
  );
  const rulesIncomes = formatRuleDecisions(
    rulesData.RiskScoreFactorForCreditLimit,
    dateVerification?.date,
  );

  const ruleScoremodels = formatRuleDecisions(
    rulesData.CreditRiskScoringModel,
    dateVerification?.date,
  );

  const ruleMinimumIncome = formatRuleDecisions(
    rulesData.MinimumSubsistenceReservePercentage,
    dateVerification?.date,
  );

  const ruleBasicNotifForm = formatRuleDecisions(
    rulesData.BasicNotificationFormat,
    dateVerification?.date,
  );
  const ruleBasicNotifRec = formatRuleDecisions(
    rulesData.BasicNotificationRecipient,
    dateVerification?.date,
  );
  const ruleMinCredBureauRiskScore = formatRuleDecisions(
    rulesData.MinimumCreditBureauRiskScore,
    dateVerification?.date,
  );
  const ruleNotificationChannel = formatRuleDecisions(
    rulesData.NotificationChannel,
    dateVerification?.date,
  );
  const ruleRiskScoreApiUrl = formatRuleDecisions(
    rulesData.RiskScoreApiUrl,
    dateVerification?.date,
  );

  const rules = [
    methods,
    creditBureaus,
    ...rulesContributions,
    ...rulesIncomes,
    ...ruleScoremodels,
    ...additionalDebtorsValues,
    ...realGuaranteesValues,
    ...inquiryValidityPeriodValues,
    ...lineCredPayrollAdvanceValues,
    ...lineCredPayrollSpecialAdvanceValues,
    ...maximumNotifDocSizeValues,
    ...ruleMinimumIncome,
    ...ruleBasicNotifForm,
    ...ruleBasicNotifRec,
    ...ruleMinCredBureauRiskScore,
    ...ruleNotificationChannel,
    ...ruleRiskScoreApiUrl,
  ].filter((rule) => {
    if (Array.isArray(rule)) return rule.length > 0;
    return rule && rule.decisionsByRule && rule.decisionsByRule.length > 0;
  });
  return {
    rules,
  };
};

export { useRules };
