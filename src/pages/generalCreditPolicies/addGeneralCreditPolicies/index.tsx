import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useSaveGeneralPolicies } from "@hooks/GeneralCreditPolicies/saveGeneralPolicies/useSaveGeneralPolicies";
import { useAddGeneralPolicies } from "@hooks/GeneralCreditPolicies/add/useAddGeneralPolicies";
import { useModalAddGeneral } from "@hooks/GeneralCreditPolicies/add/useModalAddGeneral";
import { EUseCase } from "@enum/useCase";
import { addGenCredPoliciesSteps } from "@config/generalCreditPolicies/assisted/steps";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { AddGenCreditPoliciesUI } from "./interface";

const AddGenCreditPolicies = () => {
  const { appData } = useContext(AuthAndPortalData);
  const {
    currentStep,
    saveData,
    formValues,
    formReferences,
    smallScreen,
    formValid,
    showModal,
    showRequestProcessModal,
    dateVerification,
    showGoBackModal,
    disabledButton,
    rulesData,
    optionsGenDecision,
    setOptionsGenDecision,
    setDecisionData,
    handleCloseGoBackModal,
    handleGoBack,
    handleOpenModal,
    setDateVerification,
    handleSubmitClick,
    setShowRequestProcessModal,
    setCurrentStep,
    handleFormValidChange,
    handleNextStep,
    handlePreviousStep,
    handleToggleModal,
    setIsCurrentFormValid,
    setShowModal,
  } = useAddGeneralPolicies({ appData });

  const {
    saveGeneralPolicies,
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
  } = useSaveGeneralPolicies({
    useCase: EUseCase.ADD,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
    token: appData.token,
  });

  const { modalData, showDecision } = useModalAddGeneral({
    showGoBackModal,
    loading: loadingSendData,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleCloseModal: handleCloseGoBackModal,
    handleGoBack,
    handleToggleErrorModal,
  });

  return (
    <AddGenCreditPoliciesUI
      currentStep={currentStep}
      formReferences={formReferences}
      initialValues={formValues}
      formValid={formValid}
      steps={addGenCredPoliciesSteps}
      onNextStep={handleNextStep}
      onPreviousStep={handlePreviousStep}
      setIsCurrentFormValid={setIsCurrentFormValid}
      smallScreen={smallScreen}
      onToggleModal={handleToggleModal}
      handleFormValidChange={handleFormValidChange}
      setCurrentStep={setCurrentStep}
      showModal={showModal}
      onCloseRequestStatus={handleCloseRequestStatus}
      onClosePendingReqModal={handleClosePendingReqModal}
      showPendingReqModal={showPendingReqModal}
      showRequestProcessModal={showRequestProcessModal}
      requestSteps={requestSteps}
      saveGeneralPolicies={saveGeneralPolicies as ISaveDataResponse}
      loading={loadingSendData}
      onFinishForm={handleSubmitClick}
      dateVerification={dateVerification as IDateVerification}
      setDateVerification={setDateVerification}
      onOpenModal={handleOpenModal}
      onCloseProcess={handleCloseProcess}
      modalData={modalData}
      showDecision={showDecision}
      disabledButton={disabledButton}
      rulesData={rulesData}
      setDecisionData={setDecisionData}
      optionsGenDecision={optionsGenDecision}
      setOptionsGenDecision={setOptionsGenDecision}
    />
  );
};

export { AddGenCreditPolicies };
