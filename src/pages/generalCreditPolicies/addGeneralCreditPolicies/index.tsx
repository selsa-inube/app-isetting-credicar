import { useContext } from "react";
import { useAddGenCredPolicies } from "@hooks/GeneralCreditPolicies/useAddGenCredPolicies";
import { addGenCredPoliciesSteps } from "@config/generalCreditPolicies/assisted/steps";
import { useSaveGeneralPolicies } from "@hooks/GeneralCreditPolicies/useSaveGeneralPolicies";
import { UseCase } from "@enum/useCase";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
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
    contributionsPortfolio,
    incomePortfolio,
    formValid,
    scoreModels,
    showModal,
    showRequestProcessModal,
    dateVerification,
    showGoBackModal,
    handleCloseGoBackModal,
    handleGoBack,
    handleOpenModal,
    setDateVerification,
    handleSubmitClick,
    setShowRequestProcessModal,
    setScoreModels,
    setCurrentStep,
    setIncomePortfolio,
    setContributionsPortfolio,
    handleFormValidChange,
    handleNextStep,
    handlePreviousStep,
    handleToggleModal,
    setIsCurrentFormValid,
    setShowModal,
  } = useAddGenCredPolicies({ appData });

  const {
    saveGeneralPolicies,
    requestSteps,
    loadingSendData,
    showPendingReqModal,
    handleCloseRequestStatus,
    handleClosePendingReqModal,
  } = useSaveGeneralPolicies({
    useCase: UseCase.ADD,
    bussinesUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
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
      contributionsPortfolio={contributionsPortfolio}
      setContributionsPortfolio={setContributionsPortfolio}
      incomePortfolio={incomePortfolio}
      setIncomePortfolio={setIncomePortfolio}
      scoreModels={scoreModels}
      setScoreModels={setScoreModels}
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
      showGoBackModal={showGoBackModal}
      onCloseGoBackModal={handleCloseGoBackModal}
      onGoBack={handleGoBack}
      onOpenModal={handleOpenModal}
    />
  );
};

export { AddGenCreditPolicies };
