import { IEnumerators } from "@ptypes/IEnumerators";
import { IServerDomain } from "@ptypes/IServerDomain";

const optionsFromEnumsSpanish = (options: IEnumerators[]): IServerDomain[] =>
  options.map((item) => {
    return {
      id: item.code,
      label: item.description ?? "",
      value: item.code,
    };
  });

export { optionsFromEnumsSpanish };
