import { IValue } from "@ptypes/decisions/IValue";

const geti18nValueDecision = (
  value: string | number | string[] | IValue | undefined,
  listValues: { id: string; label: string; value: string }[],
) => {
  if (listValues && listValues.length > 0) {
    const foundValue = listValues.find((item) => item.id === value);
    return foundValue?.label || value;
  }
};

export { geti18nValueDecision };
