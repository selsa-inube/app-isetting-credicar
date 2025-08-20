import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEditPayrollAgreement } from "@hooks/payrollAgreement/edit/useEditPayrollAgreement";
import { useSavePayrollAgreement } from "@hooks/payrollAgreement/useSavePayrollAgreement";
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
    title,
    description,
    actionText,
    moreDetails,
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
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingReqModal,
  } = useSavePayrollAgreement({
    useCase: EUseCase.EDIT,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
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
      onClosePendingReqModal={handleClosePendingReqModal}
      onGoBack={handleGoBack}
      onCloseGoBackModal={handleCloseGoBackModal}
      showEditedModal={showModal}
      onToggleEditedModal={handleToggleEditedModal}
      onEditedModal={handleEditedModal}
      showGoBackModal={showGoBackModal}
      loadingSendData={loadingSendData}
      typeRegularPayroll={typeRegularPayroll}
      regularPaymentCycles={regularPaymentCycles}
      extraordinaryPayment={extraordinaryPayment}
      setExtraordinaryPayment={setExtraordinaryPayment}
      setRegularPaymentCycles={setRegularPaymentCycles}
      showDeletedAlertModal={showDeletedAlertModal}
      onToggleDeletedAlertModal={handleToggleDeletedAlertModal}
      showGeneralInfPayrollForm={showGeneralInfPayrollForm}
      showRegularPaymentCyclesForm={showRegularPaymentCyclesForm}
      showExtraPaymentCyclesForm={showExtraPaymentCyclesForm}
      showRequestStatus={showRequestStatus}
      filteredTabs={filteredTabs}
      title={title}
      description={description}
      actionText={actionText}
      moreDetails={moreDetails}
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
    />
  );
};

export { EditPayrollAgreement };
