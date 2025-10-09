import { IEnumerators } from "@ptypes/IEnumerators";
import { ILanguage } from "@ptypes/i18n";

const optionsEnumCodeI18n = (
  language: ILanguage,
  enumData: IEnumerators[],
  valueSpanish = false,
) =>
  enumData.map((item) => {
    if (valueSpanish) {
      if (item.value === "undefined") {
        return {
          id: item.code,
          label: item.i18n?.[language] ?? item.description,
          value: item.code,
        };
      }

      return {
        id: item.code,
        label: item.i18n?.[language] ?? item.value,
        value: item.code,
      };
    } else {
      return {
        id: item.code,
        label: item.i18n?.[language] ?? item.value,
        value: item.code,
      };
    }
  });

export { optionsEnumCodeI18n };
