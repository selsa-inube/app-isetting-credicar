import { IEnumerators } from "@ptypes/IEnumerators";

const normalizeDestination = (enumData: IEnumerators[], code: string) =>
  enumData.find((element) => element.code === code);

export { normalizeDestination };
