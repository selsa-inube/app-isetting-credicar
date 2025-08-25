import { nameDestination } from "@config/destination/nameDestination";

const normalizeCodeDestination = (code: string) =>
  nameDestination.find((element) => element.code === code);

export { normalizeCodeDestination };
