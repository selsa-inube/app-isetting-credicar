import { useState, useEffect } from "react";

import { evaluateRuleByBusinessUnit } from "@services/conditionsRules/postEvaluateRuleByBusinessUnit";
import { errorObject } from "@utils/errorObject";
import { IUseEvaluateRuleByUnit } from "@ptypes/hooks/IUseEvaluateRuleByUnit";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IErrors } from "@ptypes/IErrors";

const useEvaluateRuleByBusinessUnit = (props: IUseEvaluateRuleByUnit) => {
  const { businessUnits, rulesData } = props;
  const [evaluateRuleData, setEvaluateRuleData] = useState<
    IRuleDecisionExtended[] | undefined
  >([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState<boolean>();
  const [descriptionError, setDescriptionError] = useState<IErrors>(
    {} as IErrors,
  );

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
        setDescriptionError(errorObject(error));
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluateRule();
  }, []);

  return { evaluateRuleData, loading, hasError, setHasError, descriptionError };
};

export { useEvaluateRuleByBusinessUnit };
