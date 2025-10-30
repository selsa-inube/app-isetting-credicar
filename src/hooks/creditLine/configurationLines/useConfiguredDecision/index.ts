import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useGetConfiguredDecisions } from "@hooks/rules/useGetConfiguredDecisions";
import { useGetDecisionsByValue } from "@hooks/rules/useGetDecisionsByValue";
import { ECreditLines } from "@enum/creditLines";
import { rulesExcludedByEvaluate } from "@config/creditLines/configuration/rulesExcludedByEvaluate";
import { IUseConfiguredDecision } from "@ptypes/hooks/creditLines/IUseConfiguredDecision";

const useConfiguredDecision = (props: IUseConfiguredDecision) => {
  const {
    ruleName,
    decisionValue,
    useCaseConfiguration,
    linesConstructionData,
  } = props;

  const { appData } = useContext(AuthAndPortalData);

  const conditionName =
    ruleName === ECreditLines.CLIENT_SUPPORT_RULE
      ? "CreditRiskProfile"
      : ECreditLines.CREDIT_LINE_RULE
        ? "MoneyDestination"
        : "";

  const DecisionsByCondition = useGetDecisionsByValue({
    ruleName,
    decisionValue,
    conditionName,
    businessUnit: appData.businessUnit.publicCode,
    useCase: useCaseConfiguration,
  });

  const decisions = useGetConfiguredDecisions({
    useCase: useCaseConfiguration,
    rule: ruleName,
    businessUnits: appData.businessUnit.publicCode,
    ruleData: {
      ruleName,
      conditions: [
        {
          condition: ECreditLines.CREDIT_LINE_RULE,
          value: linesConstructionData.abbreviatedName as string,
        },
      ],
    },
  });

  const validateRule = rulesExcludedByEvaluate.includes(ruleName);

  if (validateRule) {
    return {
      configuredDecisions: DecisionsByCondition.configuredDecisions,
      loading: DecisionsByCondition.loading,
      hasError: DecisionsByCondition.hasError,
      errorData: DecisionsByCondition.errorData,
    };
  }

  return {
    configuredDecisions: decisions.configuredDecisions,
    loading: decisions.loading,
    hasError: decisions.hasError,
    errorData: decisions.errorData,
  };
};

export { useConfiguredDecision };
