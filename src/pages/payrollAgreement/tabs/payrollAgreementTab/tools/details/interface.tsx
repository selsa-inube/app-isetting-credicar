import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text } from "@inubekit/inubekit";
import { ComponentAppearance } from "@enum/appearances";
import { MoreDetails } from "@pages/payrollAgreement/tabs/moreDetails";
import { IDetailsUI } from "@ptypes/payrollAgreement/payrollAgreementTab/IDetailsUI";
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
          appearance={ComponentAppearance.DARK}
          icon={<MdOutlineRemoveRedEye />}
          size={screenTablet ? "20px" : "16px"}
          cursorHover
          spacing="narrow"
        />
        {screenTablet && (
          <Text type="body" size="medium">
            Detalles
          </Text>
        )}
      </StyledContainerIcon>

      {showModal && (
        <MoreDetails
          abbreviatedName={abbreviatedName}
          isSelected={isSelected}
          defaultSelectedTab={defaultSelectedTab}
          filteredTabsConfig={filteredTabsConfig}
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
