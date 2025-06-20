import { useMemo } from "react";
import { IBreakpoint } from "@ptypes/design/table/IBreakpoint";

const getQueriesArray = (breakpoints: IBreakpoint[]) =>
  useMemo(
    () => breakpoints?.map((breakpoint) => breakpoint.breakpoint),
    [breakpoints],
  );

export { getQueriesArray };
