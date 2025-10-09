import { ValueDataType } from "@isettingkit/input";
import { dataTranslations } from "@utils/dataTranslations";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const decisionScoreModelsConfig = (
  {
    ruleName,
    descriptionUse,
    howToSetTheDecision,
    decisionDataType,
    conditionsThatEstablishesTheDecision,
    listOfPossibleValues,
    i18n,
  }: IRuleDecisionExtended,
  language: string,
  nameRule?: string,
  businessUnit?: string,
) => {
  if (!descriptionUse || !decisionDataType || !conditionsThatEstablishesTheDecision) {
    return;
  }

  const decisionDataKey = String(decisionDataType).toUpperCase();
  const decisionDataEnum =
    (decisionDataKey in ValueDataType
      ? (ValueDataType as any)[decisionDataKey]
      : ValueDataType.ALPHABETICAL);

  const pickTopLabel = () => {
    const cand = (i18n as any)?.[language];
    if (typeof cand === "string" && cand.trim()) return cand;
    return "Modelo de score";
  };

  const pickLabel = (c: any) => {
    const cand = c?.i18n?.[language];
    if (typeof cand === "string" && cand.trim()) return cand;
    if (typeof c?.descriptionUse === "string" && c.descriptionUse.trim()) return c.descriptionUse;
    return c?.conditionName ?? "";
  };

  const decisionTemplate = {
    ruleName,
    labelName: String(pickTopLabel()),
    descriptionUse: String(pickTopLabel()),
    decisionDataType: decisionDataEnum,
    howToSetTheDecision,
    value: nameRule ?? "",
    effectiveFrom: "",
    validUntil: "",
    listOfPossibleValues,
    conditionGroups: [
      {
        ConditionGroupId: "group-primary",
        conditionsThatEstablishesTheDecision: conditionsThatEstablishesTheDecision.map(
          (condition) => ({
            conditionName:
              dataTranslations[condition.conditionName] ?? condition.conditionName,
            labelName: String(pickLabel(condition)),
            descriptionUse: String(pickLabel(condition)),
            conditionDataType: condition.conditionDataType,
            howToSetTheCondition: condition.howToSetTheCondition,
            value:
              condition.conditionName === "BusinessUnit"
                ? (businessUnit ?? "")
                : (condition.value ?? ""),
            listOfPossibleValues: condition.listOfPossibleValues,
            hidden: condition.conditionName === "BusinessUnit",
            i18n: (condition as any).i18n ?? undefined,
          }),
        ),
      },
    ],
  };

  return decisionTemplate;
};

export { decisionScoreModelsConfig };
