import { IEnumerators } from "@ptypes/IEnumerators";
import { IValue } from "@ptypes/decisions/IValue";

const normalizeValueCondition = (
  enumValues: IEnumerators[],
  language: string,
  label: string | number | string[] | IValue | undefined,
) => {
  return enumValues.find((value) => {
    if (value.i18n) {
      return value.i18n[language as keyof typeof value.i18n] === label;
    } else {
      return value.description === label;
    }
    return undefined;
  });
};

export { normalizeValueCondition };
