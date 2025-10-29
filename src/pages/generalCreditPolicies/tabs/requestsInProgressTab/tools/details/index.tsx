import { useDetailsRequestInProgress } from "@hooks/GeneralCreditPolicies/useDetailsRequestInProgress";
import { useMoreDetailsRequestProgress } from "@hooks/GeneralCreditPolicies/useMoreDetailsRequestProgress";
import { useDetailsPoliciesModal } from "@hooks/GeneralCreditPolicies/useDetailsPoliciesModal";
import { decisionTemplate } from "@config/generalCreditPolicies/decisionTemplate";
import { detailsTabsConfig } from "@config/generalCreditPolicies/requestsInProgressTab/tabs";
import { textValuesBusinessRules } from "@config/generalCreditPolicies/textValuesBusinessRules";
import { IDetails } from "@ptypes/generalCredPolicies/IDetails";
import { DetailsRequestInProcess } from "./detailsRequest";

const Details = (props: IDetails) => {
  const { data } = props;

  const {
    showModal,
    normalizeData,
    filteredRequestTabs,
    showTrazabilityData,
    showErrorData,
    withErrorRequest,
    loading,
    modalData,
    showDecision,
    title: titleRequest,
    isSelected: isSelectedRequest,
    defaultSelectedTab: defaultSelectedRequestTab,
    handleTabRequestChange,
    statusRequestData,
    handleToggleModal,
  } = useDetailsRequestInProgress({ data });

  const {
    showMoreDetailsModal,
    moreDetailsData,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
    decisionsMinimum,
    isMoreDetails,
    onToggleMoreDetailsModal,
  } = useMoreDetailsRequestProgress({ data });

  const {
    isSelected,
    isMobile,
    handleTabChange,
    filteredTabsConfig,
    defaultSelectedTab,
    contribQuotaInserted,
    contribQuotaDeleted,
    incomeQuotaInserted,
    incomeQuotaDeleted,
    scoreModelsInserted,
    scoreModelsDeleted,
    minimumInserted,
    minimumDeleted,
  } = useDetailsPoliciesModal({
    data: moreDetailsData,
    detailsTabsConfig,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
    decisionsMinimum,
    isMoreDetails,
  });

  return (
    <DetailsRequestInProcess
      data={normalizeData}
      showModal={showModal}
      onToggleModal={handleToggleModal}
      moreDetailsData={moreDetailsData}
      showMoreDetailsModal={showMoreDetailsModal}
      detailsTabsConfig={detailsTabsConfig}
      decisionTemplate={decisionTemplate}
      decisionsReciprocity={decisionsReciprocity}
      decisionsIncomePortfolio={decisionsIncomePortfolio}
      decisionsScoreModels={decisionsScoreModels}
      textValuesBusinessRules={textValuesBusinessRules}
      onToggleMoreDetailsModal={onToggleMoreDetailsModal}
      isMoreDetails={isMoreDetails}
      isSelected={isSelected ?? defaultSelectedTab ?? ""}
      isMobile={isMobile}
      onTabChange={handleTabChange}
      defaultSelectedTab={defaultSelectedTab ?? ""}
      filteredTabsConfig={filteredTabsConfig}
      contribQuotaInserted={contribQuotaInserted}
      contribQuotaDeleted={contribQuotaDeleted}
      incomeQuotaInserted={incomeQuotaInserted}
      incomeQuotaDeleted={incomeQuotaDeleted}
      scoreModelsInserted={scoreModelsInserted}
      scoreModelsDeleted={scoreModelsDeleted}
      titleRequest={titleRequest}
      isSelectedRequest={isSelectedRequest ?? defaultSelectedRequestTab ?? ""}
      filteredTabs={filteredRequestTabs}
      showTrazabilityData={showTrazabilityData}
      showErrorData={showErrorData}
      withErrorRequest={withErrorRequest}
      loading={loading}
      onTabRequestChange={handleTabRequestChange}
      onThirdClick={statusRequestData.onClick}
      modalData={modalData}
      showDecision={showDecision}
      labelButton={statusRequestData.textButton}
      iconButton={statusRequestData.iconButton}
      decisionsMinimum={decisionsMinimum}
      minimumInserted={minimumInserted}
      minimumDeleted={minimumDeleted}
    />
  );
};

export { Details };
