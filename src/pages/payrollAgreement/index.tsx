import { useContext } from "react";

import { ICardData } from "@ptypes/home/ICardData";
import { payrollAgreementTabsConfig } from "@config/payrollAgreement/tabs";
import { usePayrollAgreementPage } from "@hooks/payrollAgreement/usePayrollAgreementPage";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { PayrollAgreementUI } from "./interface";

const PayrollAgreement = () => {
  const { businessUnitSigla, appData } = useContext(AuthAndPortalData);
  const {
    isSelected,
    descriptionOptions,
    showPayrollAgreementTab,
    showRequestsInProgressTab,
    smallScreen,
    smallScreenTab,
    payrollAgreementTabs,
    handleTabChange,
  } = usePayrollAgreementPage({
    businessUnitSigla,
    bussinesUnits: appData.businessUnit.publicCode,
  });

  return (
    <PayrollAgreementUI
      isSelected={isSelected ?? payrollAgreementTabsConfig.payrollAgreement.id}
      handleTabChange={handleTabChange}
      descriptionOptions={descriptionOptions as ICardData}
      showPayrollAgreementTab={showPayrollAgreementTab}
      showRequestsInProgressTab={showRequestsInProgressTab}
      smallScreen={smallScreen}
      smallScreenTab={smallScreenTab}
      payrollAgreementTabs={payrollAgreementTabs}
    />
  );
};

export { PayrollAgreement };
