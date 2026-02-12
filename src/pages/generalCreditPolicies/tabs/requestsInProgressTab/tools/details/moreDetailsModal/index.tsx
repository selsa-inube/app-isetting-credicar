import { useMoreDetailsModal } from "@hooks/GeneralCreditPolicies/useMoreDetailsModal";
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
    decisionsMinimum,
    minimumInserted,
    minimumDeleted,
    defaultSelectedTab,
    detailsTabsConfig,
    filteredTabsConfig,
    isMobile,
    isMoreDetails,
    isSelected,
    portalId,
    onCloseModal,
    onTabChange,
  } = props;

  const {
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
  } = useMoreDetailsModal({
    isSelected,
    detailsTabsConfig,
    isMoreDetails,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
    decisionsMinimum,
  });
  return (
    <MoreDetailsModalUI
      data={data}
      filteredTabsConfig={filteredTabsConfig}
      isSelected={isSelected ?? defaultSelectedTab}
      onCloseModal={onCloseModal}
      onTabChange={onTabChange}
      portalId={portalId}
      smallScreenTab={isMobile}
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
      showMinimum={showMinimum}
      showMinimumInserted={showMinimumInserted}
      showMinimumDeleted={showMinimumDeleted}
      decisionsMinimum={decisionsMinimum}
      minimumInserted={minimumInserted}
      minimumDeleted={minimumDeleted}
    />
  );
};

export { MoreDetailsModal };
