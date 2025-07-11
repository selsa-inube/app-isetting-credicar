import { IEnumerators } from "@ptypes/IEnumerators";

const normalizeDestination = (enumData: IEnumerators[], code: string) =>
  enumData.find((element) => element.value === code);

export { normalizeDestination };
