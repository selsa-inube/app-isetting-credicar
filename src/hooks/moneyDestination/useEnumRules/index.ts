import { useState, useEffect } from "react";
import { IRuleDecision } from "@isettingkit/input";

import { getEnumeratorsRules } from "@services/conditionsRules/getEnumeratorsRules";
import { getConditionsOrDecisionName } from "@services/conditionsRules/getConditionsOrDecisionName";
import { EConditionRules } from "@enum/conditionRules";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { IDecisionData } from "@ptypes/decisions/IDecision";
import { IUseEnumRules } from "@ptypes/hooks/IUseEnumRules";

const useEnumRules = (props: IUseEnumRules) => {
  const { enumDestination, ruleCatalog, catalogAction, businessUnits } = props;
  const [enumRuleData, setEnumRuleData] = useState<IDecisionData>(
    {} as IDecisionData,
  );
  const [ruleData, setRuleData] = useState<IRuleDecision>({} as IRuleDecision);
  const [listValuesDecision, setListValuesDecision] =
    useState<{ value: string }[]>();
  const [listValuesCondition, setListValuesCondition] =
    useState<Record<string, { value: string }[]>>();
  const [hasError, setHasError] = useState(false);
  const [hasFetchedListValuesDecision, setHasFetchedListValuesDecision] =
    useState(false);
  const [hasFetchedListValuesCondition, setHasFetchedListValuesCondition] =
    useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
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
  }, [enumDestination, ruleCatalog, businessUnits]);

  useEffect(() => {
    setRuleData({ ...enumRuleData } as IRuleDecision);
  }, [enumRuleData]);

  const fetchListValuesDecision = async (conditionOrDecisionName: string) => {
    try {
      const data = await getConditionsOrDecisionName(
        businessUnits,
        conditionOrDecisionName,
      );
      setListValuesDecision(data.possibleValues);
      return data.possibleValues.map((obj: { value: string }) => obj.value);
    } catch (error) {
      console.info(error);
      setHasError(true);
      return [];
    }
  };

  const fetchListValuesCondition = async (
    conditionName: string,
    conditionOrDecisionName: string,
  ) => {
    try {
      const data = await getConditionsOrDecisionName(
        businessUnits,
        conditionOrDecisionName,
      );
      setListValuesCondition({ [conditionName]: data.possibleValues });
      return data.possibleValues.map((obj: { value: string }) => obj.value);
    } catch (error) {
      console.info(error);
      setHasError(true);
      return [];
    }
  };

  useEffect(() => {
    if (
      ruleData.listOfPossibleValues &&
      !hasFetchedListValuesDecision &&
      enumRuleData.listOfPossibleValues
    ) {
      fetchListValuesDecision(enumRuleData.listOfPossibleValues as string);
      setHasFetchedListValuesDecision(true);
    }
  }, [ruleData.listOfPossibleValues, hasFetchedListValuesDecision]);

  useEffect(() => {
    const conditions = ruleData.conditionsThatEstablishesTheDecision;
    if (Array.isArray(conditions)) {
      conditions.forEach((condition) => {
        if (condition.listOfPossibleValues) {
          if (
            condition.listOfPossibleValues &&
            !hasFetchedListValuesCondition
          ) {
            fetchListValuesCondition(
              condition.conditionName,
              condition.listOfPossibleValues as string,
            );
            setHasFetchedListValuesCondition(true);
          }
        }
      });
    }
  }, [ruleData.conditionsThatEstablishesTheDecision]);

  useEffect(() => {
    if (listValuesDecision) {
      const arrayListValues = listValuesDecision.map((list) => list.value);

      setRuleData((prevRuleData) => ({
        ...prevRuleData,
        howToSetTheDecision: EConditionRules.LIST_OF_VALUES,
        listOfPossibleValues: { list: arrayListValues },
        value: "",
      }));
    }

    if (listValuesCondition) {
      const arrayListValues = Object.values(listValuesCondition)
        .flat()
        .map((list) => list.value);

      setRuleData((prevRuleData) => ({
        ...prevRuleData,
        conditionThatEstablishesTheDecision:
          prevRuleData.conditionsThatEstablishesTheDecision?.map(
            (condition) => {
              if (condition.listOfPossibleValues) {
                return {
                  ...condition,
                  howToSetTheCondition: EGeneralPolicies.LIST_OF_VALUES,
                  listOfPossibleValues: { list: arrayListValues },
                  value: "",
                };
              }
              return condition;
            },
          ),
      }));
    }
  }, [listValuesDecision, listValuesCondition]);

  return { ruleData, hasError };
};

export { useEnumRules };
