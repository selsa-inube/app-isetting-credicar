import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
import { MoreDetails } from "@pages/payrollAgreement/tabs/moreDetails";
import { IDetailsUI } from "@ptypes/payrollAgreement/payrollAgreementTab/IDetailsUI";
import { detailsCyclesLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/detailsCyclesLabels";
import { moreDetailsRequestModal } from "@config/payrollAgreement/requestsInProgressTab/details/moreDetailsRequestModal";
import { StyledContainerIcon } from "./styles";

const DetailsUI = (props: IDetailsUI) => {
  const {
    data,
    abbreviatedName,
    showModal,
    defaultSelectedTab,
    filteredTabsConfig,
    isMobile,
    isSelected,
    detailsTabsConfig,
    labelsDetails,
    labelsPaymentCard,
    ordinaryPaymentData,
    extraordinaryPaymentData,
    screenTablet,
    onToggleModal,
    onTabChange,
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
            {detailsCyclesLabels.title}
          </Text>
        )}
      </StyledContainerIcon>

      {showModal && (
        <MoreDetails
          abbreviatedName={abbreviatedName}
          isSelected={isSelected}
          defaultSelectedTab={defaultSelectedTab}
          filteredTabsConfig={filteredTabsConfig}
          title={moreDetailsRequestModal.titleDetails}
          smallScreenTab={isMobile}
          detailsTabsConfig={detailsTabsConfig}
          data={data}
          portalId="portal"
          labelsDetails={labelsDetails}
          labelsPaymentCard={labelsPaymentCard}
          ordinaryPaymentData={ordinaryPaymentData}
          extraordinaryPaymentData={extraordinaryPaymentData}
          onCloseModal={onToggleModal}
          onTabChange={onTabChange}
        />
      )}
    </>
  );
};

export { DetailsUI };
