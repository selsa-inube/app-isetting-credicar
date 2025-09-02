import { IEntry } from "@ptypes/design/table/IEntry";

const columnsMapping: Record<number, string> = {
  1: "1fr",
  2: "1fr 1fr",
};

const columnsAttribute = (
  values: IEntry[] | string[],
  isMobile?: boolean,
): string => {
  if (isMobile) {
    return "1fr";
  }
  return (
    columnsMapping[values.length] ||
    `repeat(${Math.ceil(values.length / 2)}, 1fr)`
  );
};

export { columnsAttribute };
