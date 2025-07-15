import { IEnumerators } from "@ptypes/IEnumerators";

const normalizeEditDestination = (enumData: IEnumerators[], value: string) =>
  enumData.find((element) => element.type === value);

export { normalizeEditDestination };
