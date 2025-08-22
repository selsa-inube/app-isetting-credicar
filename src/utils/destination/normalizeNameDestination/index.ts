import { nameDestination } from "@config/destination/nameDestination";

const normalizeNameDestination = (name: string) =>
  nameDestination.find((element) => element.code === name);

export { normalizeNameDestination };
