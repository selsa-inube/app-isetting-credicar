import { ENameRules } from "@enum/nameRules";
import { EBooleanText } from "@enum/booleanText";
import { ERulesOfDecisions } from "@enum/rulesOfDecisions";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { formatRuleDecisions } from "@utils/formatRuleDecisions";
import { IUseRules } from "@ptypes/hooks/IUseRules";

const useRules = (props: IUseRules) => {
  const {
    formValues,
    dateVerification,
    contributionsPortfolio,
    incomePortfolio,
    scoreModels,
  } = props;
  const decisionGeneralData = formValues.decisionsGeneral.values;

  const decisionWithoutConditions = (
    ruleName: string,
    value: string | boolean,
  ) => {
    const data =
      typeof value === "boolean"
        ? value
          ? EBooleanText.Y
          : EBooleanText.N
        : value;

    return [
      {
        value: data,
        ruleName: ruleName,
      },
    ];
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

  const methodsArray =
    calculation || factor || reciprocity
      ? [calculation, factor, reciprocity].filter(Boolean)
      : ["No"];

  const methods = {
    ruleName: ENameRules.METHODS,
    decisionsByRule: methodsArray.map((method) => ({
      effectiveFrom:
        dateVerification?.date && formatDateDecision(dateVerification?.date),
      value: method,
    })),
  };

  const realGuaranteesValues = decisionWithoutConditions(
    ENameRules.REAL_GUARANTEES,
    decisionGeneralData.realGuarantees,
  );

  const realGuarantees = formatRuleDecisions(
    realGuaranteesValues,
    dateVerification?.date,
  );

  const rulesContributions = formatRuleDecisions(
    contributionsPortfolio,
    dateVerification?.date,
  );
  const rulesIncomes = formatRuleDecisions(
    incomePortfolio,
    dateVerification?.date,
  );

  const ruleScoremodels = formatRuleDecisions(
    scoreModels,
    dateVerification?.date,
  );

  const rules = [
    methods,
    ...rulesContributions,
    ...rulesIncomes,
    ...ruleScoremodels,
    ...realGuarantees,
  ];

  return {
    rules,
  };
};

export { useRules };
