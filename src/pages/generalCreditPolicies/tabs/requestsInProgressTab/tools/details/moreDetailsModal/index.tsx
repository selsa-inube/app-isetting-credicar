import { IMoreDetailsModal } from "@ptypes/generalCredPolicies/IMoreDetailsModal";
import { MoreDetailsModalUI } from "./interface";

const MoreDetailsModal = (props: IMoreDetailsModal) => {
  const {
    data,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
    contribQuotaInserted,
    contribQuotaDeleted,
    incomeQuotaInserted,
    incomeQuotaDeleted,
    scoreModelsInserted,
    scoreModelsDeleted,
    decisionTemplate,
    defaultSelectedTab,
    detailsTabsConfig,
    filteredTabsConfig,
    isMobile,
    isMoreDetails,
    isSelected,
    portalId,
    textValues,
    onCloseModal,
    onTabChange,
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
  return (
    <MoreDetailsModalUI
      data={data}
      filteredTabsConfig={filteredTabsConfig}
      isSelected={isSelected ?? defaultSelectedTab}
      onCloseModal={onCloseModal}
      onTabChange={onTabChange}
      portalId={portalId}
      smallScreenTab={isMobile}
      decisionTemplate={decisionTemplate}
      textValues={textValues}
      decisionsReciprocity={decisionsReciprocity}
      decisionsIncomePortfolio={decisionsIncomePortfolio}
      decisionsScoreModels={decisionsScoreModels}
      contribQuotaInserted={contribQuotaInserted}
      contribQuotaDeleted={contribQuotaDeleted}
      incomeQuotaInserted={incomeQuotaInserted}
      incomeQuotaDeleted={incomeQuotaDeleted}
      scoreModelsInserted={scoreModelsInserted}
      scoreModelsDeleted={scoreModelsDeleted}
      isMobile={isMobile}
      showGeneralDecisionsTab={showGeneralDecisionsTab}
      showDecisionsRecip={showDecisionsRecip}
      showContribInserted={showContribInserted}
      showContribDeleted={showContribDeleted}
      showDecisionsIncome={showDecisionsIncome}
      showIncomeInserted={showIncomeInserted}
      showIncomeDeleted={showIncomeDeleted}
      showScoreModels={showScoreModels}
      showScoreModelsInserted={showScoreModelsInserted}
      showScoreModelsDeleted={showScoreModelsDeleted}
    />
  );
};

export { MoreDetailsModal };
