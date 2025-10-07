import { useEffect, useState } from "react";
import { postGetConfiguredDecisions } from "@services/conditionsRules/postGetConfiguredDecisions";
import { IGetConfiguredDecisions } from "@ptypes/decisions/IGetConfiguredDecisions";
import { IUseGetConfiguredDecisions } from "@ptypes/hooks/IUseGetConfiguredDecisions";
import { EUseCase } from "@src/enum/useCase";

const useGetConfiguredDecisions = (props: IUseGetConfiguredDecisions) => {
  const { businessUnits, ruleData, useCase, rule } = props;
  const [configuredDecisions, setConfiguredDecisions] = useState<
    IGetConfiguredDecisions[] | undefined
  >([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

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
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  return {
    configuredDecisions,
    hasError,
    loading,
  };
};

export { useGetConfiguredDecisions };
