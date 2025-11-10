import { useState, useEffect, useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getEnumeratorAllRules } from "@services/conditionsRules/getEnumeratorAllRules";
import { ECreditLines } from "@enum/creditLines";
import { rules } from "@config/creditLines/configuration/rules";
import { IUseEnumAllRules } from "@ptypes/hooks/IUseEnumAllRules";
import { IDecisionData } from "@ptypes/decisions/IDecision";

const useEnumAllRulesConfiguration = (props: IUseEnumAllRules) => {
  const { optionsContext, ruleCatalog, catalogAction } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [enumRuleData, setEnumRuleData] = useState<IDecisionData[]>([]);

  const { appData } = useContext(AuthAndPortalData);
  const [hasError, setHasError] = useState(false);

  const rulesData = rules.join(",");

  useEffect(() => {
    const fetchEnumData = async () => {
      if (optionsContext.length === 0) {
        setLoading(true);
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
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEnumData();
  }, [ruleCatalog, optionsContext]);

  const optionsAllRules =
    enumRuleData.length > 0
      ? enumRuleData.map((ruleData) => ({
          rule: ruleData.ruleName,
          label:
            ruleData.ruleName === ECreditLines.CREDIT_LINE_RULE
              ? ECreditLines.CREDIT_LINE_STEP
              : (ruleData.i18n?.[
                  appData.language as keyof typeof ruleData.i18n
                ] ?? ruleData.descriptionUse),
        }))
      : [];

  return { optionsAllRules, enumRuleData, loading, hasError, setHasError };
};

export { useEnumAllRulesConfiguration };
