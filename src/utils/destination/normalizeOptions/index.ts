import { IServerDomain } from "@ptypes/IServerDomain";

const normalizeOptions = (options: IServerDomain[], value: string) =>
  options.find((element) => element.id === value);

export { normalizeOptions };
