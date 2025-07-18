import { useContext } from "react";
import { useAddDestination } from "@hooks/moneyDestination/useAddDestination";
import { addDestinationStepsConfig } from "@config/moneyDestination/addDestination/assisted";
import { useSaveMoneyDestination } from "@hooks/moneyDestination/useSaveMoneyDestination";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { UseCase } from "@enum/useCase";
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
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingReqModal,
  } = useSaveMoneyDestination({
    useCase: UseCase.ADD,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
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
      onGoBack={handleGoBack}
      showGoBackModal={showGoBackModal}
      onCloseModal={handleCloseModal}
      onOpenModal={handleOpenModal}
    />
  );
}

export { AddDestination };
