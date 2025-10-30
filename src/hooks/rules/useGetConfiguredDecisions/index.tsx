import { useEffect, useState } from "react";
import { postGetConfiguredDecisions } from "@services/conditionsRules/postGetConfiguredDecisions";
import { EUseCase } from "@enum/useCase";
import { errorObject } from "@utils/errorObject";
import { rulesExcludedByEvaluate } from "@config/creditLines/configuration/rulesExcludedByEvaluate";
import { IUseGetConfiguredDecisions } from "@ptypes/hooks/IUseGetConfiguredDecisions";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";
import { IErrors } from "@ptypes/IErrors";

const useGetConfiguredDecisions = (props: IUseGetConfiguredDecisions) => {
  const { businessUnits, ruleData, useCase, rule } = props;
  const [configuredDecisions, setConfiguredDecisions] = useState<
    IConfiguredDecisions[] | undefined
  >([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);

  useEffect(() => {
    const fetchData = async () => {
      if (!rule) return;

      const validateRule = rulesExcludedByEvaluate.includes(rule);
      const validate =
        (!useCase ||
          useCase === EUseCase.EDIT ||
          useCase === EUseCase.DETAILS_CONDITIONAL) &&
        !validateRule;

      if (validate) {
        setLoading(true);

        try {
          const data = await postGetConfiguredDecisions(
            businessUnits,
            ruleData,
          );
          setConfiguredDecisions(data);
        } catch (error) {
          console.info(error);
          setHasError(true);
          setErrorData(errorObject(error));
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1200);
        }
      }
    };

    fetchData();
  }, [rule, useCase]);

  return {
    configuredDecisions,
    hasError,
    loading,
    errorData,
  };
};

export { useGetConfiguredDecisions };
