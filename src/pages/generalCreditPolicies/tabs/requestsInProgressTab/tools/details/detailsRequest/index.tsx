import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { RequestsInProcess } from "@design/modals/requestInProgressModal";
import { labelsOfTraceability } from "@config/generalCreditPolicies/requestsInProgressTab/details/labelsOfTraceability";
import { labelsOfRequest } from "@config/generalCreditPolicies/requestsInProgressTab/details/labelsOfRequest";
import { detailsLabels } from "@config/generalCreditPolicies/requestsInProgressTab/details/detailsLabels";
import { portalId } from "@config/portalId";
import { mediaQueryTablet } from "@config/environment";
import { IDetailsRequest } from "@ptypes/generalCredPolicies/IDetailsRequest";
import { StyledContainerIcon } from "./styles";
import { MoreDetailsModal } from "../moreDetailsModal";

const DetailsRequestInProcess = (props: IDetailsRequest) => {
  const {
    data,
    contribQuotaInserted,
    contribQuotaDeleted,
    incomeQuotaInserted,
    incomeQuotaDeleted,
    scoreModelsInserted,
    scoreModelsDeleted,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
    decisionTemplate,
    defaultSelectedTab,
    detailsTabsConfig,
    filteredTabsConfig,
    isMobile,
    isMoreDetails,
    isSelected,
    moreDetailsData,
    showModal,
    showMoreDetailsModal,
    textValuesBusinessRules,
    titleRequest,
    isSelectedRequest,
    filteredTabs,
    showTrazabilityData,
    showErrorData,
    withErrorRequest,
    loading,
    modalData,
    showDecision,
    labelButton,
    iconButton,
    onTabRequestChange,
    onThirdClick,
    onTabChange,
    onToggleModal,
    onToggleMoreDetailsModal,
  } = props;

  const screenTablet = useMediaQuery(mediaQueryTablet);

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
            {detailsLabels.title}
          </Text>
        )}
      </StyledContainerIcon>

      {showModal && (
        <RequestsInProcess
          data={data}
          labelsOfRequest={labelsOfRequest}
          labelsOfTraceability={labelsOfTraceability}
          onCloseModal={onToggleModal}
          isMobile={isMobile}
          onClick={onToggleMoreDetailsModal}
          title={titleRequest}
          isSelected={isSelectedRequest}
          filteredTabs={filteredTabs}
          showTrazabilityData={showTrazabilityData}
          showErrorData={showErrorData}
          withErrorRequest={withErrorRequest}
          loading={loading}
          onTabChange={onTabRequestChange}
          onThirdClick={onThirdClick}
          labelButton={labelButton}
          iconButton={iconButton}
        />
      )}

      {showMoreDetailsModal && (
        <MoreDetailsModal
          data={moreDetailsData}
          detailsTabsConfig={detailsTabsConfig}
          portalId="portal"
          onCloseModal={onToggleMoreDetailsModal}
          textValues={textValuesBusinessRules}
          decisionTemplate={decisionTemplate}
          decisionsReciprocity={decisionsReciprocity}
          decisionsIncomePortfolio={decisionsIncomePortfolio}
          decisionsScoreModels={decisionsScoreModels}
          isMoreDetails={isMoreDetails}
          defaultSelectedTab={defaultSelectedTab}
          filteredTabsConfig={filteredTabsConfig}
          isMobile={isMobile}
          isSelected={isSelected ?? defaultSelectedTab}
          onTabChange={onTabChange}
          contribQuotaInserted={contribQuotaInserted}
          contribQuotaDeleted={contribQuotaDeleted}
          incomeQuotaInserted={incomeQuotaInserted}
          incomeQuotaDeleted={incomeQuotaDeleted}
          scoreModelsInserted={scoreModelsInserted}
          scoreModelsDeleted={scoreModelsDeleted}
        />
      )}

      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          description={modalData.description}
          actionText={modalData.actionText}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
          withIcon={modalData.withIcon}
          icon={modalData.icon}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
        />
      )}
    </>
  );
};

export { DetailsRequestInProcess };
