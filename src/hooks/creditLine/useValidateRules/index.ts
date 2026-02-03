import { useContext, useState, useEffect } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEvaluateRuleByBusinessUnit } from "@hooks/rules/useEvaluateRuleByBusinessUnit";
import { ENameRules } from "@enum/nameRules";
import { dataTranslations } from "@utils/dataTranslations";

const useValidateRules = () => {
  const { appData } = useContext(AuthAndPortalData);
  const [businessRules, setBusinessRules] = useState<string[]>([]);

  const getRule = (ruleName: string) =>
    useEvaluateRuleByBusinessUnit({
      businessUnits: appData.businessUnit.publicCode,
      rulesData: {
        ruleName,
      },
      language: appData.language,
      token: appData.token,
    });

  const {
    evaluateRuleData: methodsData,
    loading: methodsLoadding,
    hasError: methodsError,
  } = getRule(ENameRules.METHODS);

  useEffect(() => {
    const rulesArray: string[] = [];

    if (methodsData?.length === 0 || methodsError) {
      rulesArray.push(dataTranslations[ENameRules.METHODS]);
    }

    setBusinessRules(rulesArray);
  }, [methodsData, methodsError]);

  return {
    loadingValidateRules: methodsLoadding,
    businessRules,
    methodsError,
  };
};

export { useValidateRules };
