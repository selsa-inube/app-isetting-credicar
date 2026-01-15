import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEditPayrollAgreement } from "@hooks/payrollAgreement/edit/useEditPayrollAgreement";
import { useModalEditPayroll } from "@hooks/payrollAgreement/edit/useModalEditPayroll";
import { useSavePayrollAgreement } from "@hooks/payrollAgreement/savePayrollAgreement/useSavePayrollAgreement";
import { EUseCase } from "@enum/useCase";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";
import { EditPayrollAgreementUI } from "./interface";

const EditPayrollAgreement = () => {
  const location = useLocation();
  const { data } = location.state ?? {};
  const { appData } = useContext(AuthAndPortalData);

  const {
    companyAgreement,
    formValues,
    generalInformationRef,
    isSelected,
    saveData,
    typePayroll,
    showGoBackModal,
    showModal,
    showRequestProcessModal,
    smallScreen,
    sourcesOfIncomeValues,
    initialData,
    typeRegularPayroll,
    regularPaymentCycles,
    extraordinaryPayment,
    showDeletedAlertModal,
    showGeneralInfPayrollForm,
    showRegularPaymentCyclesForm,
    showExtraPaymentCyclesForm,
    filteredTabs,
    setIncludeExtraPayDay,
    setRegularDeleted,
    handleToggleDeletedAlertModal,
    setExtraordinaryPayment,
    setRegularPaymentCycles,
    handleCloseGoBackModal,
    handleEditedModal,
    handleGoBack,
    handleOpenModal,
    handleReset,
    handleTabChange,
    handleToggleEditedModal,
    setIsCurrentFormValid,
    setShowModal,
    setShowRequestProcessModal,
    setSourcesOfIncomeValues,
  } = useEditPayrollAgreement({ data });

  const {
    savePayrollAgreement,
    requestSteps,
    loadingSendData,
    showRequestStatus,
    titleRequest,
    descriptionRequest,
    actionTextRequest,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingRequestModal,
    handleToggleErrorModal,
  } = useSavePayrollAgreement({
    useCase: EUseCase.EDIT,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
    token: appData.token,
  });

  const { modalData, showDecision } = useModalEditPayroll({
    showGoBackModal,
    loading: loadingSendData,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    showEditedModal: showModal,
    loadingSendData,
    showDeletedAlertModal,
    typePayroll,
    handleToggleDeletedAlertModal,
    handleCloseGoBackModal,
    handleEditedModal,
    handleGoBack,
    handleToggleErrorModal,
    handleToggleEditedModal,
  });

  return (
    <EditPayrollAgreementUI
      formReferences={generalInformationRef}
      formValues={formValues}
      initialValues={initialData}
      setIsCurrentFormValid={setIsCurrentFormValid}
      smallScreen={smallScreen}
      sourcesOfIncomeValues={sourcesOfIncomeValues}
      setSourcesOfIncomeValues={setSourcesOfIncomeValues}
      isSelected={isSelected}
      onTabChange={handleTabChange}
      onReset={handleReset}
      handleOpenModal={handleOpenModal}
      companyAgreement={companyAgreement}
      showRequestProcessModal={showRequestProcessModal}
      savePayrollAgreement={savePayrollAgreement as ISaveDataResponse}
      requestSteps={requestSteps}
      onCloseRequestStatus={handleCloseRequestStatus}
      onClosePendingRequestModal={handleClosePendingRequestModal}
      onToggleEditedModal={handleToggleEditedModal}
      typeRegularPayroll={typeRegularPayroll}
      regularPaymentCycles={regularPaymentCycles}
      extraordinaryPayment={extraordinaryPayment}
      setExtraordinaryPayment={setExtraordinaryPayment}
      setRegularPaymentCycles={setRegularPaymentCycles}
      showGeneralInfPayrollForm={showGeneralInfPayrollForm}
      showRegularPaymentCyclesForm={showRegularPaymentCyclesForm}
      showExtraPaymentCyclesForm={showExtraPaymentCyclesForm}
      showRequestStatus={showRequestStatus}
      filteredTabs={filteredTabs}
      titleRequest={titleRequest}
      descriptionRequest={descriptionRequest}
      actionTextRequest={actionTextRequest}
      setIncludeExtraPayDay={
        setIncludeExtraPayDay as React.Dispatch<
          React.SetStateAction<IOrdinaryCyclesEntry[]>
        >
      }
      setRegularDeleted={setRegularDeleted}
      onCloseProcess={handleCloseProcess}
      modalData={modalData}
      showDecision={showDecision}
    />
  );
};

export { EditPayrollAgreement };
