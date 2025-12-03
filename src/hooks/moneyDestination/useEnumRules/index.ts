/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from "react";
import { IValue } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getEnumeratorsRules } from "@services/conditionsRules/getEnumeratorByRules";
import { getListPossibleValues } from "@services/enums/getListPossibleValues";
import { IUseEnumRules } from "@ptypes/hooks/IUseEnumRules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IDecisionData } from "@ptypes/decisions/IDecision";
import { IServerDomain } from "@ptypes/IServerDomain";

const useEnumRules = (props: IUseEnumRules) => {
  const { enumDestination, ruleCatalog, catalogAction, businessUnits } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [enumRuleData, setEnumRuleData] = useState<IDecisionData>(
    {} as IDecisionData,
  );
  const [ruleData, setRuleData] = useState<IRuleDecisionExtended>(
    {} as IRuleDecisionExtended,
  );
  const [hasError, setHasError] = useState(false);
  const [hasListError, setHasListError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      if (enumDestination.length === 0) {
        return;
      }
      try {
        const data = await getEnumeratorsRules(
          enumDestination,
          ruleCatalog,
          catalogAction,
          businessUnits,
        );
        setEnumRuleData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };
    fetchEnumData();
  }, [enumDestination, ruleCatalog, catalogAction, businessUnits]);

  const fetchListValues = async (pathListPossibleValues: string) => {
    try {
      if (
        pathListPossibleValues !== "undefined" &&
        pathListPossibleValues.length > 0
      ) {
        const data = await getListPossibleValues(
          businessUnits,
          pathListPossibleValues,
        );
        return data.map((item) => ({
          id: item.code,
          label:
            item.i18n?.[appData.language as keyof typeof item.i18n] ??
            item.description,
          value: item.code,
        }));
      }
      return [];
    } catch (error) {
      console.info(error);
      setHasListError(true);
      return [];
    }
  };

  useEffect(() => {
    const processEnumData = async () => {
      if (hasError || !enumRuleData || Object.keys(enumRuleData).length === 0) {
        return;
      }

      try {
        let rootListValues: IServerDomain[] = [];
        if (enumRuleData.listOfPossibleValues) {
          rootListValues = (await fetchListValues(
            enumRuleData.listOfPossibleValues as string,
          )) as IServerDomain[];
        }

        let processedConditions: any =
          enumRuleData.conditionsThatEstablishesTheDecision;
        if (Array.isArray(processedConditions)) {
          processedConditions = await Promise.all(
            processedConditions.map(async (condition: any) => {
              if (condition.listOfPossibleValues) {
                const dataCondition = await fetchListValues(
                  condition.listOfPossibleValues as string,
                );

                return {
                  ...condition,
                  listOfPossibleValues: { list: dataCondition as IValue[] },
                };
              }
              return condition;
            }),
          );
        }

        setRuleData({
          ...enumRuleData,
          listOfPossibleValues: { list: rootListValues as IValue },
          conditionsThatEstablishesTheDecision: processedConditions,
        } as IRuleDecisionExtended);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };

    processEnumData();
  }, [enumRuleData, hasError, businessUnits]);

  return { ruleData, hasError, hasListError };
};

export { useEnumRules };
