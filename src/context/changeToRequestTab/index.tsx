import { useState, useMemo } from "react";
import { IChangeToRequestTabProvider } from "@ptypes/context/IChangeToRequestTabProvider";
import { ChangeToRequestTab } from "./changeToRequest";

const ChangeToRequestTabProvider = (props: IChangeToRequestTabProvider) => {
  const { children } = props;
  const [changeTab, setChangeTab] = useState<boolean>(false);
  const [maxWidthPage, setMaxWidthPage] = useState<string>("1064px");

  const changeToRequestContainer = useMemo(
    () => ({
      changeTab,
      maxWidthPage,
      setChangeTab,
      setMaxWidthPage,
    }),
    [changeTab, maxWidthPage, setChangeTab, setMaxWidthPage],
  );

  return (
    <ChangeToRequestTab.Provider value={changeToRequestContainer}>
      {children}
    </ChangeToRequestTab.Provider>
  );
};

export { ChangeToRequestTabProvider };
