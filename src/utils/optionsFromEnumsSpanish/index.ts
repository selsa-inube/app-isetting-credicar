import { IEnumerators } from "@ptypes/IEnumerators";
import { IServerDomain } from "@ptypes/IServerDomain";

const optionsFromEnumsSpanish = (
  options: IEnumerators[],
  language: string,
): IServerDomain[] =>
  options.map((item) => {
    return {
      id: item.code,
      label:
        item.i18n?.[language as keyof typeof item.i18n] ??
        item.description ??
        "",
      value: item.code,
    };
  });

export { optionsFromEnumsSpanish };
