import { useState, useEffect } from "react";

import { evaluateRuleByBusinessUnit } from "@services/conditionsRules/postEvaluateRuleByBusinessUnit";
import { IUseEvaluateRuleByUnit } from "@ptypes/hooks/IUseEvaluateRuleByUnit";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const useEvaluateRuleByBusinessUnit = (props: IUseEvaluateRuleByUnit) => {
  const { businessUnits, rulesData } = props;
  const [evaluateRuleData, setEvaluateRuleData] = useState<
    IRuleDecisionExtended[] | undefined
  >([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState<boolean>();

  useEffect(() => {
    const fetchEvaluateRule = async () => {
      setLoading(true);
      try {
        const data = await evaluateRuleByBusinessUnit(businessUnits, rulesData);

        setEvaluateRuleData(data);
        setHasError(false);
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluateRule();
  }, []);

  return { evaluateRuleData, loading, hasError };
};

export { useEvaluateRuleByBusinessUnit };
