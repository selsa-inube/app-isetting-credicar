import { IUseMoreDetailsModal } from "@ptypes/hooks/generalCreditPolicies/IUseMoreDetailsModal";

const useMoreDetailsModal = (props: IUseMoreDetailsModal) => {
  const {
    isSelected,
    detailsTabsConfig,
    isMoreDetails,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
    decisionsMinimum,
  } = props;

  const showGeneralDecisionsTab =
    isSelected === detailsTabsConfig.generalDecision?.id;

  const showDecisionsRecip =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.contributionQuota?.id &&
    decisionsReciprocity.length > 0;

  const showContribInserted =
    isMoreDetails && isSelected === detailsTabsConfig.contribQuotaIncluded?.id;
  const showContribDeleted =
    isMoreDetails && isSelected === detailsTabsConfig.contribQuotaRemoved?.id;

  const showDecisionsIncome =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.incomeQuota?.id &&
    decisionsIncomePortfolio.length > 0;

  const showIncomeInserted =
    isMoreDetails && isSelected === detailsTabsConfig.incomeQuotaIncluded?.id;

  const showIncomeDeleted =
    isMoreDetails && isSelected === detailsTabsConfig.incomeQuotaRemoved?.id;

  const showScoreModels =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.scoreModels?.id &&
    decisionsScoreModels.length > 0;

  const showScoreModelsInserted =
    isMoreDetails && isSelected === detailsTabsConfig.scoreModelsIncluded?.id;

  const showScoreModelsDeleted =
    isMoreDetails && isSelected === detailsTabsConfig.scoreModelsRemoved?.id;

  const showMinimum =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.minimumIncome?.id &&
    decisionsMinimum.length > 0;

  const showMinimumInserted =
    isMoreDetails && isSelected === detailsTabsConfig.minimumIncomeIncluded?.id;

  const showMinimumDeleted =
    isMoreDetails && isSelected === detailsTabsConfig.minimumIncomeRemoved?.id;

  return {
    showGeneralDecisionsTab,
    showDecisionsRecip,
    showContribInserted,
    showContribDeleted,
    showDecisionsIncome,
    showIncomeInserted,
    showIncomeDeleted,
    showScoreModels,
    showScoreModelsInserted,
    showMinimum,
    showMinimumInserted,
    showMinimumDeleted,
    showScoreModelsDeleted,
  };
};

export { useMoreDetailsModal };
