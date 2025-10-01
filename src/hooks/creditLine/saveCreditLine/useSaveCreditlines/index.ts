import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { patchConfirmConstruction } from "@services/requestInProgress/patchConfirmConstruction";
import { postLineUnderConstruction } from "@services/requestInProgress/postLineUnderConstruction";
import { EUseCase } from "@enum/useCase";
import { errorObject } from "@utils/errorObject";
import { interventionHumanMessage } from "@config/creditLines/generic/interventionHumanMessage";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IErrors } from "@ptypes/IErrors";
import { IUseSaveCreditlines } from "@ptypes/hooks/creditLines/IUseSaveCreditlines";
import { ILineUnderConstructionRequest } from "@ptypes/creditLines/ILineUnderConstructionRequest";
import { useRequest } from "../useRequest";

const useSaveCreditlines = (props: IUseSaveCreditlines) => {
  const {
    businessUnits,
    userAccount,
    data,
    setSendData,
    sendData,
    setShowModal,
    useCase,
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

  const fetchSaveGeneralData = async () => {
    setLoadingSendData(true);
    try {
      const saveData = await patchConfirmConstruction(userAccount, data);
      setSaveCreditLines(saveData);
    } catch (error) {
      console.info(error);
      setSendData(false);
      setHasError(true);
      setErrorData(errorObject(error));
    } finally {
      setLoadingSendData(false);
      setShowModal(false);
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
    try {
      if (useCase === EUseCase.ADD) {
        const newData = await postLineUnderConstruction(
          businessUnits,
          userAccount,
          requestConfiguration as ILineUnderConstructionRequest,
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
    fetchSaveGeneralData();
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
    if (errorFetchRequest && hasError) {
      setChangeTab(true);
    }
    if (useCase !== EUseCase.DELETE) {
      navigate(navigatePage);
    }
  };

  const showRequestStatusModal =
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
    handleToggleErrorModal,
    handleCloseProcess,
    handleCloseRequestStatus,
    handleClosePendingModal,
  };
};

export { useSaveCreditlines };
