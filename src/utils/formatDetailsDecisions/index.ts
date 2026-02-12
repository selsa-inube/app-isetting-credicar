import { IEntry } from "@ptypes/design/table/IEntry";
import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { formatDate } from "../date/formatDate";
import { dataTranslations } from "../dataTranslations";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";
import { normalizeConditionTraduction } from "../normalizeConditionTraduction";
import { formatValueObjectfCondition } from "../formatValueObjectfCondition";

const formatDetailsDecisions = (
  data: IEntry,
  conditionsArray?: IConditionTraduction[],
) => {
  return data.configurationRequestData.rules
    ? data.configurationRequestData.rules
        .filter((rule: IEntry) => rule)
        .map((rule: IEntry) => {
          const decisionByRule = rule.decisionsByRule?.find(
            (decision: IEntry) => decision,
          );

          return {
            labelName: dataTranslations[rule.ruleName] ?? rule.ruleName,
            ruleName: rule.ruleName,
            value: formatValueObjectfCondition(decisionByRule?.value),
            effectiveFrom: decisionByRule?.effectiveFrom
              ? formatDate(new Date(decisionByRule.effectiveFrom))
              : undefined,
            validUntil: decisionByRule?.validUntil
              ? formatDate(new Date(decisionByRule.validUntil))
              : undefined,
            transactionOperation: decisionByRule?.transactionOperation,
            conditionGroups: decisionByRule.conditionGroups
              ? decisionByRule.conditionGroups.map(
                  (decisionGroup: IConditionGroups) => ({
                    ...decisionGroup,
                    conditionGroupId: decisionGroup.conditionGroupId,
                    transactionOperation: decisionGroup.transactionOperation,
                    conditionsThatEstablishesTheDecision:
                      decisionGroup.conditionsThatEstablishesTheDecision
                        ? decisionGroup.conditionsThatEstablishesTheDecision.map(
                            (condition: IConditionsTheDecision) => ({
                              ...condition,
                              value: formatValueObjectfCondition(
                                condition.value,
                              ),
                              conditionName: condition.conditionName,
                              labelName: conditionsArray
                                ? normalizeConditionTraduction(
                                    conditionsArray,
                                    condition.conditionName,
                                  )?.label
                                : condition.conditionName,
                              conditionDataType: "Alphabetical",
                              howToSetTheCondition: "EqualTo",
                              transactionOperation:
                                condition.transactionOperation,
                            }),
                          )
                        : undefined,
                  }),
                )
              : undefined,
          };
        })
    : [];
};

export { formatDetailsDecisions };
