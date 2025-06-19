import { useState } from "react";

import { IRuleDecision } from "@isettingkit/input";
import { IUseMoreDetailsRequest } from "@ptypes/generalCredPolicies/IUseMoreDetailsRequest";
import { IEntry } from "@ptypes/design/table/IEntry";
import { nameRules } from "@config/generalCreditPolicies/assisted/nameRules";
import { getDecisionsByRule } from "@utils/getDecisionsByRule";
import { formatDetailsDecisions } from "@utils/formatDetailsDecisions";
import { optionsMethods } from "@config/generalCreditPolicies/editGeneralPolicies/optionsMethods";
import { ERulesOfDecisions } from "@src/enum/rulesOfDecisions";

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
      if (rule.ruleName === nameRules.reference) {
        reference = decision.value;
      }

      if (rule.ruleName === nameRules.additionalDebtors) {
        additionalDebtors = decision.value;
      }

      if (rule.ruleName === nameRules.sourcesIncome) {
        sourcesIncome = decision.value;
      }

      if (rule.ruleName === nameRules.financialObligations) {
        financialObligations = decision.value;
      }

      if (rule.ruleName === nameRules.realGuarantees) {
        realGuarantees = decision.value;
      }

      if (rule.ruleName === nameRules.methods) {
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
    nameRules.contributionsPortfolio,
  );
  const decisionsIncomePortfolio = getDecisionsByRule(
    formatDetailsDecisions(data),
    nameRules.incomePortfolio,
  );
  const decisionsScoreModels = getDecisionsByRule(
    formatDetailsDecisions(data),
    nameRules.scoreModels,
    (condition: IEntry) => condition.conditionName !== "BusinessUnit",
  );

  const isMoreDetails =
    data.useCaseName === "DeleteGeneralCreditPolicies" ||
    data.useCaseName === "ModifyGeneralCreditPolicies";

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
