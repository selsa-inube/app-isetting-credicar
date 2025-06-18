import { formatRuleDecisions } from "@utils/formatRuleDecisions";
import { nameRules } from "@config/generalCreditPolicies/assisted/nameRules";
import { IUseRules } from "@ptypes/hooks/IUseRules";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { BooleanText } from "@src/enum/booleanText";
import { rulesOfDecisions } from "@src/enum/rulesOfDecisions";

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
          ? BooleanText.Yes
          : BooleanText.No
        : value;

    return [
      {
        value: data,
        ruleName: ruleName,
      },
    ];
  };

  const referenceValues = decisionWithoutConditions(
    nameRules.reference,
    decisionGeneralData.reference,
  );

  const calculation =
    decisionGeneralData.calculation &&
    rulesOfDecisions.CALCULATION_BY_PAYMENT_CAPACITY;
  const factor =
    decisionGeneralData.factor && rulesOfDecisions.RECIPROCITY_OF_CONTRIBUTIONS;
  const reciprocity =
    decisionGeneralData.reciprocity && rulesOfDecisions.RISK_FACTOR;

  const methodsArray =
    calculation || factor || reciprocity
      ? [calculation, factor, reciprocity].filter(Boolean)
      : ["No"];

  const methods = {
    ruleName: nameRules.methods,
    decisionsByRule: methodsArray.map((method) => ({
      effectiveFrom:
        dateVerification?.date && formatDateDecision(dateVerification?.date),
      value: method,
    })),
  };

  const additionalDebtorsValues = decisionWithoutConditions(
    nameRules.additionalDebtors,
    decisionGeneralData.additionalDebtors,
  );

  const sourcesIncomeValues = decisionWithoutConditions(
    nameRules.sourcesIncome,
    decisionGeneralData.sourcesIncome,
  );

  const financialObligationsValues = decisionWithoutConditions(
    nameRules.financialObligations,
    decisionGeneralData.financialObligations,
  );

  const realGuaranteesValues = decisionWithoutConditions(
    nameRules.realGuarantees,
    decisionGeneralData.realGuarantees,
  );

  const reference = referenceValues
    ? formatRuleDecisions(referenceValues, dateVerification?.date)
    : [];

  const financialObligations = formatRuleDecisions(
    financialObligationsValues,
    dateVerification?.date,
  );

  const additionalDebtors = formatRuleDecisions(
    additionalDebtorsValues,
    dateVerification?.date,
  );

  const sourcesIncome = formatRuleDecisions(
    sourcesIncomeValues,
    dateVerification?.date,
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
    ...reference,
    methods,
    ...rulesContributions,
    ...rulesIncomes,
    ...ruleScoremodels,
    ...additionalDebtors,
    ...sourcesIncome,
    ...financialObligations,
    ...realGuarantees,
  ];

  return {
    rules,
  };
};

export { useRules };
