import { useContext } from "react";

import { useMoneyDestination } from "@hooks/moneyDestination/useMoneyDestination";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { IEntry } from "@ptypes/design/table/IEntry";
import { MoneyDestinationTabUI } from "./interface";

function MoneyDestinationTab() {
  const { appData } = useContext(AuthAndPortalData);

  const {
    moneyDestination,
    searchMoneyDestination,
    loading,
    smallScreen,
    columnWidths,
    handleSearchMoneyDestination,
    setEntryDeleted,
  } = useMoneyDestination({ bussinesUnits: appData.businessUnit.publicCode });

  return (
    <MoneyDestinationTabUI
      onSearchMoneyDestination={handleSearchMoneyDestination}
      searchMoneyDestination={searchMoneyDestination}
      loading={loading}
      entries={moneyDestination as IEntry[]}
      setEntryDeleted={setEntryDeleted}
      smallScreen={smallScreen}
      columnWidths={columnWidths}
    />
  );
}

export { MoneyDestinationTab };
