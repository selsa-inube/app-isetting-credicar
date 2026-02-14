import { useMoreDetailsModal } from "@hooks/GeneralCreditPolicies/useMoreDetailsModal";
import { IMoreDetailsModal } from "@ptypes/generalCredPolicies/IMoreDetailsModal";
import { MoreDetailsModalUI } from "./interface";

const MoreDetailsModal = (props: IMoreDetailsModal) => {
  const {
    data,
    decisions,
    contribQuotaInserted,
    contribQuotaDeleted,
    incomeQuotaInserted,
    incomeQuotaDeleted,
    scoreModelsInserted,
    scoreModelsDeleted,
    minimumInserted,
    minimumDeleted,
    basicNotifFormatInserted,
    basicNotifFormatDeleted,
    basicNotifRecipientInserted,
    basicNotifRecipientDeleted,
    minCredBureauRiskScoreInserted,
    minCredBureauRiskScoreDeleted,
    notifChannelInserted,
    notifChannelDeleted,
    riskScoreApiUrlInserted,
    riskScoreApiUrlDeleted,
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
  } = useMoreDetailsModal({
    isSelected,
    detailsTabsConfig,
    isMoreDetails,
    decisions,
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
      decisions={decisions}
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
      minimumInserted={minimumInserted}
      minimumDeleted={minimumDeleted}
      basicNotifFormatInserted={basicNotifFormatInserted}
      basicNotifFormatDeleted={basicNotifFormatDeleted}
      basicNotifRecipientInserted={basicNotifRecipientInserted}
      basicNotifRecipientDeleted={basicNotifRecipientDeleted}
      minCredBureauRiskScoreInserted={minCredBureauRiskScoreInserted}
      minCredBureauRiskScoreDeleted={minCredBureauRiskScoreDeleted}
      notifChannelInserted={notifChannelInserted}
      notifChannelDeleted={notifChannelDeleted}
      riskScoreApiUrlInserted={riskScoreApiUrlInserted}
      riskScoreApiUrlDeleted={riskScoreApiUrlDeleted}
      showBasicNotifFormat={showBasicNotifFormat}
      showBasicNotifFormatInserted={showBasicNotifFormatInserted}
      showBasicNotifFormatDeleted={showBasicNotifFormatDeleted}
      showBasicNotifRecipient={showBasicNotifRecipient}
      showBasicNotifRecipientInserted={showBasicNotifRecipientInserted}
      showBasicNotifRecipientDeleted={showBasicNotifRecipientDeleted}
      showMinCredBureauRiskScore={showMinCredBureauRiskScore}
      showMinCredBureauRiskInserted={showMinCredBureauRiskInserted}
      showMinCredBureauRiskDeleted={showMinCredBureauRiskDeleted}
      showNotifChannel={showNotifChannel}
      showNotifChanneInserted={showNotifChanneInserted}
      showNotifChanneDeleted={showNotifChanneDeleted}
      showRiskScoreApiUrl={showRiskScoreApiUrl}
      showRiskScoreApiUrlInserted={showRiskScoreApiUrlInserted}
      showRiskScoreApiUrlDeleted={showRiskScoreApiUrlDeleted}
    />
  );
};

export { MoreDetailsModal };
