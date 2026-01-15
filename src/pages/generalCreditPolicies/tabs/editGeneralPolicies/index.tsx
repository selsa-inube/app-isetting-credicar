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
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const {
    formValues,
    decisionsGeneralRef,
    isSelected,
    saveData,
    showRequestProcessModal,
    smallScreen,
    contributionsPortfolio,
    incomePortfolio,
    scoreModels,
    minimumIncomePercentage,
    filteredTabs,
    initialDecisionsGenData,
    showDecisionsGeneral,
    showIncomePort,
    showContributions,
    showScoreModels,
    showGoBackModal,
    showDateModal,
    normalizedContributions,
    normalizedIncome,
    normalizedScoreModels,
    heightContPageContribut,
    heightContPageIncome,
    heightContPageScoreModels,
    showInfoModal,
    showMinimumIncome,
    heightContPageMinimum,
    normalizedMinimumIncome,
    handleFinishForm,
    handleToggleInfoModal,
    setShowReciprocity,
    setShowFactor,
    handleEditedModal,
    handleToggleDateModal,
    setIncomePortfolio,
    setScoreModels,
    setContributionsPortfolio,
    setMinimumIncomePercentage,
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
      contributionsPortfolio={contributionsPortfolio}
      setContributionsPortfolio={setContributionsPortfolio}
      decisionsGeneralReference={decisionsGeneralRef}
      incomePortfolio={incomePortfolio}
      scoreModels={scoreModels}
      setIncomePortfolio={setIncomePortfolio}
      setScoreModels={setScoreModels}
      initialDecisionsData={initialDecisionsGenData}
      showDecisionsGeneral={showDecisionsGeneral}
      showIncomePort={showIncomePort}
      showContributions={showContributions}
      showScoreModels={showScoreModels}
      showGoBackModal={showGoBackModal}
      showDateModal={showDateModal}
      onEditedModal={handleEditedModal}
      onToggleDateModal={handleToggleDateModal}
      normalizedContributions={normalizedContributions}
      normalizedIncome={normalizedIncome}
      normalizedScoreModels={normalizedScoreModels}
      normalizedMinimumIncome={normalizedMinimumIncome}
      isRequestStatusModal={isRequestStatusModal}
      setShowReciprocity={setShowReciprocity}
      setShowFactor={setShowFactor}
      heightContPageContribut={heightContPageContribut}
      heightContPageIncome={heightContPageIncome}
      heightContPageMinimum={heightContPageMinimum}
      showMinimumIncome={showMinimumIncome}
      heightContPageScoreModels={heightContPageScoreModels}
      onCloseProcess={handleCloseProcess}
      modalData={modalData as IModalData}
      showDecision={showDecision}
      minimumIncomePercentage={minimumIncomePercentage}
      setMinimumIncomePercentage={setMinimumIncomePercentage}
    />
  );
};

export { EditGeneralPolicies };
