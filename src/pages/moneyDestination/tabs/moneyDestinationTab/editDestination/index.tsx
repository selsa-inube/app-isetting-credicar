import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEditDestination } from "@hooks/moneyDestination/edit/useEditDestination";
import { useSaveMoneyDestination } from "@hooks/moneyDestination/useSaveMoneyDestination";
import { useModalEditDestination } from "@hooks/moneyDestination/edit/useModalEditDestination";
import { EUseCase } from "@enum/useCase";
import { editDestinationTabsConfig } from "@config/moneyDestination/editDestination/tabs";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { EditDestinationUI } from "./interface";

const EditDestination = () => {
  const location = useLocation();
  const { data } = location.state ?? {};
  const { appData } = useContext(AuthAndPortalData);

  const {
    formValues,
    initialGeneralInfData,
    generalInformationRef,
    isSelected,
    saveData,
    showRequestProcessModal,
    smallScreen,
    showGeneralInformation,
    showModal,
    showGoBackModal,
    creditLineValues,
    loading,
    hasErrorRule,
    descriptionError,
    handleToggleErrorRuleModal,
    setCreditLineValues,
    handleOpenModal,
    handleCloseGoBackModal,
    handleEditedModal,
    handleGoBack,
    handleToggleEditedModal,
    handleReset,
    setIsCurrentFormValid,
    handleTabChange,
    setShowRequestProcessModal,
    setShowModal,
  } = useEditDestination({ data, appData });

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
    useCase: EUseCase.EDIT,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
  });

  const { modalData, showDecision } = useModalEditDestination({
    showGoBackModal,
    loading: loadingSendData,
    hasError,
    hasErrorRule,
    errorData,
    networkError,
    errorFetchRequest,
    showEditedModal: showModal,
    descriptionError,
    handleCloseGoBackModal,
    handleEditedModal,
    handleGoBack,
    handleToggleErrorModal,
    handleToggleErrorRuleModal,
    handleToggleEditedModal,
  });

  const showRequestStatus =
    showPendingReqModal && saveMoneyDestination?.requestNumber;

  const editDestinationTabs = Object.values(editDestinationTabsConfig);

  return (
    <EditDestinationUI
      editDestinationTabsConfig={editDestinationTabs}
      isSelected={isSelected}
      onTabChange={handleTabChange}
      generalInformationRef={generalInformationRef}
      initialGeneralInformationValues={formValues}
      onReset={handleReset}
      setIsCurrentFormValid={setIsCurrentFormValid}
      saveMoneyDestination={saveMoneyDestination as ISaveDataResponse}
      requestSteps={requestSteps}
      showRequestProcessModal={showRequestProcessModal}
      onCloseRequestStatus={handleCloseRequestStatus}
      onClosePendingReqModal={handleClosePendingReqModal}
      initialGeneralInfData={initialGeneralInfData}
      smallScreen={smallScreen}
      showGeneralInformation={showGeneralInformation}
      showRequestStatus={showRequestStatus}
      onCloseProcess={handleCloseProcess}
      modalData={modalData}
      showDecision={showDecision}
      onOpenModal={handleOpenModal}
      onToggleEditedModal={handleToggleEditedModal}
      creditLineValues={creditLineValues}
      setCreditLineValues={setCreditLineValues}
      loading={loading}
    />
  );
};

export { EditDestination };
