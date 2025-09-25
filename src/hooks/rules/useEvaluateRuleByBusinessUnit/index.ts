import { useState, useEffect } from "react";
import { IRuleDecision } from "@isettingkit/input";

import { evaluateRuleByBusinessUnit } from "@services/conditionsRules/postEvaluateRuleByBusinessUnit";
import { IUseEvaluateRuleByUnit } from "@ptypes/hooks/IUseEvaluateRuleByUnit";

const useEvaluateRuleByBusinessUnit = (props: IUseEvaluateRuleByUnit) => {
  const { businessUnits, rulesData, language } = props;
  const [evaluateRuleData, setEvaluateRuleData] = useState<
    IRuleDecision[] | undefined
  >([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState<boolean>();

  useEffect(() => {
    const fetchEvaluateRule = async () => {
      setLoading(true);
      try {
        const data = await evaluateRuleByBusinessUnit(
          businessUnits,
          rulesData,
          language,
        );

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
