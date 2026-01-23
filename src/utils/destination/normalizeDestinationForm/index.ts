import { IEnumerators } from "@ptypes/IEnumerators";

const normalizeDestinationForm = (
  enumData: IEnumerators[],
  code: string,
  language: string,
) => {
  const values = enumData.find((element) => element.code === code);

  const valueName = values
    ? (values.i18nValue?.[language as keyof typeof values.i18nValue] ?? code)
    : code;

  return valueName;
};

export { normalizeDestinationForm };
