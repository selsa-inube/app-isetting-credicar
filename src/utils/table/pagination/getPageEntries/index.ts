import { IEntry } from "@ptypes/design/table/IEntry";

const getPageEntries = (
  filteredEntries: IEntry[],
  firstEntryInPage: number,
  lastEntryInPage: number,
) => {
  return filteredEntries.slice(firstEntryInPage, lastEntryInPage);
};

export { getPageEntries };
