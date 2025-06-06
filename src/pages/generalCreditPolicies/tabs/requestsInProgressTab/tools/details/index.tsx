import { detailsTabsConfig } from "@config/generalCreditPolicies/requestsInProgressTab/tabs";
import { IDetails } from "@ptypes/generalCredPolicies/IDetails";
import { DetailsRequestInProcess } from "./detailsRequest";
import { decisionTemplate } from "@config/generalCreditPolicies/decisionTemplate";
import { textValuesBusinessRules } from "@config/generalCreditPolicies/textValuesBusinessRules";
import { useDetailsRequestInProgress } from "@hooks/GeneralCreditPolicies/useDetailsRequestInProgress";
import { useMoreDetailsRequestProgress } from "@hooks/GeneralCreditPolicies/useMoreDetailsRequestProgress";
import { useDetailsPoliciesModal } from "@hooks/GeneralCreditPolicies/useDetailsPoliciesModal";

const Details = (props: IDetails) => {
  const { data } = props;

  const { showModal, normalizeData, handleToggleModal } =
    useDetailsRequestInProgress({ data });

  const {
    showMoreDetailsModal,
    moreDetailsData,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
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
  } = useDetailsPoliciesModal({
    data: moreDetailsData,
    detailsTabsConfig,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
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
    />
  );
};

export { Details };
