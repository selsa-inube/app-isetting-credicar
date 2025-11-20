import { useState, useEffect, useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getEnumeratorsRules } from "@services/conditionsRules/getEnumeratorByRules";
import { getListPossibleValues } from "@services/enums/getListPossibleValues";
import { IUseEnumRules } from "@ptypes/hooks/IUseEnumRules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IDecisionData } from "@ptypes/decisions/IDecision";
import { IValue } from "@ptypes/decisions/IValue";
import { IEnumerators } from "@ptypes/IEnumerators";

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
        return data;
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
        let dataDecision: IEnumerators[] = [];
        let rootListValues: string[] = [];
        if (enumRuleData.listOfPossibleValues) {
          dataDecision = (await fetchListValues(
            enumRuleData.listOfPossibleValues as string,
          )) as IEnumerators[];
          rootListValues = dataDecision.map(
            (val) =>
              val.i18n?.[appData.language as keyof typeof val.i18n] ??
              val.description,
          ) as string[];
        }

        let processedConditions =
          enumRuleData.conditionsThatEstablishesTheDecision;
        if (Array.isArray(processedConditions)) {
          processedConditions = await Promise.all(
            processedConditions.map(async (condition) => {
              if (condition.listOfPossibleValues) {
                const dataCondition = (await fetchListValues(
                  condition.listOfPossibleValues as string,
                )) as IEnumerators[];
                const conditionListValues = dataCondition.map(
                  (val) =>
                    val.i18n?.[appData.language as keyof typeof val.i18n] ??
                    val.description,
                );
                return {
                  ...condition,
                  listOfPossibleValues: conditionListValues as IValue,
                  enumValues: dataCondition,
                };
              }
              return condition;
            }),
          );
        }

        setRuleData({
          ...enumRuleData,
          listOfPossibleValues: rootListValues,
          enumValues: dataDecision,
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
