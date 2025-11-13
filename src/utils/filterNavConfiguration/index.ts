import { INavigationRule } from "@ptypes/creditLines/INavigationRule";

const filterNavConfiguration = (
  options: { id: string; label: string; number: number; path: string }[],
  rules: INavigationRule[],
) => {
  const rulesMap = new Map(rules.map((item) => [item.rule, item.label]));
  const allowedIds = rules.map((item) => item.rule);

  return options
    .filter((value) => allowedIds.includes(value.id))
    .map((item) => {
      const mappedLabel = rulesMap.get(item.id);
      const finalLabel =
        mappedLabel !== undefined && mappedLabel !== ""
          ? mappedLabel
          : item.label;
      return {
        ...item,
        label: finalLabel,
      };
    });
};

export { filterNavConfiguration };
