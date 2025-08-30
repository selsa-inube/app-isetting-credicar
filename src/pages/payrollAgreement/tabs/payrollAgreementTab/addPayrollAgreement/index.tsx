import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useAddPayrollAgreement } from "@hooks/payrollAgreement/add/useAddPayrollAgreement";
import { useModalAddPayroll } from "@hooks/payrollAgreement/add/useModalAddPayroll";
import { useSavePayrollAgreement } from "@hooks/payrollAgreement/savePayrollAgreement/useSavePayrollAgreement";
import { EUseCase } from "@enum/useCase";
import { addPayrollAgreementSteps } from "@config/payrollAgreement/payrollAgreementTab/assisted/steps";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";
import { IServerDomain } from "@ptypes/IServerDomain";
import { AddPayrollAgreementUI } from "./interface";

const AddPayrollAgreement = () => {
  const { appData } = useContext(AuthAndPortalData);
  const {
    currentStep,
    formValues,
    formReferences,
    formValid,
    showGoBackModal,
    sourcesOfIncomeValues,
    smallScreen,
    regularPaymentCycles,
    extraordinaryPayment,
    typeRegularPayroll,
    showModal,
    showRequestProcessModal,
    saveData,
    includeExtraPayDay,
    handleCloseModal,
    handleGoBack,
    handleNextStep,
    handleOpenModal,
    handlePreviousStep,
    handleSubmitClick,
    handleToggleModal,
    setCurrentStep,
    setExtraordinaryPayment,
    setIsCurrentFormValid,
    setRegularPaymentCycles,
    setIncludeExtraPayDay,
    setRegularDeleted,
    setShowModal,
    setShowRequestProcessModal,
    setSourcesOfIncomeValues,
  } = useAddPayrollAgreement({ appData });

  const {
    savePayrollAgreement,
    requestSteps,
    loadingSendData,
    showPendingRequestModal,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleToggleErrorModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingRequestModal,
  } = useSavePayrollAgreement({
    useCase: EUseCase.ADD,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
  });

  const { modalData, showDecision } = useModalAddPayroll({
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
    <AddPayrollAgreementUI
      currentStep={currentStep}
      formReferences={formReferences}
      initialGeneralInformationValues={formValues}
      formValid={formValid}
      steps={addPayrollAgreementSteps}
      onNextStep={handleNextStep}
      onPreviousStep={handlePreviousStep}
      setIsCurrentFormValid={setIsCurrentFormValid}
      sourcesOfIncomeValues={sourcesOfIncomeValues ?? []}
      setSourcesOfIncomeValues={
        setSourcesOfIncomeValues as React.Dispatch<
          React.SetStateAction<IServerDomain[]>
        >
      }
      showDecision={showDecision}
      onOpenModal={handleOpenModal}
      smallScreen={smallScreen}
      setExtraordinaryPayment={setExtraordinaryPayment}
      extraordinaryPayment={extraordinaryPayment}
      typeRegularPayroll={typeRegularPayroll}
      regularPaymentCycles={regularPaymentCycles as IOrdinaryCyclesEntry[]}
      setRegularPaymentCycles={
        setRegularPaymentCycles as React.Dispatch<
          React.SetStateAction<IOrdinaryCyclesEntry[]>
        >
      }
      setRegularDeleted={setRegularDeleted}
      isCurrentFormValid={formValid}
      showModal={showModal}
      onToggleModal={handleToggleModal}
      onCloseRequestStatus={handleCloseRequestStatus}
      onClosePendingRequestModal={handleClosePendingRequestModal}
      showPendingRequestModal={showPendingRequestModal}
      showRequestProcessModal={showRequestProcessModal}
      requestSteps={requestSteps}
      savePayrollAgreement={savePayrollAgreement as ISaveDataResponse}
      loading={loadingSendData}
      onFinishForm={handleSubmitClick}
      setCurrentStep={setCurrentStep}
      setIncludeExtraPayDay={setIncludeExtraPayDay}
      includeExtraPayDay={includeExtraPayDay}
      onCloseProcess={handleCloseProcess}
      modalData={modalData}
    />
  );
};

export { AddPayrollAgreement };
