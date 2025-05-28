import { useDetailsPayrollAgreement } from "@hooks/payrollAgreement/useDetailsPayrollAgreement";
import { detailsPayrollAgreementTabsConfig } from "@config/payrollAgreement/payrollAgreementTab/details/tabs";
import { labelsDetails } from "@config/payrollAgreement/payrollAgreementTab/details/labels";
import { labelsPaymentCard } from "@config/payrollAgreement/payrollAgreementTab/details/labelsPaymentCard";
import { IDetails } from "@ptypes/payrollAgreement/payrollAgreementTab/IDetails";
import { IEntry } from "@ptypes/design/table/IEntry";
import { DetailsUI } from "./interface";

const Details = (props: IDetails) => {
  const { data } = props;

  const {
    showModal,
    normalizeData,
    isSelected,
    isMobile,
    filteredTabsConfig,
    defaultSelectedTab,
    screenTablet,
    ordinaryPaymentData,
    extraordinaryPaymentData,
    handleTabChange,
    handleToggleModal,
  } = useDetailsPayrollAgreement({
    data,
    detailsTabsConfig: detailsPayrollAgreementTabsConfig,
    showModalReq: false,
  });

  return (
    <DetailsUI
      abbreviatedName={data.abbreviatedName ?? ""}
      showModal={showModal}
      onToggleModal={handleToggleModal}
      isSelected={isSelected ?? defaultSelectedTab ?? ""}
      defaultSelectedTab={defaultSelectedTab ?? ""}
      filteredTabsConfig={filteredTabsConfig}
      detailsTabsConfig={detailsPayrollAgreementTabsConfig}
      data={normalizeData}
      isMobile={isMobile}
      labelsDetails={labelsDetails}
      labelsPaymentCard={labelsPaymentCard}
      ordinaryPaymentData={ordinaryPaymentData()}
      extraordinaryPaymentData={extraordinaryPaymentData() as IEntry[]}
      onTabChange={handleTabChange}
      screenTablet={screenTablet}
    />
  );
};

export { Details };
