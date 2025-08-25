import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { postSaveRequest } from "@services/requestInProgress/postSaveRequest";
import { postAddGeneralPolicies } from "@services/generalPolicies/postAddGeneralPolicies";
import { patchEditGeneralPolicies } from "@services/generalPolicies/patchEditGeneralPolicies";
import { EUseCase } from "@enum/useCase";
import { flowAutomaticMessages } from "@config/generalCreditPolicies/generic/flowAutomaticMessages";
import { interventionHumanMessage } from "@config/generalCreditPolicies/generic/interventionHumanMessage";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IUseSaveGeneralPolicies } from "@ptypes/hooks/generalCreditPolicies/IUseSaveGeneralPolicies";
import { IRequestGeneralPol } from "@ptypes/generalCredPolicies/IRequestGeneralPol";
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
  const [networkError, setNetworkError] = useState<string>("");

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
      navigate(navigatePage);
      addFlag({
        title: flowAutomaticMessages().errorSendingData.title,
        description: flowAutomaticMessages().errorSendingData.description,
        appearance: flowAutomaticMessages().errorSendingData
          .appearance as IFlagAppearance,
        duration: flowAutomaticMessages().errorSendingData.duration,
      });
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
      setNetworkError(String(error));
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

  const isRequestStatusModal =
    showPendingReqModal && saveGeneralPolicies?.requestNumber ? true : false;

  return {
    saveGeneralPolicies,
    requestSteps,
    showPendingReqModal,
    loadingSendData,
    isRequestStatusModal,
    handleCloseProcess,
    handleCloseRequestStatus,
    handleClosePendingReqModal,
  };
};

export { useSaveGeneralPolicies };
