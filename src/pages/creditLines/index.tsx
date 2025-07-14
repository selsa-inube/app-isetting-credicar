import { useContext } from "react";

import { useCreditLinePage } from "@hooks/creditLine/useCreditLinePage";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { ICardData } from "@ptypes/home/ICardData";
import { CreditLinesUI } from "./interface";

function CreditLines() {
  const { businessUnitSigla } = useContext(AuthAndPortalData);
  const {
    searchCreditLines,
    descriptionOptions,
    smallScreen,
    columnWidths,
    handleSearchCreditLines,
  } = useCreditLinePage(businessUnitSigla);

  return (
    <CreditLinesUI
      loading={false}
      searchCreditLines={searchCreditLines}
      onSearchCreditLines={handleSearchCreditLines}
      descriptionOptions={descriptionOptions as ICardData}
      columnWidths={columnWidths}
      smallScreen={smallScreen}
    />
  );
}

export { CreditLines };
