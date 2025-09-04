import { IEntry } from "@ptypes/design/table/IEntry";

const rowsAttribute = (
  values: IEntry[] | string[],
  isMobile?: boolean,
): string => {
  if (!isMobile) {
    if (values.length <= 2) {
      return "1fr";
    }
  }
  if (isMobile) {
    return `repeat(${Math.ceil(values.length)}, 1fr)`;
  }
  return `repeat(${Math.ceil(values.length / 2)}, 1fr)`;
};

export { rowsAttribute };
