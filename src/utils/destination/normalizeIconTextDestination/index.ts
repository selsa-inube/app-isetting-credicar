import { iconDestination } from "@config/destination/iconDestination";

const normalizeIconTextDestination = (icon?: React.ReactNode) =>
  iconDestination.find((element) => element.icon === icon);

export { normalizeIconTextDestination };
