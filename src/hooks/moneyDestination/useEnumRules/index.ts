import { useState, useEffect } from "react";

import { getEnumeratorsRules } from "@services/conditionsRules/getEnumeratorByRules";
import { getListPossibleValues } from "@services/enums/getListPossibleValues";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { IUseEnumRules } from "@ptypes/hooks/IUseEnumRules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IDecisionData } from "@ptypes/decisions/IDecision";
import { IValue } from "@ptypes/decisions/IValue";

const useEnumRules = (props: IUseEnumRules) => {
  const { enumDestination, ruleCatalog, catalogAction, businessUnits } = props;
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
        return data.map((val) => val.value);
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
        let rootListValues: string[] = [];
        if (enumRuleData.listOfPossibleValues) {
          rootListValues = (await fetchListValues(
            enumRuleData.listOfPossibleValues as string,
          )) as string[];
        }

        let processedConditions =
          enumRuleData.conditionsThatEstablishesTheDecision;
        if (Array.isArray(processedConditions)) {
          processedConditions = await Promise.all(
            processedConditions.map(async (condition) => {
              if (condition.listOfPossibleValues) {
                const conditionListValues = (await fetchListValues(
                  condition.listOfPossibleValues as string,
                )) as string[];
                return {
                  ...condition,
                  /////////////QUITAR//////////////////////////
                  howToSetTheCondition: EGeneralPolicies.LIST_OF_VALUES,
                  /////////////////////////////////////
                  listOfPossibleValues: conditionListValues as IValue,
                };
              }
              return condition;
            }),
          );
        }

        setRuleData({
          ...enumRuleData,
          listOfPossibleValues: rootListValues,

          conditionsThatEstablishesTheDecision: processedConditions,
        } as IRuleDecisionExtended);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };

    processEnumData();
  }, [enumRuleData, hasError, businessUnits]);

  console.log("🦄", { ruleData });

  return { ruleData, hasError, hasListError };
};

export { useEnumRules };
