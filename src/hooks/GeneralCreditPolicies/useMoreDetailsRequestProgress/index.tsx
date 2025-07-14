import { useState } from "react";

import { IRuleDecision } from "@isettingkit/input";
import { IUseMoreDetailsRequest } from "@ptypes/generalCredPolicies/IUseMoreDetailsRequest";
import { IEntry } from "@ptypes/design/table/IEntry";
import { ENameRules } from "@enum/nameRules";
import { getDecisionsByRule } from "@utils/getDecisionsByRule";
import { formatDetailsDecisions } from "@utils/formatDetailsDecisions";
import { optionsMethods } from "@config/generalCreditPolicies/editGeneralPolicies/optionsMethods";
import { ERulesOfDecisions } from "@enum/rulesOfDecisions";
import { EGeneralPolicies } from "@enum/generalPolicies";

const useMoreDetailsRequestProgress = (props: IUseMoreDetailsRequest) => {
  const { data } = props;
  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);
  let reference;
  let methods;
  let additionalDebtors;
  let sourcesIncome;
  let financialObligations;
  let realGuarantees;

  const onToggleMoreDetailsModal = () => {
    setShowMoreDetailsModal(!showMoreDetailsModal);
  };

  data.configurationRequestData.rules.map((rule: IEntry) => {
    if (rule === null) return;
    rule.decisionsByRule?.filter((decision: IRuleDecision) => {
      if (rule.ruleName === ENameRules.REFERENCE) {
        reference = decision.value;
      }

      if (rule.ruleName === ENameRules.ADDITIONAL_DEBTORS) {
        additionalDebtors = decision.value;
      }

      if (rule.ruleName === ENameRules.SOURCES_INCOME) {
        sourcesIncome = decision.value;
      }

      if (rule.ruleName === ENameRules.FINANCIAL_OBLIGATIONS) {
        financialObligations = decision.value;
      }

      if (rule.ruleName === ENameRules.REAL_GUARANTEES) {
        realGuarantees = decision.value;
      }

      if (rule.ruleName === ENameRules.METHODS) {
        const calculation =
          decision.value ===
            ERulesOfDecisions.CALCULATION_BY_PAYMENT_CAPACITY &&
          optionsMethods.CalculationByPaymentCapacity;
        const factor =
          decision.value === ERulesOfDecisions.RISK_FACTOR &&
          optionsMethods.RiskFactor;
        const reciprocity =
          decision.value === ERulesOfDecisions.RECIPROCITY_OF_CONTRIBUTIONS &&
          optionsMethods.ReciprocityOfContributions;

        methods = [calculation, factor, reciprocity].filter(Boolean).join(", ");
      }
    });
  });

  const moreDetailsData = {
    id: data.id,
    creditApplication: reference,
    methods: methods,
    additionalDebtors: additionalDebtors,
    sourcesIncome: sourcesIncome,
    financialOblig: financialObligations,
    guarantees: realGuarantees,
  };

  const decisionsReciprocity = getDecisionsByRule(
    formatDetailsDecisions(data),
    ENameRules.CONTRIBUTIONS_PORTFOLIO,
  );
  const decisionsIncomePortfolio = getDecisionsByRule(
    formatDetailsDecisions(data),
    ENameRules.INCOME_PORTFOLIO,
  );
  const decisionsScoreModels = getDecisionsByRule(
    formatDetailsDecisions(data),
    ENameRules.SCORE_MODELS,
    (condition: IEntry) =>
      condition.conditionName !== EGeneralPolicies.CONDITION_BUSINESS_UNIT,
  );

  const isMoreDetails =
    data.useCaseName === EGeneralPolicies.DELETE_GENERAL_POLICIES ||
    data.useCaseName === EGeneralPolicies.MODIFY_GENERAL_POLICIES;

  return {
    showMoreDetailsModal,
    moreDetailsData,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
    isMoreDetails,
    onToggleMoreDetailsModal,
  };
};

export { useMoreDetailsRequestProgress };
