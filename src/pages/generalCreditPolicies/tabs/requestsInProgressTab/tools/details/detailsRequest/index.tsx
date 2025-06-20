import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { ComponentAppearance } from "@enum/appearances";
import { IDetailsRequest } from "@ptypes/generalCredPolicies/IDetailsRequest";
import { labelsOfTraceability } from "@config/generalCreditPolicies/requestsInProgressTab/details/labelsOfTraceability";
import { labelsOfRequest } from "@config/generalCreditPolicies/requestsInProgressTab/details/labelsOfRequest";
import { detailsLabels } from "@config/generalCreditPolicies/requestsInProgressTab/details/detailsLabels";
import { StyledContainerIcon } from "./styles";
import { RequestsInProcess } from "../requestsInProcess";
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
    onTabChange,
    onToggleModal,
    onToggleMoreDetailsModal,
  } = props;

  const screenTablet = useMediaQuery("(max-width: 1200px)");

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
    </>
  );
};

export { DetailsRequestInProcess };
