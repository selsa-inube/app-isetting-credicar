import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEditDestination } from "@hooks/moneyDestination/edit/useEditDestination";
import { useSaveMoneyDestination } from "@hooks/moneyDestination/useSaveMoneyDestination";
import { useDataDestination } from "@hooks/moneyDestination/useDataDestination";
import { useModalEditDestination } from "@hooks/moneyDestination/edit/useModalEditDestination";
import { EUseCase } from "@enum/useCase";
import { EManagementType } from "@enum/managementType";
import { editDestinationTabsConfig } from "@config/moneyDestination/editDestination/tabs";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { IEditData } from "@ptypes/hooks/moneyDestination/IEditData";
import { EditDestinationUI } from "./interface";

const EditDestination = () => {
  const { id, option, requestNumber } = useParams();
  const location = useLocation();
  const { data: moneyDestinationData } = location.state ?? {};
  const { appData } = useContext(AuthAndPortalData);

  const { transformedMoneyDestination: data, loading } = useDataDestination({
    moneyDestinationData,
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
    loadingEnum,
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
  } = useEditDestination({ data: data as IEditData, appData, loading, option });

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
    optionRequest: option === EManagementType.IN_PROGRESS,
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
      loadingEnum={loadingEnum}
      setValuesLine={setValuesLine}
    />
  );
};

export { EditDestination };
