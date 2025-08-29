import { IEnumerators } from "@ptypes/IEnumerators";
import { ILanguage } from "@ptypes/i18n";

const optionsFromEnumI18n = (
  language: ILanguage,
  enumData: IEnumerators[],
  valueSpanish = false,
) =>
  enumData.map((item) => {
    if (valueSpanish) {
      return {
        id: item.code,
        label: item.i18n?.[language] ?? item.value,
        value: item.i18n?.[language] ?? item.value,
      };
    } else {
      return {
        id: item.code,
        label: item.i18n?.[language] ?? item.value,
        value: item.code,
      };
    }
  });

export { optionsFromEnumI18n };
