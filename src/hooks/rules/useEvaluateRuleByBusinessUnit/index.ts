import { useState, useEffect } from "react";
import { IRuleDecision } from "@isettingkit/input";

import { evaluateRuleByBusinessUnit } from "@services/conditionsRules/postEvaluateRuleByBusinessUnit";
import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";

const useEvaluateRuleByBusinessUnit = (
  businessUnits: string,
  rulesData: IEvaluateRuleRequest,
) => {
  const [evaluateRuleData, setEvaluateRuleData] = useState<
    IRuleDecision[] | undefined
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
