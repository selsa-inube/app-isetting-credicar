import { IValue } from "@ptypes/decisions/IValue";

const geti18nValueDecision = (
  value: string | number | string[] | IValue | undefined,
  listValues: { id: string; label: string; value: string }[],
) => {
  if (listValues && listValues.length > 0) {
    return listValues.find((item) => {
      return item.id === value;
    })?.label;
  } else {
    return value;
  }
};

export { geti18nValueDecision };
