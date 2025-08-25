import { useContext } from "react";
import { useAddPayrollAgreement } from "@hooks/payrollAgreement/useAddPayrollAgreement";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useSavePayrollAgreement } from "@hooks/payrollAgreement/useSavePayrollAgreement";
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
    showPendingReqModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingReqModal,
  } = useSavePayrollAgreement({
    useCase: EUseCase.ADD,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
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
      onGoBack={handleGoBack}
      showGoBackModal={showGoBackModal}
      onOpenModal={handleOpenModal}
      onCloseModal={handleCloseModal}
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
      onClosePendingReqModal={handleClosePendingReqModal}
      showPendingReqModal={showPendingReqModal}
      showRequestProcessModal={showRequestProcessModal}
      requestSteps={requestSteps}
      savePayrollAgreement={savePayrollAgreement as ISaveDataResponse}
      loading={loadingSendData}
      onFinishForm={handleSubmitClick}
      setCurrentStep={setCurrentStep}
      setIncludeExtraPayDay={setIncludeExtraPayDay}
      includeExtraPayDay={includeExtraPayDay}
      onCloseProcess={handleCloseProcess}
    />
  );
};

export { AddPayrollAgreement };
