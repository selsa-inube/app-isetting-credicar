import { IEntry } from "@ptypes/design/table/IEntry";
import { formatDate } from "../date/formatDate";
import { dataTranslations } from "../dataTranslations";

const formatDetailsDecisions = (data: IEntry) => {
  console.log('formatDetailsDecisions: ', data);
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
            conditionGroups: decisionByRule?.conditionGroups ? decisionByRule?.conditionGroups.map(
              (conditionGroup: IEntry) => {
                return {
                  conditionGroupId: conditionGroup.conditionGroupId,
                  conditionsThatEstablishesTheDecision:
                    conditionGroup.conditionsThatEstablishesTheDecision?.map(
                      (condition: IEntry) => {
                        return {
                          labelName:
                          dataTranslations[condition.labelName] ??
                          condition.labelName ?? condition.conditionName,
                          conditionName: condition.conditionName,
                          value: condition.value,
                          conditionDataType: "Alphabetical",
                          howToSetTheCondition:
                            typeof condition.value === "string"
                              ? "EqualTo"
                              : "Range",
                        };
                      },
                    ),
                };
              },
            ): [],
            // conditionsThatEstablishesTheDecision:
            //   decisionByRule?.conditionsThatEstablishesTheDecision
            //     ? decisionByRule.conditionsThatEstablishesTheDecision.map(
            //         (condition: IEntry) => {
            //           return {
            //             conditionName: condition.conditionName,
            //             labelName:
            //               dataTranslations[condition.labelName] ??
            //               condition.labelName ?? condition.conditionName,
            //             value: condition.value,
            //             conditionDataType: "Alphabetical",
            //             howToSetTheCondition:
            //               typeof condition.value === "string"
            //                 ? "EqualTo"
            //                 : "Range",
            //           };
            //         },
            //       )
            //     : [],
          };
        })
    : [];
};

export { formatDetailsDecisions };
