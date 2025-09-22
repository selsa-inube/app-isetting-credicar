import { useState } from "react";
import { dataTranslations } from "@utils/dataTranslations";
import { formatDate } from "@utils/date/formatDate";
import { IconWithText } from "@design/data/iconWithText";
import { normalizeIconDestination } from "@utils/destination/normalizeIconDestination";
import { IEntry } from "@ptypes/design/table/IEntry";

const useMoreDetailsRequestProgress = (data: IEntry) => {
  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);

  const onToggleMoreDetailsModal = () => {
    setShowMoreDetailsModal(!showMoreDetailsModal);
  };

  const moreDetailsData = {
    id: data.id,
    abbreviatedName: data.configurationRequestData.abbreviatedName && (
      <IconWithText
        withIconBefore
        icon={
          normalizeIconDestination(data.configurationRequestData.iconReference)
            ?.icon ?? <></>
        }
        text={String(data.configurationRequestData.abbreviatedName)}
      />
    ),
    descriptionUse:
      data.configurationRequestData.descriptionUse ??
      data.configurationRequestData.justification,
  };

  const decisions = data.configurationRequestData.rules
    ? data.configurationRequestData.rules.map((rule: IEntry, index: number) => {
        const decisionByRule = rule.decisionsByRule?.find(
          (decision: IEntry) => decision,
        );

        return {
          decisionId: `Decisión ${index + 1}`,
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
          dataEvaluated: ["MoneyDestination"],
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
                      howToSetTheCondition: "EqualTo",
                    };
                  },
                )
              : [],
        };
      })
    : [];

  const isMoreDetails =
    data.useCaseName === "DeleteMoneyDestination" ||
    data.useCaseName === "ModifyMoneyDestination";

  return {
    showMoreDetailsModal,
    moreDetailsData,
    decisions,
    isMoreDetails,
    onToggleMoreDetailsModal,
  };
};

export { useMoreDetailsRequestProgress };
