import { useContext } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { useLocation } from "react-router-dom";
import { useEditDestination } from "@hooks/moneyDestination/useEditDestination";
import { useSaveMoneyDestination } from "@hooks/moneyDestination/useSaveMoneyDestination";
import { EUseCase } from "@enum/useCase";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { editDestinationTabsConfig } from "@config/moneyDestination/editDestination/tabs";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { EditDestinationUI } from "./interface";

const EditDestination = () => {
  const location = useLocation();
  const { data } = location.state ?? {};
  const { appData } = useContext(AuthAndPortalData);

  const {
    creditLineDecisions,
    normalizeEvaluateRuleData,
    formValues,
    initialGeneralInfData,
    generalInformationRef,
    isSelected,
    saveData,
    showRequestProcessModal,
    smallScreen,
    showGeneralInformation,
    showDecisionsForm,
    onSubmit,
    handleReset,
    setCreditLineDecisions,
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
    setShowModal: setShowModal,
  });

  const showRequestStatus =
    showPendingReqModal && saveMoneyDestination?.requestNumber;

  const editDestinationTabs = Object.values(editDestinationTabsConfig);

  return (
    <EditDestinationUI
      creditLineDecisions={creditLineDecisions}
      editDestinationTabsConfig={editDestinationTabs}
      isSelected={isSelected}
      onTabChange={handleTabChange}
      generalInformationRef={generalInformationRef}
      initialGeneralInformationValues={formValues}
      onButtonClick={onSubmit}
      onReset={handleReset}
      setCreditLineDecisions={setCreditLineDecisions}
      setIsCurrentFormValid={setIsCurrentFormValid}
      saveMoneyDestination={saveMoneyDestination as ISaveDataResponse}
      requestSteps={requestSteps}
      loading={loadingSendData}
      showRequestProcessModal={showRequestProcessModal}
      onCloseRequestStatus={handleCloseRequestStatus}
      onClosePendingReqModal={handleClosePendingReqModal}
      initialGeneralInfData={initialGeneralInfData}
      normalizeEvaluateRuleData={normalizeEvaluateRuleData as IRuleDecision[]}
      smallScreen={smallScreen}
      showGeneralInformation={showGeneralInformation}
      showDecisionsForm={showDecisionsForm}
      showRequestStatus={showRequestStatus}
      onCloseProcess={handleCloseProcess}
    />
  );
};

export { EditDestination };
