import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { labelsOfTraceability } from "@config/payrollAgreement/requestsInProgressTab/details/labelsOfTraceability";

import { MoreDetails } from "@pages/payrollAgreement/tabs/moreDetails";
import { IDetailsUI } from "@ptypes/payrollAgreement/requestInProgTab/IDetailsUI";
import { detailsLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/detailsLabels";
import { StyledContainerIcon } from "./styles";
import { RequestsInProcess } from "./requestsInProcess";

const DetailsUI = (props: IDetailsUI) => {
  const {
    data,
    isMobile,
    abbreviatedName,
    isSelected,
    defaultSelectedTab,
    filteredTabsConfig,
    detailsTabsConfig,
    labelsDetails,
    labelsPaymentCard,
    ordinaryPaymentData,
    extraordinaryPaymentData,
    ordinaryIncludedData,
    ordinaryEliminatedData,
    extraordinaryIncludedData,
    extraordinaryEliminatedData,
    showModal,
    showMoreDetailsModal,
    screenTablet,
    normalizeDataMoreDetails,
    labelsOfRequestDetails,
    title,
    onTabChange,
    onToggleModal,
    onToggleMoreDetailsModal,
  } = props;

  return (
    <>
      <StyledContainerIcon onClick={onToggleModal} $isTablet={screenTablet}>
        <Icon
          appearance={EComponentAppearance.DARK}
          icon={<MdOutlineRemoveRedEye />}
          size={screenTablet ? "20px" : "16px"}
          cursorHover
          spacing="narrow"
        />
        {screenTablet && (
          <Text type="body" size="medium">
            {detailsLabels.titleMobile}
          </Text>
        )}
      </StyledContainerIcon>

      {showModal && (
        <RequestsInProcess
          data={data}
          title={title}
          labelsOfRequest={labelsOfRequestDetails}
          labelsOfTraceability={labelsOfTraceability}
          onCloseModal={onToggleModal}
          isMobile={isMobile}
          onClick={onToggleMoreDetailsModal}
        />
      )}

      {showMoreDetailsModal && (
        <MoreDetails
          abbreviatedName={abbreviatedName}
          isSelected={isSelected}
          defaultSelectedTab={defaultSelectedTab}
          filteredTabsConfig={filteredTabsConfig}
          smallScreenTab={isMobile}
          detailsTabsConfig={detailsTabsConfig}
          data={normalizeDataMoreDetails}
          portalId="portal"
          labelsDetails={labelsDetails}
          labelsPaymentCard={labelsPaymentCard}
          ordinaryPaymentData={ordinaryPaymentData}
          extraordinaryPaymentData={extraordinaryPaymentData}
          ordinaryIncludedData={ordinaryIncludedData}
          ordinaryEliminatedData={ordinaryEliminatedData}
          extraordinaryIncludedData={extraordinaryIncludedData}
          extraordinaryEliminatedData={extraordinaryEliminatedData}
          title={detailsLabels.titleMoreDetails}
          onCloseModal={onToggleMoreDetailsModal}
          onTabChange={onTabChange}
        />
      )}
    </>
  );
};

export { DetailsUI };
