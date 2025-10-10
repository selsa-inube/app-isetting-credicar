import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useSaveCreditlines } from "@hooks/creditLine/saveCreditLine/useSaveCreditlines";
import { useSaveCreditlinesTab } from "@hooks/creditLine/saveCreditLineTab/useSaveCreditlines";
import { EUseCase } from "@enum/useCase";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { IUseSave } from "@ptypes/creditLines/IUseSave";

const useSave = (props: IUseSave) => {
  const {
    useCaseConfiguration,
    showRequestProcessModal,
    data,
    editData,
    setShowRequestProcessModal,
    setShowSaveModal,
    setShowModal,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const isEdit = useCaseConfiguration === EUseCase.EDIT;

  const addResult = useSaveCreditlines({
    useCase: useCaseConfiguration as EUseCase,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: data || ({} as IModifyConstructionResponse),
    setSendData: setShowRequestProcessModal,
    setShowModal: setShowSaveModal,
  });

  const editResult = useSaveCreditlinesTab({
    useCase: EUseCase.EDIT,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: editData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
  });

  if (isEdit) {
    return {
      saveCreditLines: editResult.saveCreditLines,
      requestSteps: editResult.requestSteps,
      loadingSendData: editResult.loadingSendData,
      showPendingModal: editResult.showRequestProcess,
      showRequestStatusModal: editResult.showRequestStatus,
      hasError: editResult.hasError,
      errorData: editResult.errorData,
      networkError: editResult.networkError,
      errorFetchRequest: editResult.errorFetchRequest,
      handleToggleErrorModal: editResult.handleToggleErrorModal,
      handleCloseRequestStatus: editResult.handleCloseRequestStatus,
      handleCloseProcess: editResult.handleCloseProcess,
      handleClosePendingModal: editResult.handleClosePendingModal,
    };
  }

  return {
    saveCreditLines: addResult.saveCreditLines,
    requestSteps: addResult.requestSteps,
    loadingSendData: addResult.loadingSendData,
    showPendingModal: addResult.showPendingModal,
    showRequestStatusModal: addResult.showRequestStatusModal,
    hasError: addResult.hasError,
    errorData: addResult.errorData,
    networkError: addResult.networkError,
    errorFetchRequest: addResult.errorFetchRequest,
    handleToggleErrorModal: addResult.handleToggleErrorModal,
    handleCloseRequestStatus: addResult.handleCloseRequestStatus,
    handleCloseProcess: addResult.handleCloseProcess,
    handleClosePendingModal: addResult.handleClosePendingModal,
  };
};

export { useSave };
