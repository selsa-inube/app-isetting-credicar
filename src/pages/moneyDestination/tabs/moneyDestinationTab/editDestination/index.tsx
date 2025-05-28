import { useContext } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { useLocation } from "react-router-dom";
import { useEditDestination } from "@hooks/moneyDestination/useEditDestination";
import { editDestinationTabsConfig } from "@config/moneyDestination/editDestination/tabs";
import { useSaveMoneyDestination } from "@hooks/moneyDestination/useSaveMoneyDestination";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { UseCase } from "@enum/useCase";
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
    onSubmit,
    handleReset,
    setCreditLineDecisions,
    setIsCurrentFormValid,
    handleTabChange,
    setShowRequestProcessModal,
    setShowModal,
  } = useEditDestination(
    data ?? {
      id: "",
      nameDestination: "",
      description: "",
      icon: "",
    },
    appData,
  );

  const {
    saveMoneyDestination,
    requestSteps,
    loadingSendData,
    showPendingReqModal,
    handleCloseRequestStatus,
    handleClosePendingReqModal,
  } = useSaveMoneyDestination(
    UseCase.EDIT,
    appData.businessUnit.publicCode,
    appData.user.userAccount,
    showRequestProcessModal,
    saveData as ISaveDataRequest,
    setShowRequestProcessModal,
    setShowModal,
  );

  return (
    <EditDestinationUI
      creditLineDecisions={creditLineDecisions}
      editDestinationTabsConfig={editDestinationTabsConfig}
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
      showPendingReqModal={showPendingReqModal}
      showRequestProcessModal={showRequestProcessModal}
      onCloseRequestStatus={handleCloseRequestStatus}
      onClosePendingReqModal={handleClosePendingReqModal}
      initialGeneralInfData={initialGeneralInfData}
      normalizeEvaluateRuleData={normalizeEvaluateRuleData as IRuleDecision[]}
      smallScreen={smallScreen}
    />
  );
};

export { EditDestination };
