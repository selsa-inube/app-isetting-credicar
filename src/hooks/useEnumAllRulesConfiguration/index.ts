import { useState, useEffect, useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getEnumeratorAllRules } from "@services/conditionsRules/getEnumeratorAllRules";
import { rules } from "@config/creditLines/configuration/rules";
import { IUseEnumAllRules } from "@ptypes/hooks/IUseEnumAllRules";
import { IDecisionData } from "@ptypes/decisions/IDecision";

const useEnumAllRulesConfiguration = (props: IUseEnumAllRules) => {
  const { ruleCatalog, catalogAction } = props;
  const [enumRuleData, setEnumRuleData] = useState<IDecisionData[]>([]);

  const { appData } = useContext(AuthAndPortalData);
  const [hasError, setHasError] = useState(false);

  const rulesData = rules.join(",");

  useEffect(() => {
    const fetchEnumData = async () => {
      try {
        const data = await getEnumeratorAllRules(
          rulesData,
          ruleCatalog,
          catalogAction,
          appData.businessUnit.publicCode,
        );
        setEnumRuleData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };
    fetchEnumData();
  }, [ruleCatalog]);

  const optionsAllRules =
    enumRuleData.length > 0
      ? enumRuleData.map((ruleData) => ({
          rule: ruleData.ruleName,
          label:
            ruleData.i18n?.[appData.language as keyof typeof ruleData.i18n] ??
            ruleData.descriptionUse,
        }))
      : [];

  return { optionsAllRules, enumRuleData, hasError };
};

export { useEnumAllRulesConfiguration };
