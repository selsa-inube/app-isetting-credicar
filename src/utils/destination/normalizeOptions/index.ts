import { IServerDomain } from "@ptypes/IServerDomain";

const normalizeOptions = (options: IServerDomain[], value: string) =>
  options.find((element) => element.value === value);

export { normalizeOptions };
