import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { postSaveRequest } from "@services/requestInProgress/postSaveRequest";
import { patchModifyCreditLine } from "@services/creditLines/patchModifyCreditLine";
import { deleteCreditLineTab } from "@services/creditLines/deleteCreditLineTab";
import { postModifyRequestData } from "@services/requestInProgress/postModifyRequestData";
import { EUseCase } from "@enum/useCase";
import { ECreditLines } from "@enum/creditLines";
import { errorObject } from "@utils/errorObject";
import { modifyRequestLabels } from "@config/modifyRequestLabels";
import { editRequestMessage } from "@config/creditLines/generic/editRequestMessage";
import { interventionHumanMessage } from "@config/creditLines/generic/interventionHumanMessage";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IUseSaveCreditlinesTab } from "@ptypes/hooks/creditLines/IUseSaveCreditlinesTab";
import { IErrors } from "@ptypes/IErrors";
import { IRequestCreditLine } from "@ptypes/creditLines/IRequestCreditLine";
import { IModifyCreditLine } from "@ptypes/creditLines/IModifyCreditLine";
import { IModifyRequestData } from "@ptypes/requestInProgress/IModifyRequestData";
import { useRequest } from "../useRequest";

const useSaveCreditlinesTab = (props: IUseSaveCreditlinesTab) => {
  const {
    businessUnits,
    userAccount,
    data,
    optionRequest,
    setSendData,
    sendData,
    setShowModal,
    setEntryDeleted,
    setShowUnconfiguredModal,
    useCase,
    token,
  } = props;

  const [saveCreditLines, setSaveCreditLines] = useState<ISaveDataResponse>();
  const [statusRequest, setStatusRequest] = useState<string>();
  const { addFlag } = useFlag();
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [loadingSendData, setLoadingSendData] = useState(false);
  const [errorFetchRequest, setErrorFetchRequest] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [hasError, setHasError] = useState(false);

  const [networkError, setNetworkError] = useState<IErrors>({} as IErrors);
  const { setChangeTab } = useContext(ChangeToRequestTab);
  const navigate = useNavigate();
  const navigatePage = "/credit-lines";

  const fetchSavecreditLineData = async () => {
    setLoadingSendData(true);
    try {
      const saveData = await postSaveRequest(userAccount, data, token);
      if (setEntryDeleted) {
        setEntryDeleted(data.configurationRequestData.id as string);
      }
      setSaveCreditLines(saveData);
      setShowModal(false);
    } catch (error) {
      console.info(error);
      setSendData(false);
      setHasError(true);
      setErrorData(errorObject(error));
    } finally {
      setLoadingSendData(false);
    }
  };

  const modifyRequestConfig = {
    configurationRequestData: data?.configurationRequestData,
    modifyJustification: modifyRequestLabels(ECreditLines.OPTION_NAME)
      .modifyJustification,
    settingRequestId: data?.configurationRequestData.moneyDestinationId,
  };

  const fetchSaveRequestData = async () => {
    setLoadingSendData(true);
    try {
      await postModifyRequestData(
        userAccount,
        modifyRequestConfig as IModifyRequestData,
        token,
      );
      setShowModal(false);
      setChangeTab(true);
      navigate(navigatePage);
      addFlag({
        title: editRequestMessage.title,
        description: editRequestMessage.description,
        appearance: editRequestMessage.appearance as IFlagAppearance,
        duration: editRequestMessage.duration,
      });
    } catch (error) {
      console.info(error);
      setHasError(true);
      setErrorData(errorObject(error));
    } finally {
      setLoadingSendData(false);
    }
  };

  const {
    requestSteps,
    changeRequestSteps,
    handleStatusChange,
    isStatusCloseModal,
    isStatusRequestFinished,
    isStatusInAutomatic,
  } = useRequest({
    setSendData,
    useCase,
    statusRequest: statusRequest || "",
    saveGeneralPolicies: saveCreditLines as ISaveDataResponse,
    errorFetchRequest,
    networkError,
    setHasError,
  });

  const requestConfiguration = {
    ...data?.configurationRequestData,
    settingRequest: {
      requestNumber: saveCreditLines?.requestNumber,
      settingRequestId: saveCreditLines?.settingRequestId,
    },
  };

  const fetchRequestData = async () => {
    setShowUnconfiguredModal(false);
    try {
      if (useCase === EUseCase.DELETE) {
        const newData = await deleteCreditLineTab(
          userAccount,
          businessUnits,
          requestConfiguration as IRequestCreditLine,
          token,
        );
        setStatusRequest(newData.settingRequest?.requestStatus);
      }
      if (useCase === EUseCase.EDIT) {
        const newData = await patchModifyCreditLine(
          businessUnits,
          userAccount,
          requestConfiguration as IModifyCreditLine,
          token,
        );
        setStatusRequest(newData.settingRequest?.requestStatus);
      }
    } catch (error) {
      console.info(error);
      setErrorFetchRequest(true);
      setNetworkError(errorObject(error));
      setShowModal(false);
    }
  };

  const handleCloseProcess = () => {
    setSendData(false);
    if (isStatusCloseModal() || isStatusRequestFinished()) {
      handleStatusChange();
    }
    if (useCase !== EUseCase.DELETE) {
      setTimeout(() => {
        navigate(navigatePage);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!sendData) return;

    if (optionRequest) {
      fetchSaveRequestData();
    } else {
      fetchSavecreditLineData();
    }
  }, [sendData]);

  useEffect(() => {
    if (isStatusInAutomatic(saveCreditLines?.requestStatus)) {
      fetchRequestData();
    }
  }, [saveCreditLines]);

  useEffect(() => {
    changeRequestSteps();
  }, [statusRequest]);

  const handleCloseRequestStatus = () => {
    setSendData(false);
    setChangeTab(true);
    navigate(navigatePage);
    addFlag({
      title: interventionHumanMessage.successfulCreateRequestIntHuman.title,
      description:
        interventionHumanMessage.successfulCreateRequestIntHuman.description,
      appearance: interventionHumanMessage.successfulCreateRequestIntHuman
        .appearance as IFlagAppearance,
      duration:
        interventionHumanMessage.successfulCreateRequestIntHuman.duration,
    });
  };

  const handleClosePendingModal = () => {
    setShowPendingModal(false);
    setChangeTab(true);
    navigate(navigatePage);
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
    setShowModal(false);
    if (errorFetchRequest && hasError) {
      setChangeTab(true);
    }
    if (useCase !== EUseCase.DELETE) {
      navigate(navigatePage);
    }
  };

  const showRequestStatusModal =
    showPendingModal && saveCreditLines?.requestNumber ? true : false;

  const showRequestProcess = sendData && saveCreditLines;
  const showRequestStatus =
    showPendingModal && saveCreditLines?.requestNumber ? true : false;

  return {
    saveCreditLines,
    requestSteps,
    showPendingModal,
    loadingSendData,
    showRequestStatusModal,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    showRequestProcess,
    showRequestStatus,
    handleToggleErrorModal,
    handleCloseProcess,
    handleCloseRequestStatus,
    handleClosePendingModal,
  };
};

export { useSaveCreditlinesTab };
