import { useEffect, useState } from "react";
import { getConfiguredDecisionsByValue } from "@services/conditionsRules/getConfiguredDecisionsByValue";
import { EUseCase } from "@enum/useCase";
import { errorObject } from "@utils/errorObject";
import { rulesExcludedByEvaluate } from "@config/creditLines/configuration/rulesExcludedByEvaluate";
import { IUseGetDecisionsByValue } from "@ptypes/hooks/creditLines/IUseGetDecisionsByValue";
import { IErrors } from "@ptypes/IErrors";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";

const useGetDecisionsByValue = (props: IUseGetDecisionsByValue) => {
  const {
    ruleName,
    decisionValue,
    conditionName,
    businessUnit,
    useCase,
    token,
  } = props;
  const [configuredDecisions, setConfiguredDecisions] = useState<
    IConfiguredDecisions[] | undefined
  >([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);

  useEffect(() => {
    const fetchData = async () => {
      const validateRule = rulesExcludedByEvaluate.includes(ruleName);
      const validate =
        (!useCase ||
          useCase === EUseCase.EDIT ||
          useCase === EUseCase.DETAILS_CONDITIONAL) &&
        validateRule;

      if (validate) {
        setLoading(true);
        try {
          const data = await getConfiguredDecisionsByValue(
            ruleName,
            decisionValue,
            conditionName,
            businessUnit,
            token,
          );
          setConfiguredDecisions(data);
        } catch (error) {
          console.info(error);
          setHasError(true);
          setErrorData(errorObject(error));
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [useCase]);

  return {
    configuredDecisions,
    hasError,
    loading,
    errorData,
  };
};

export { useGetDecisionsByValue };
