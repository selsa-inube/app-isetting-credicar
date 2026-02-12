import { useDetailsRequestInProgress } from "@hooks/GeneralCreditPolicies/useDetailsRequestInProgress";
import { useMoreDetailsRequestProgress } from "@hooks/GeneralCreditPolicies/useMoreDetailsRequestProgress";
import { useDetailsPoliciesModal } from "@hooks/GeneralCreditPolicies/useDetailsPoliciesModal";
import { detailsTabsConfig } from "@config/generalCreditPolicies/requestsInProgressTab/tabs";
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
    decisions,
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
  } = useDetailsPoliciesModal({
    data: moreDetailsData,
    detailsTabsConfig,
    decisions,
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
      decisions={decisions}
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
      minimumInserted={minimumInserted}
      minimumDeleted={minimumDeleted}
    />
  );
};

export { Details };
