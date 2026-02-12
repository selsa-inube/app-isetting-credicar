import { IUseMoreDetailsModal } from "@ptypes/hooks/generalCreditPolicies/IUseMoreDetailsModal";

const useMoreDetailsModal = (props: IUseMoreDetailsModal) => {
  const { isSelected, detailsTabsConfig, isMoreDetails, decisions } = props;

  const showGeneralDecisionsTab =
    isSelected === detailsTabsConfig.generalDecision?.id;

  const showDecisionsRecip =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.contributionQuota?.id &&
    decisions.reciprocity.length > 0;

  const showContribInserted =
    isMoreDetails && isSelected === detailsTabsConfig.contribQuotaIncluded?.id;
  const showContribDeleted =
    isMoreDetails && isSelected === detailsTabsConfig.contribQuotaRemoved?.id;

  const showDecisionsIncome =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.incomeQuota?.id &&
    decisions.incomePortfolio.length > 0;

  const showIncomeInserted =
    isMoreDetails && isSelected === detailsTabsConfig.incomeQuotaIncluded?.id;

  const showIncomeDeleted =
    isMoreDetails && isSelected === detailsTabsConfig.incomeQuotaRemoved?.id;

  const showScoreModels =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.scoreModels?.id &&
    decisions.scoreModels.length > 0;

  const showScoreModelsInserted =
    isMoreDetails && isSelected === detailsTabsConfig.scoreModelsIncluded?.id;

  const showScoreModelsDeleted =
    isMoreDetails && isSelected === detailsTabsConfig.scoreModelsRemoved?.id;

  const showMinimum =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.minimumIncome?.id &&
    decisions.minimum.length > 0;

  const showMinimumInserted =
    isMoreDetails && isSelected === detailsTabsConfig.minimumIncomeIncluded?.id;

  const showMinimumDeleted =
    isMoreDetails && isSelected === detailsTabsConfig.minimumIncomeRemoved?.id;

  const showBasicNotifFormat =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.basicNotifFormat?.id &&
    decisions.basicNotifFormat.length > 0;

  const showBasicNotifFormatInserted =
    isMoreDetails &&
    isSelected === detailsTabsConfig.basicNotifFormatIncluded?.id;

  const showBasicNotifFormatDeleted =
    isMoreDetails &&
    isSelected === detailsTabsConfig.basicNotifFormatRemoved?.id;

  const showBasicNotifRecipient =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.basicNotifRecipient?.id &&
    decisions.basicNotifRecipient.length > 0;

  const showBasicNotifRecipientInserted =
    isMoreDetails &&
    isSelected === detailsTabsConfig.basicNotifRecipientIncluded?.id;

  const showBasicNotifRecipientDeleted =
    isMoreDetails &&
    isSelected === detailsTabsConfig.basicNotifRecipientRemoved?.id;

  const showMinCredBureauRiskScore =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.minCredBureauRiskScore?.id &&
    decisions.minCredBureauRiskScore.length > 0;

  const showMinCredBureauRiskInserted =
    isMoreDetails &&
    isSelected === detailsTabsConfig.minCredBureauRiskScoreIncluded?.id;

  const showMinCredBureauRiskDeleted =
    isMoreDetails &&
    isSelected === detailsTabsConfig.minCredBureauRiskScoreRemoved?.id;

  const showNotifChannel =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.notificationChannel?.id &&
    decisions.notifChannel.length > 0;

  const showNotifChanneInserted =
    isMoreDetails &&
    isSelected === detailsTabsConfig.notificationChannelIncluded?.id;

  const showNotifChanneDeleted =
    isMoreDetails &&
    isSelected === detailsTabsConfig.notificationChannelRemoved?.id;

  const showRiskScoreApiUrl =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.riskScoreApiUrl?.id &&
    decisions.riskScoreApiUrl.length > 0;

  const showRiskScoreApiUrlInserted =
    isMoreDetails &&
    isSelected === detailsTabsConfig.riskScoreApiUrlIncluded?.id;

  const showRiskScoreApiUrlDeleted =
    isMoreDetails &&
    isSelected === detailsTabsConfig.riskScoreApiUrlRemoved?.id;

  return {
    showGeneralDecisionsTab,
    showDecisionsRecip,
    showContribInserted,
    showContribDeleted,
    showDecisionsIncome,
    showMinimum,
    showIncomeInserted,
    showIncomeDeleted,
    showScoreModels,
    showScoreModelsInserted,
    showMinimumInserted,
    showMinimumDeleted,
    showScoreModelsDeleted,
    showBasicNotifFormat,
    showBasicNotifFormatInserted,
    showBasicNotifFormatDeleted,
    showBasicNotifRecipient,
    showBasicNotifRecipientInserted,
    showBasicNotifRecipientDeleted,
    showMinCredBureauRiskScore,
    showMinCredBureauRiskInserted,
    showMinCredBureauRiskDeleted,
    showNotifChannel,
    showNotifChanneInserted,
    showNotifChanneDeleted,
    showRiskScoreApiUrl,
    showRiskScoreApiUrlInserted,
    showRiskScoreApiUrlDeleted,
  };
};

export { useMoreDetailsModal };
