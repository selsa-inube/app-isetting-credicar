import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";

import { useEditGeneralPolicies } from "@hooks/GeneralCreditPolicies/edit/useEditGeneralPolicies";
import { useModalEditPolicies } from "@hooks/GeneralCreditPolicies/edit/useModalEditPolicies";
import { useSaveGeneralPolicies } from "@hooks/GeneralCreditPolicies/saveGeneralPolicies/useSaveGeneralPolicies";
import { EUseCase } from "@enum/useCase";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { IEditGeneralPolicies } from "@ptypes/generalCredPolicies/IEditGeneralPolicies";
import { EditGeneralPoliciesUI } from "./interface";

const EditGeneralPolicies = (props: IEditGeneralPolicies) => {
  const {
    contributionsData,
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    minimumIncomeData,
    realGuaranteesData,
    basicNotificFormatData,
    basicNotificationRecData,
    creditBureausConsultReqData,
    inquiryValidityPeriodData,
    lineCreditPayrollAdvanceData,
    lineCreditPayrollSpecialAdvanceData,
    maximumNotifDocSizeData,
    minCredBureauRiskScoreData,
    notifChannelData,
    riskScoreApiUrlData,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const {
    formValues,
    decisionsGeneralRef,
    isSelected,
    saveData,
    showRequestProcessModal,
    smallScreen,
    filteredTabs,
    initialDecisionsGenData,
    showDecisionsGeneral,
    showIncomePort,
    showContributions,
    showScoreModels,
    showGoBackModal,
    showDateModal,
    showInfoModal,
    showMinimumIncome,
    showBasicNotificFormat,
    showBasicNotifRecipient,
    showMinCreditBureauRiskScore,
    showNotificationChannel,
    showRiskScoreApiUrl,
    rulesData,
    disabledButton,
    setDecisionData,
    handleFinishForm,
    handleToggleInfoModal,
    setShowReciprocity,
    setShowFactor,
    handleEditedModal,
    handleToggleDateModal,
    handleReset,
    handleGoBack,
    handleCloseGoBackModal,
    setIsCurrentFormValid,
    handleTabChange,
    setShowRequestProcessModal,
    setShowDateModal,
  } = useEditGeneralPolicies({
    contributionsData,
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    realGuaranteesData,
    minimumIncomeData,
    basicNotificFormatData,
    basicNotificationRecData,
    creditBureausConsultReqData,
    inquiryValidityPeriodData,
    lineCreditPayrollAdvanceData,
    lineCreditPayrollSpecialAdvanceData,
    maximumNotifDocSizeData,
    minCredBureauRiskScoreData,
    notifChannelData,
    riskScoreApiUrlData,
  });

  const {
    saveGeneralPolicies,
    requestSteps,
    loadingSendData,
    showPendingReqModal,
    isRequestStatusModal,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleToggleErrorModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingReqModal,
  } = useSaveGeneralPolicies({
    useCase: EUseCase.EDIT,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal: setShowDateModal,
    token: appData.token,
  });

  const { modalData, showDecision } = useModalEditPolicies({
    showGoBackModal,
    loading: loadingSendData,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    showInfoModal,
    showDateModal,
    loadingSendData,
    handleToggleInfoModal,
    handleFinishForm,
    handleToggleDateModal,
    handleCloseGoBackModal,
    handleGoBack,
    handleToggleErrorModal,
  });
  return (
    <EditGeneralPoliciesUI
      formValues={formValues}
      filteredTabsConfig={Object.values(filteredTabs)}
      isSelected={isSelected}
      onTabChange={handleTabChange}
      onReset={handleReset}
      setIsCurrentFormValid={setIsCurrentFormValid}
      saveGeneralPolicies={saveGeneralPolicies as ISaveDataResponse}
      requestSteps={requestSteps}
      loading={loadingSendData}
      showPendingReqModal={showPendingReqModal}
      showRequestProcessModal={showRequestProcessModal}
      onCloseRequestStatus={handleCloseRequestStatus}
      onClosePendingReqModal={handleClosePendingReqModal}
      smallScreen={smallScreen}
      decisionsGeneralReference={decisionsGeneralRef}
      initialDecisionsData={initialDecisionsGenData}
      showDecisionsGeneral={showDecisionsGeneral}
      showIncomePort={showIncomePort}
      showContributions={showContributions}
      showScoreModels={showScoreModels}
      showGoBackModal={showGoBackModal}
      showDateModal={showDateModal}
      onEditedModal={handleEditedModal}
      onToggleDateModal={handleToggleDateModal}
      isRequestStatusModal={isRequestStatusModal}
      setShowReciprocity={setShowReciprocity}
      setShowFactor={setShowFactor}
      showMinimumIncome={showMinimumIncome}
      onCloseProcess={handleCloseProcess}
      modalData={modalData as IModalData}
      showDecision={showDecision}
      showBasicNotificFormat={showBasicNotificFormat}
      showBasicNotifRecipient={showBasicNotifRecipient}
      showMinCreditBureauRiskScore={showMinCreditBureauRiskScore}
      showNotificationChannel={showNotificationChannel}
      showRiskScoreApiUrl={showRiskScoreApiUrl}
      rulesData={rulesData}
      setDecisionData={setDecisionData}
      disabledButton={disabledButton}
      handleToggleDateModal={handleToggleDateModal}
    />
  );
};

export { EditGeneralPolicies };
