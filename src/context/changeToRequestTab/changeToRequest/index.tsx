import { createContext } from "react";
import { IChangeToRequestTab } from "@ptypes/context/IChangeToRequestTab";

const ChangeToRequestTab = createContext<IChangeToRequestTab>(
  {} as IChangeToRequestTab,
);

export { ChangeToRequestTab };
