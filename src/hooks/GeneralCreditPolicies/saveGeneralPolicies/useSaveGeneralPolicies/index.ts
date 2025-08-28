import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { postSaveRequest } from "@services/requestInProgress/postSaveRequest";
import { postAddGeneralPolicies } from "@services/generalPolicies/postAddGeneralPolicies";
import { patchEditGeneralPolicies } from "@services/generalPolicies/patchEditGeneralPolicies";
import { EUseCase } from "@enum/useCase";
import { errorObject } from "@utils/errorObject";
import { interventionHumanMessage } from "@config/generalCreditPolicies/generic/interventionHumanMessage";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IUseSaveGeneralPolicies } from "@ptypes/hooks/generalCreditPolicies/IUseSaveGeneralPolicies";
import { IRequestGeneralPol } from "@ptypes/generalCredPolicies/IRequestGeneralPol";
import { IErrors } from "@ptypes/IErrors";
import { useRequest } from "../useRequest";

const useSaveGeneralPolicies = (props: IUseSaveGeneralPolicies) => {
  const {
    businessUnits,
    userAccount,
    data,
    setSendData,
    sendData,
    setShowModal,
    useCase,
  } = props;

  const [saveGeneralPolicies, setSaveGeneralPolicies] =
    useState<ISaveDataResponse>();
  const [statusRequest, setStatusRequest] = useState<string>();
  const { addFlag } = useFlag();
  const [showPendingReqModal, setShowPendingReqModal] = useState(false);
  const [loadingSendData, setLoadingSendData] = useState(false);
  const [errorFetchRequest, setErrorFetchRequest] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [hasError, setHasError] = useState(false);
  const [networkError, setNetworkError] = useState<IErrors>({} as IErrors);
  const { setChangeTab } = useContext(ChangeToRequestTab);

  const navigate = useNavigate();
  const navigatePage = "/";

  const fetchSaveGeneralData = async () => {
    setLoadingSendData(true);
    try {
      const saveData = await postSaveRequest(userAccount, data);
      setSaveGeneralPolicies(saveData);
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
    saveGeneralPolicies: saveGeneralPolicies as ISaveDataResponse,
    errorFetchRequest,
    networkError,
    setHasError,
  });

  const requestConfiguration = {
    ...data?.configurationRequestData,
    settingRequest: {
      requestNumber: saveGeneralPolicies?.requestNumber,
      settingRequestId: saveGeneralPolicies?.settingRequestId,
    },
  };

  const fetchRequestData = async () => {
    try {
      if (useCase === EUseCase.ADD) {
        const newData = await postAddGeneralPolicies(
          businessUnits,
          userAccount,
          requestConfiguration as IRequestGeneralPol,
        );
        setStatusRequest(newData.settingRequest?.requestStatus);
      }
      if (useCase === EUseCase.EDIT) {
        const newData = await patchEditGeneralPolicies(
          businessUnits,
          userAccount,
          requestConfiguration as IRequestGeneralPol,
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
    if (isStatusInAutomatic(saveGeneralPolicies?.requestStatus)) {
      fetchRequestData();
    }
  }, [saveGeneralPolicies]);

  useEffect(() => {
    changeRequestSteps();
  }, [statusRequest]);

  const handleCloseRequestStatus = () => {
    setSendData(false);
    setChangeTab(true);
    navigate(navigatePage);
    addFlag({
      title: interventionHumanMessage.SuccessfulCreateRequestIntHuman.title,
      description:
        interventionHumanMessage.SuccessfulCreateRequestIntHuman.description,
      appearance: interventionHumanMessage.SuccessfulCreateRequestIntHuman
        .appearance as IFlagAppearance,
      duration:
        interventionHumanMessage.SuccessfulCreateRequestIntHuman.duration,
    });
  };

  const handleClosePendingReqModal = () => {
    setShowPendingReqModal(false);
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

  const isRequestStatusModal =
    showPendingReqModal && saveGeneralPolicies?.requestNumber ? true : false;

  return {
    saveGeneralPolicies,
    requestSteps,
    showPendingReqModal,
    loadingSendData,
    isRequestStatusModal,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleToggleErrorModal,
    handleCloseProcess,
    handleCloseRequestStatus,
    handleClosePendingReqModal,
  };
};

export { useSaveGeneralPolicies };
