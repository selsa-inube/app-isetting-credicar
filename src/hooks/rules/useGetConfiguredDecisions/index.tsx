import { useEffect, useState } from "react";
import { postGetConfiguredDecisions } from "@services/conditionsRules/postGetConfiguredDecisions";
import { EUseCase } from "@enum/useCase";
import { IUseGetConfiguredDecisions } from "@ptypes/hooks/IUseGetConfiguredDecisions";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";
import { errorObject } from "@src/utils/errorObject";
import { IErrors } from "@src/types/IErrors";

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
      if (!useCase || useCase === EUseCase.EDIT) {
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
          setLoading(false);
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
