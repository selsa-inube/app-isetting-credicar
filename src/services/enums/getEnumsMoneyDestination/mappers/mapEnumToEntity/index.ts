import { IEnumerators } from "@ptypes/IEnumerators";

const mapEnumToEntity = (enumData: IEnumerators): IEnumerators => {
  const data: IEnumerators = {
    code: String(enumData.code),
    description: String(enumData.description),
    value: String(enumData.code),
    type: String(enumData.value),
    i18nValue: Object(enumData.i18nValue),
    i18nDescription: Object(enumData.i18nDescription),
    moneyDestinationType: String(enumData.moneyDestinationType),
  };
  return data;
};

export { mapEnumToEntity };
