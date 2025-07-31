import { useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useMoneyDestination } from "@hooks/moneyDestination/useMoneyDestination";
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
    emptyDataMessage,
    disabledButton,
    showInfoModal,
    handleToggleInfoModal,
    handleSearchMoneyDestination,
    setEntryDeleted,
  } = useMoneyDestination({ businessUnits: appData.businessUnit.publicCode });

  return (
    <MoneyDestinationTabUI
      onSearchMoneyDestination={handleSearchMoneyDestination}
      searchMoneyDestination={searchMoneyDestination}
      loading={loading}
      entries={moneyDestination as IEntry[]}
      setEntryDeleted={setEntryDeleted}
      smallScreen={smallScreen}
      columnWidths={columnWidths}
      emptyDataMessage={emptyDataMessage}
      showInfoModal={showInfoModal}
      onToggleInfoModal={handleToggleInfoModal}
      disabledButton={disabledButton}
    />
  );
}

export { MoneyDestinationTab };
