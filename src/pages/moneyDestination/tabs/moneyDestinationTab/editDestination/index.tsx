import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEditDestination } from "@hooks/moneyDestination/edit/useEditDestination";
import { useSaveMoneyDestination } from "@hooks/moneyDestination/useSaveMoneyDestination";
import { useDataDestination } from "@hooks/moneyDestination/useDataDestination";
import { useModalEditDestination } from "@hooks/moneyDestination/edit/useModalEditDestination";
import { EUseCase } from "@enum/useCase";
import { editDestinationTabsConfig } from "@config/moneyDestination/editDestination/tabs";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { EditDestinationUI } from "./interface";

const EditDestination = () => {
  const { id, option, requestNumber } = useParams();
  const { appData } = useContext(AuthAndPortalData);

  const { transformedMoneyDestination: data, loading } = useDataDestination({
    id,
    requestNumber,
    option,
  });

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
    setValuesLine,
  } = useEditDestination({ data, appData, loading });

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
    token: appData.token,
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
      initialGeneralInfData={
        initialGeneralInfData.current as IGeneralInformationEntry
      }
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
      setValuesLine={setValuesLine}
    />
  );
};

export { EditDestination };
