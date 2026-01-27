import { useState, useEffect, useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getEnumeratorAllRules } from "@services/conditionsRules/getEnumeratorAllRules";
import { ECreditLines } from "@enum/creditLines";
import { IUseEnumAllRules } from "@ptypes/hooks/IUseEnumAllRules";
import { IDecisionData } from "@ptypes/decisions/IDecision";

const useEnumAllRulesConfiguration = (props: IUseEnumAllRules) => {
  const { ruleCatalog, catalogAction, validRules } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [enumRuleData, setEnumRuleData] = useState<IDecisionData[]>([]);

  const { appData } = useContext(AuthAndPortalData);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      setLoading(true);
      try {
        const rulesData = validRules.join(",");
        const data = await getEnumeratorAllRules(
          rulesData,
          ruleCatalog,
          catalogAction,
          appData.businessUnit.publicCode,
          appData.token,
        );
        setEnumRuleData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEnumData();
  }, [ruleCatalog, validRules]);

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
