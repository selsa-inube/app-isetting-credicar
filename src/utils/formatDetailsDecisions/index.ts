import { IEntry } from "@ptypes/design/table/IEntry";
import { formatDate } from "../date/formatDate";
import { dataTranslations } from "../dataTranslations";

const formatDetailsDecisions = (data: IEntry) => {
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
            value: decisionByRule?.value,
            effectiveFrom: decisionByRule?.effectiveFrom
              ? formatDate(new Date(decisionByRule.effectiveFrom))
              : undefined,
            validUntil: decisionByRule?.validUntil
              ? formatDate(new Date(decisionByRule.validUntil))
              : undefined,
            transactionOperation: decisionByRule?.transactionOperation,
            conditionsThatEstablishesTheDecision:
              decisionByRule?.conditionsThatEstablishesTheDecision
                ? decisionByRule.conditionsThatEstablishesTheDecision.map(
                    (condition: IEntry) => {
                      return {
                        conditionName: condition.conditionName,
                        labelName:
                          dataTranslations[condition.labelName] ??
                          condition.labelName,
                        value: condition.value,
                        conditionDataType: "Alphabetical",
                        howToSetTheCondition:
                          typeof condition.value === "string"
                            ? "EqualTo"
                            : "Range",
                      };
                    },
                  )
                : [],
          };
        })
    : [];
};

export { formatDetailsDecisions };
