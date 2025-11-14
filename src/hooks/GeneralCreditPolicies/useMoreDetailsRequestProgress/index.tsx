import { useContext, useState } from "react";

import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { ECreditLines } from "@enum/creditLines";
import { ENameRules } from "@enum/nameRules";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { ERulesOfDecisions } from "@enum/rulesOfDecisions";
import { EBooleanText } from "@enum/booleanText";
import { getConditionsTraduction } from "@utils/getConditionsTraduction";
import { IEntry } from "@ptypes/design/table/IEntry";
import { getDecisionsByRule } from "@utils/getDecisionsByRule";
import { formatDetailsDecisions } from "@utils/formatDetailsDecisions";
import { optionsMethods } from "@config/generalCreditPolicies/editGeneralPolicies/optionsMethods";
import { IUseMoreDetailsRequest } from "@ptypes/generalCredPolicies/IUseMoreDetailsRequest";

const useMoreDetailsRequestProgress = (props: IUseMoreDetailsRequest) => {
  const { data } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);
  let additionalDebtors;
  let realGuarantees;

  const onToggleMoreDetailsModal = () => {
    setShowMoreDetailsModal(!showMoreDetailsModal);
  };

  const { ruleData: ruleContribution } = useEnumRules({
    enumDestination: ENameRules.CONTRIBUTIONS_PORTFOLIO,
    ruleCatalog: ECreditLines.RULE_CATALOG,
    catalogAction: ECreditLines.CATALOG_ACTION,
    businessUnits: appData.businessUnit.publicCode,
  });

  const { ruleData: ruleIncomePortfolio } = useEnumRules({
    enumDestination: ENameRules.INCOME_PORTFOLIO,
    ruleCatalog: ECreditLines.RULE_CATALOG,
    catalogAction: ECreditLines.CATALOG_ACTION,
    businessUnits: appData.businessUnit.publicCode,
  });

  const { ruleData: ruleMinimum } = useEnumRules({
    enumDestination: ENameRules.MINIMUM_INCOME_PERCENTAGE,
    ruleCatalog: ECreditLines.RULE_CATALOG,
    catalogAction: ECreditLines.CATALOG_ACTION,
    businessUnits: appData.businessUnit.publicCode,
  });

  const { conditionTraduction: conditionContribution } =
    getConditionsTraduction(ruleContribution, appData.language);
  const { conditionTraduction: conditionIncomePortfolio } =
    getConditionsTraduction(ruleIncomePortfolio, appData.language);
  const { conditionTraduction: conditionMinimum } = getConditionsTraduction(
    ruleMinimum,
    appData.language,
  );

  const methodsMap: Record<string, string> = {
    [ERulesOfDecisions.CALCULATION_BY_PAYMENT_CAPACITY]:
      optionsMethods.CalculationByPaymentCapacity,
    [ERulesOfDecisions.RISK_FACTOR]: optionsMethods.RiskFactor,
    [ERulesOfDecisions.RECIPROCITY_OF_CONTRIBUTIONS]:
      optionsMethods.ReciprocityOfContributions,
  };

  const methodsArray: string[] = [];

  data.configurationRequestData.rules.forEach((rule: IEntry) => {
    if (rule === null) return;

    rule.decisionsByRule?.forEach((decision: IRuleDecision) => {
      if (rule.ruleName === ENameRules.ADDITIONAL_DEBTORS) {
        additionalDebtors = decision.value;
      }

      if (rule.ruleName === ENameRules.REAL_GUARANTEES) {
        realGuarantees = decision.value;
      }

      if (
        rule.ruleName === ENameRules.METHODS &&
        methodsMap[decision.value as string]
      ) {
        methodsArray.push(methodsMap[decision.value as string]);
      }
    });
  });

  const valueBoolean = (value: string) =>
    value === EBooleanText.Y || value === EBooleanText.YES
      ? EBooleanText.YES
      : EBooleanText.NO;

  const methods = methodsArray.join(", ");
  const moreDetailsData = {
    id: data.id,
    methods: methods,
    additionalDebtors: valueBoolean(additionalDebtors ?? EBooleanText.NO),
    guarantees: valueBoolean(realGuarantees ?? EBooleanText.NO),
  };
  const decisionsReciprocity = getDecisionsByRule(
    formatDetailsDecisions(data, conditionContribution),
    ENameRules.CONTRIBUTIONS_PORTFOLIO,
  );
  const decisionsIncomePortfolio = getDecisionsByRule(
    formatDetailsDecisions(data, conditionIncomePortfolio),
    ENameRules.INCOME_PORTFOLIO,
  );

  const decisionsScoreModels = getDecisionsByRule(
    formatDetailsDecisions(data),
    ENameRules.SCORE_MODELS,
    (condition: IEntry) =>
      condition.conditionName !== EGeneralPolicies.CONDITION_BUSINESS_UNIT,
  );

  const decisionsMinimum = getDecisionsByRule(
    formatDetailsDecisions(data, conditionMinimum),
    ENameRules.MINIMUM_INCOME_PERCENTAGE,
  );

  const isMoreDetails = data.useCaseName === EGeneralPolicies.USE_CASE_EDIT;

  return {
    showMoreDetailsModal,
    moreDetailsData,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
    isMoreDetails,
    decisionsMinimum,
    onToggleMoreDetailsModal,
  };
};

export { useMoreDetailsRequestProgress };
