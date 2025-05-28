import { ITitle } from "@ptypes/design/table/ITitle";
import { IBreakpoint } from "@ptypes/design/table/IBreakpoint";

const totalTitleColumns = (
  titles: ITitle[],
  breakpoints: IBreakpoint[],
  findCurrentMedia: number,
) => {
  const current = findCurrentMedia;
  const numColumns = breakpoints[current].totalColumns;

  if (numColumns >= titles.length) return titles;

  return titles.filter((title) => title.priority <= numColumns - 1);
};

export { totalTitleColumns };
