import { IEntry } from "@ptypes/design/table/IEntry";
import { ITitle } from "@ptypes/design/table/ITitle";

const filterEntries = (entries: IEntry[], filter: string, titles: ITitle[]) => {
  const filterText = filter.toLowerCase();
  const titleIds = titles.map((title) => title.id.toLowerCase());

  return entries.filter((entry) => {
    for (const key in entry) {
      const value = entry[key]?.toString()?.toLowerCase();
      const text = entry[key]?.props?.text?.toString()?.toLowerCase();

      if (
        titleIds.includes(key.toLowerCase()) &&
        (value?.includes(filterText) || text?.includes(filterText))
      ) {
        return true;
      }
    }
    return false;
  });
};
export { filterEntries };
