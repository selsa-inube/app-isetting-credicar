import { useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCreditLinePage } from "@hooks/creditLine/useCreditLinePage";
import { creditLinesTabsConfig } from "@config/creditLines/tabs";
import { ICardData } from "@ptypes/home/ICardData";
import { CreditLinesUI } from "./interface";

const CreditLines = () => {
  const { businessUnitSigla } = useContext(AuthAndPortalData);
  const {
    descriptionOptions,
    smallScreen,
    isSelected,
    showCreditLinesTab,
    showLinesRequestTab,
    showLinesUnderConstructionTab,
    creditLinesTabs,
    handleTabChange,
    setShowUnderConstruction,
  } = useCreditLinePage(businessUnitSigla);

  return (
    <CreditLinesUI
      isSelected={isSelected ?? creditLinesTabsConfig.creditLines.id}
      handleTabChange={handleTabChange}
      descriptionOptions={descriptionOptions as ICardData}
      smallScreen={smallScreen}
      showCreditLinesTab={showCreditLinesTab}
      showRequestsInProgressTab={showLinesRequestTab}
      showLinesUnderConstructionTab={showLinesUnderConstructionTab}
      creditLinesTabs={creditLinesTabs}
      setShowUnderConstruction={setShowUnderConstruction}
    />
  );
};

export { CreditLines };
