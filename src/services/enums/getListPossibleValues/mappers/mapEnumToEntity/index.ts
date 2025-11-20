import { IEnumerators } from "@ptypes/IEnumerators";

const mapEnumToEntity = (enumData: IEnumerators): IEnumerators => {
  const entry: IEnumerators = {
    code: String(enumData.code),
    description: String(enumData.description),
    value: String(enumData.code),
    i18n: enumData.i18n ? Object(enumData.i18n) : undefined,
  };
  return entry;
};

export { mapEnumToEntity };
