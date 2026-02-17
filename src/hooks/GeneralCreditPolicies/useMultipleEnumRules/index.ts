import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { IRuleDataMap } from "@ptypes/generalCredPolicies/forms/IRuleDataMap";
import { IUseMultipleEnumRules } from "@ptypes/generalCredPolicies/forms/IUseMultipleEnumRules";

const useMultipleEnumRules = (props: IUseMultipleEnumRules) => {
  const { ruleNames, ruleCatalog, catalogAction, businessUnits, token } = props;

  const rulesDataMap: IRuleDataMap = {};
  const loadingStates: Record<string, boolean> = {};

  ruleNames.forEach((ruleName) => {
    const { ruleData, loadingList } = useEnumRules({
      enumDestination: ruleName,
      ruleCatalog,
      catalogAction,
      businessUnits,
      token,
    });

    rulesDataMap[ruleName] = ruleData;
    loadingStates[ruleName] = loadingList;
  });

  const isLoading = Boolean(
    Object.values(loadingStates).some((loading) => loading),
  );

  return {
    rulesDataMap,
    isLoading,
    loadingStates,
  };
};

export { useMultipleEnumRules };
