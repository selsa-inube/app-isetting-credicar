import { useContext, useMemo } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { ENameRules } from "@enum/nameRules";
import { ECreditLines } from "@enum/creditLines";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { useMultipleEnumRules } from "../useMultipleEnumRules";

const useEnumRulesPolicies = () => {
  const { appData } = useContext(AuthAndPortalData);

  const { rulesDataMap, isLoading: isLoadingEnums } = useMultipleEnumRules({
    ruleNames: [
      ENameRules.LINE_CREDIT_PAYROLL_ADVANCE,
      ENameRules.LINE_CREDIT_PAYROLL_SPECIAL_ADVANCE,
      ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED,
    ],
    ruleCatalog: ECreditLines.RULE_CATALOG,
    catalogAction: ECreditLines.CATALOG_ACTION,
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const optionMap = useMemo(() => {
    const map: Record<string, IServerDomain[]> = {};

    Object.keys(rulesDataMap).forEach((ruleName) => {
      const ruleData = rulesDataMap[ruleName] as IRuleDecisionExtended;
      if (ruleData?.listOfPossibleValues?.list) {
        map[ruleName] = ruleData.listOfPossibleValues
          .list as unknown as IServerDomain[];
      }
    });

    return map;
  }, [rulesDataMap]);

  const payrollAdvanceOptions: IServerDomain[] =
    optionMap[ENameRules.LINE_CREDIT_PAYROLL_ADVANCE];
  const payrollSpecialAdvanceOptions: IServerDomain[] =
    optionMap[ENameRules.LINE_CREDIT_PAYROLL_SPECIAL_ADVANCE];

  const creditBureausOptions: IServerDomain[] =
    optionMap[ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED];

  return {
    isLoadingEnums,
    payrollAdvanceOptions,
    payrollSpecialAdvanceOptions,
    creditBureausOptions,
  };
};

export { useEnumRulesPolicies };
