import { useState } from "react";

import { IUseMoreDetailsRequest } from "@ptypes/generalCredPolicies/IUseMoreDetailsRequest";
import { IEntry } from "@ptypes/design/table/IEntry";
import { nameRules } from "@config/generalCreditPolicies/assisted/nameRules";
import { getDecisionsByRule } from "@utils/getDecisionsByRule";
import { formatDetailsDecisions } from "@utils/formatDetailsDecisions";
import { optionsMethods } from "@config/generalCreditPolicies/editGeneralPolicies/optionsMethods";

const useMoreDetailsRequestProgress = (props: IUseMoreDetailsRequest) => {
  const { data } = props;
  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);

  const onToggleMoreDetailsModal = () => {
    setShowMoreDetailsModal(!showMoreDetailsModal);
  };

  const calculation =
    data.configurationRequestData?.calculation && optionsMethods.calculation;

  const factor = data.configurationRequestData?.factor && optionsMethods.factor;

  const reciprocity =
    data.configurationRequestData?.reciprocity && optionsMethods.reciprocity;

  const methodsArr = [calculation, factor, reciprocity].filter(Boolean);
  const methods = methodsArr.length > 0 ? methodsArr.join(", ") : undefined;

  const moreDetailsData = {
    id: data.id,
    creditApplication: data.configurationRequestData.reference,
    methods: methods,
    additionalDebtors: data.configurationRequestData.additionalDebtors,
    sourcesIncome: data.configurationRequestData.sourcesIncome,
    financialOblig: data.configurationRequestData.financialObligations,
    guarantees: data.configurationRequestData.realGuarantees,
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
