import { INavigationRule } from "@ptypes/creditLines/INavigationRule";

const filterNavConfiguration = <T extends { id: string; label: string }>(
  options: Record<string, T>,
  rules: INavigationRule[],
) => {
  const rulesMap = new Map(rules.map((item) => [item.rule, item.label]));

  const allowedIds = rules.map((item) => item.rule);

  return Object.fromEntries(
    Object.entries(options)
      .filter(([, value]) => allowedIds.includes(value.id))
      .map(([key, value]) => [
        key,
        {
          ...value,
          label:
            rulesMap.get(value.id) !== undefined ||
            rulesMap.get(value.id) !== ""
              ? rulesMap.get(value.id)
              : value.label,
        },
      ]),
  );
};

export { filterNavConfiguration };
