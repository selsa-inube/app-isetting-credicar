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

  return (
    <MoreDetailsModalUI
      data={data}
      filteredTabsConfig={filteredTabsConfig}
      detailsTabsConfig={detailsTabsConfig}
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
      isMoreDetails={isMoreDetails}
      contribQuotaInserted={contribQuotaInserted}
      contribQuotaDeleted={contribQuotaDeleted}
      incomeQuotaInserted={incomeQuotaInserted}
      incomeQuotaDeleted={incomeQuotaDeleted}
      scoreModelsInserted={scoreModelsInserted}
      scoreModelsDeleted={scoreModelsDeleted}
      isMobile={isMobile}
    />
  );
};

export { MoreDetailsModal };
