import { IEnumerators } from "@ptypes/IEnumerators";

const mapEnumToEntity = (enumData: IEnumerators): IEnumerators => {
  const business: IEnumerators = {
    code: String(enumData.code),
    description: String(enumData.description),
    value: String(enumData.value),
    i18n: Object(enumData.i18n),
    index: Number(enumData.index),
  };
  return business;
};

export { mapEnumToEntity };
