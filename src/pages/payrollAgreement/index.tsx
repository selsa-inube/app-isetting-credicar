import { useContext } from "react";

import { ICardData } from "@ptypes/home/ICardData";
import { payrollAgreementTabsConfig } from "@config/payrollAgreement/tabs";
import { usePayrollAgreementPage } from "@hooks/payrollAgreement/usePayrollAgreementPage";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { menuOptionsPayroll } from "@config/payrollAgreement/payrollAgreementTab/menuOptions";
import { PayrollAgreementUI } from "./interface";

const PayrollAgreement = () => {
  const { businessUnitSigla, appData } = useContext(AuthAndPortalData);
  const {
    isSelected,
    descriptionOptions,
    showPayrollAgreementTab,
    showRequestsInProgressTab,
    smallScreen,
    payrollAgreementTabs,
    showModal,
    showInfoModal,
    onToggleInfoModal,
    onCloseMenu,
    onToggleModal,
    handleTabChange,
  } = usePayrollAgreementPage({
    businessUnitSigla,
    bussinesUnits: appData.businessUnit.publicCode,
  });

  return (
    <PayrollAgreementUI
      isSelected={
        isSelected ??
        payrollAgreementTabsConfig(smallScreen).payrollAgreement.id
      }
      handleTabChange={handleTabChange}
      descriptionOptions={descriptionOptions as ICardData}
      showPayrollAgreementTab={showPayrollAgreementTab}
      showRequestsInProgressTab={showRequestsInProgressTab}
      smallScreen={smallScreen}
      payrollAgreementTabs={payrollAgreementTabs}
      showModal={showModal}
      showInfoModal={showInfoModal}
      options={menuOptionsPayroll}
      onToggleInfoModal={onToggleInfoModal}
      onCloseMenu={onCloseMenu}
      onToggleModal={onToggleModal}
    />
  );
};

export { PayrollAgreement };
