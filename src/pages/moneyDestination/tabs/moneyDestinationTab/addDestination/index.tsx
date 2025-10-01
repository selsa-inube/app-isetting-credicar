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

const AddDestination = () => {
  const {
    currentStep,
    formValues,
    generalInformationRef,
    isCurrentFormValid,
    showModal,
    showRequestProcessModal,
    saveData,
    smallScreen,
    showGoBackModal,
    creditLineValues,
    showDecisionModal,
    setShowDecisionModal,
    setCreditLineValues,
    handleCloseModal,
    handleGoBack,
    handleOpenModal,
    handleNextStep,
    handlePreviousStep,
    handleSubmitClick,
    handleToggleModal,
    setCurrentStep,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
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
      currentStep={currentStep}
      generalInformationRef={generalInformationRef}
      initialGeneralInformationValues={formValues}
      isCurrentFormValid={isCurrentFormValid}
      onFinishForm={handleSubmitClick}
      onNextStep={handleNextStep}
      onPreviousStep={handlePreviousStep}
      onToggleModal={handleToggleModal}
      setCurrentStep={setCurrentStep}
      setIsCurrentFormValid={setIsCurrentFormValid}
      showModal={showModal}
      steps={addDestinationStepsConfig}
      requestSteps={requestSteps}
      showRequestProcessModal={showRequestProcessModal}
      saveMoneyDestination={saveMoneyDestination as ISaveDataResponse}
      loading={loadingSendData}
      onCloseRequestStatus={handleCloseRequestStatus}
      showPendingReqModal={showPendingReqModal}
      onClosePendingReqModal={handleClosePendingReqModal}
      smallScreen={smallScreen}
      onCloseProcess={handleCloseProcess}
      onOpenModal={handleOpenModal}
      modalData={modalData}
      showDecision={showDecision}
      creditLineValues={creditLineValues}
      setCreditLineValues={setCreditLineValues}
      showDecisionModal={showDecisionModal}
      setShowDecisionModal={setShowDecisionModal}
    />
  );
};

export { AddDestination };
