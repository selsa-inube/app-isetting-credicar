import { IEntry } from "@ptypes/design/table/IEntry";

const getNextId = (arr: IEntry[]) => {
  if (!Array.isArray(arr) || arr.length === 0) return 1;
  return Math.max(...arr.map((e) => Number(e.id) || 0)) + 1;
};

export { getNextId };
