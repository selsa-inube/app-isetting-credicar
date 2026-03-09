import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEditPayrollAgreement } from "@hooks/payrollAgreement/edit/useEditPayrollAgreement";
import { useDataPayroll } from "@hooks/payrollAgreement/useDataPayroll";
import { useModalEditPayroll } from "@hooks/payrollAgreement/edit/useModalEditPayroll";
import { useSavePayrollAgreement } from "@hooks/payrollAgreement/savePayrollAgreement/useSavePayrollAgreement";
import { EUseCase } from "@enum/useCase";
import { EManagementType } from "@enum/managementType";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";
import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";
import { EditPayrollAgreementUI } from "./interface";

const EditPayrollAgreement = () => {
  const { id, option, requestNumber } = useParams();
  const location = useLocation();
  const { data: payrollData } = location.state ?? {};
  const { appData } = useContext(AuthAndPortalData);

  const {
    data,
    loading,
    hasError: hasErrorInProgress,
    errorData: errorDataInProgress,
  } = useDataPayroll({
    id,
    requestNumber,
    option,
    payrollData,
  });

  const validateOption = Boolean(option === EManagementType.IN_PROGRESS);
  const {
    companyAgreement,
    formValues,
    initialData,
    generalInformationRef,
    companyRef,
    isSelected,
    saveData,
    typePayroll,
    showGoBackModal,
    showModal,
    showRequestProcessModal,
    smallScreen,
    sourcesOfIncomeValues,
    typeRegularPayroll,
    regularPaymentCycles,
    extraordinaryPayment,
    showDeletedAlertModal,
    showGeneralInfPayrollForm,
    showCompanyPayrollForm,
    showRegularPaymentCyclesForm,
    showExtraPaymentCyclesForm,
    filteredTabs,
    defaultSelectedTab,
    setCurrentTypePayroll,
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
  } = useEditPayrollAgreement({
    data: data as IPayrollAgreementData,
    loading,
    option: validateOption,
  });

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
    optionRequest: validateOption,
    id,
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
    hasErrorInProgress,
    errorDataInProgress,
    optionInProgress: validateOption,
    request: String(requestNumber ?? ""),
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
      companyRef={companyRef}
      formValues={formValues}
      initialValues={initialData}
      setIsCurrentFormValid={setIsCurrentFormValid}
      smallScreen={smallScreen}
      sourcesOfIncomeValues={sourcesOfIncomeValues}
      setSourcesOfIncomeValues={setSourcesOfIncomeValues}
      isSelected={isSelected ?? defaultSelectedTab ?? ""}
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
      loading={loading}
      data={data}
      validateOption={validateOption}
      hasError={hasErrorInProgress}
      showCompanyPayrollForm={Boolean(showCompanyPayrollForm)}
      setCurrentTypePayroll={setCurrentTypePayroll}
    />
  );
};

export { EditPayrollAgreement };
