import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useAddDestination } from "@hooks/moneyDestination/add/useAddDestination";
import { useSaveMoneyDestination } from "@hooks/moneyDestination/useSaveMoneyDestination";
import { useModalAddDestination } from "@hooks/moneyDestination/add/useModalAddDestination";
import { EUseCase } from "@enum/useCase";
import { addDestinationStepsConfig } from "@config/moneyDestination/addDestination/assisted";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { AddDestinationUI } from "./interface";

function AddDestination() {
  const {
    creditLineDecisions,
    currentStep,
    formValues,
    generalInformationRef,
    isCurrentFormValid,
    nameDecision,
    showModal,
    showRequestProcessModal,
    saveData,
    showAttentionModal,
    smallScreen,
    showGoBackModal,
    handleCloseModal,
    handleGoBack,
    handleOpenModal,
    handleNextStep,
    handlePreviousStep,
    handleSubmitClick,
    handleToggleModal,
    setCreditLineDecisions,
    setCurrentStep,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
    setShowAttentionModal,
    setShowModal,
  } = useAddDestination();

  const { appData } = useContext(AuthAndPortalData);

  const {
    saveMoneyDestination,
    requestSteps,
    loadingSendData,
    showPendingReqModal,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleToggleErrorModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingReqModal,
  } = useSaveMoneyDestination({
    useCase: EUseCase.ADD,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
  });

  const { modalData, showDecision } = useModalAddDestination({
    showGoBackModal,
    loading: loadingSendData,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleCloseModal,
    handleGoBack,
    handleToggleErrorModal,
  });

  return (
    <AddDestinationUI
      creditLineDecisions={creditLineDecisions}
      currentStep={currentStep}
      generalInformationRef={generalInformationRef}
      initialGeneralInformationValues={formValues}
      isCurrentFormValid={isCurrentFormValid}
      onFinishForm={handleSubmitClick}
      onNextStep={handleNextStep}
      onPreviousStep={handlePreviousStep}
      onToggleModal={handleToggleModal}
      setCreditLineDecisions={setCreditLineDecisions}
      setCurrentStep={setCurrentStep}
      setIsCurrentFormValid={setIsCurrentFormValid}
      showModal={showModal}
      steps={addDestinationStepsConfig(nameDecision)}
      requestSteps={requestSteps}
      showRequestProcessModal={showRequestProcessModal}
      saveMoneyDestination={saveMoneyDestination as ISaveDataResponse}
      loading={loadingSendData}
      onCloseRequestStatus={handleCloseRequestStatus}
      showPendingReqModal={showPendingReqModal}
      onClosePendingReqModal={handleClosePendingReqModal}
      showAttentionModal={showAttentionModal}
      setShowAttentionModal={setShowAttentionModal}
      smallScreen={smallScreen}
      onCloseProcess={handleCloseProcess}
      onOpenModal={handleOpenModal}
      modalData={modalData}
      showDecision={showDecision}
    />
  );
}

export { AddDestination };
