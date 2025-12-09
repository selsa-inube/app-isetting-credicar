import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { postSaveRequest } from "@services/requestInProgress/postSaveRequest";
import { patchEditMoneyDestination } from "@services/moneyDestination/patchEditMoneyDestination";
import { deleteMoneyDestination } from "@services/moneyDestination/deleteMoneyDestination";
import { postAddMoneyDestination } from "@services/moneyDestination/postAddMoneyDestination";
import { errorObject } from "@utils/errorObject";
import { EUseCase } from "@enum/useCase";
import { ERequestStepsStatus } from "@enum/requestStepsStatus";
import { statusFlowAutomatic } from "@config/status/statusFlowAutomatic";
import { flowAutomaticMessages } from "@config/moneyDestination/moneyDestinationTab/generics/flowAutomaticMessages";
import { interventionHumanMessage } from "@config/moneyDestination/moneyDestinationTab/generics/interventionHumanMessage";
import { statusCloseModal } from "@config/status/statusCloseModal";
import { operationTypes } from "@config/useCase";
import { requestStepsInitial } from "@config/requestSteps";
import { requestStepsNames } from "@config/requestStepsNames";
import { statusRequestFinished } from "@config/status/statusRequestFinished";
import { IRequestMoneyDestination } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IRequestMoneyDestination";
import { IUseSaveMoneyDestination } from "@ptypes/hooks/moneyDestination/IUseSaveMoneyDestination";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IErrors } from "@ptypes/IErrors";

const useSaveMoneyDestination = (props: IUseSaveMoneyDestination) => {
  const {
    useCase,
    businessUnits,
    userAccount,
    sendData,
    data,
    setSendData,
    setShowModal,
    setEntryDeleted,
  } = props;
  const [saveMoneyDestination, setSaveMoneyDestination] =
    useState<ISaveDataResponse>();
  const [statusRequest, setStatusRequest] = useState<string>();
  const { addFlag } = useFlag();
  const [requestSteps, setRequestSteps] =
    useState<IRequestSteps[]>(requestStepsInitial);
  const [showPendingReqModal, setShowPendingReqModal] = useState(false);
  const [loadingSendData, setLoadingSendData] = useState(false);
  const [errorFetchRequest, setErrorFetchRequest] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [hasError, setHasError] = useState(false);
  const [networkError, setNetworkError] = useState<IErrors>({} as IErrors);

  const { setChangeTab } = useContext(ChangeToRequestTab);

  const navigate = useNavigate();
  const navigatePage = "/money-destination";

  const fetchSaveMoneyDestinationData = async () => {
    setLoadingSendData(true);
    try {
      const saveData = await postSaveRequest(userAccount, data);
      setSaveMoneyDestination(saveData);
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

  const isStatusIntAutomatic = (status: string | undefined): boolean => {
    return status ? statusFlowAutomatic.includes(status) : false;
  };

  const requestConfiguration = {
    ...data?.configurationRequestData,
    settingRequest: {
      requestNumber: saveMoneyDestination?.requestNumber,
      settingRequestId: saveMoneyDestination?.settingRequestId,
    },
  };

  const fetchRequestData = async () => {
    try {
      if (useCase === EUseCase.ADD) {
        const newData = await postAddMoneyDestination(
          businessUnits,
          requestConfiguration as IRequestMoneyDestination,
        );
        setStatusRequest(newData.settingRequest?.requestStatus);
      }
      if (useCase === EUseCase.EDIT) {
        const newData = await patchEditMoneyDestination(
          businessUnits,
          requestConfiguration as IRequestMoneyDestination,
        );

        setStatusRequest(newData.settingRequest?.requestStatus);
      }
      if (useCase === EUseCase.DELETE) {
        const newData = await deleteMoneyDestination(
          businessUnits,
          requestConfiguration as IRequestMoneyDestination,
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

  const updateRequestSteps = (
    steps: IRequestSteps[],
    stepName: string,
    newStatus: ERequestStepsStatus,
  ): IRequestSteps[] => {
    return steps.map((step) => {
      if (step.name === stepName) {
        return {
          ...step,
          status: newStatus,
        };
      }
      return step;
    });
  };

  const isStatusCloseModal = (): boolean => {
    return statusRequest ? statusCloseModal.includes(statusRequest) : false;
  };

  const isStatusRequestFinished = (): boolean => {
    return statusRequest
      ? statusRequestFinished.includes(statusRequest)
      : false;
  };

  const changeRequestSteps = () => {
    setTimeout(() => {
      if (errorFetchRequest) {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsNames.requestFilled,
            ERequestStepsStatus.ERROR,
          ),
        );
        setTimeout(() => {
          setSendData(false);
          setHasError(true);
          setChangeTab(true);
        }, 1500);
      } else {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsNames.requestFilled,
            ERequestStepsStatus.COMPLETED,
          ),
        );
      }
    }, 1500);
    setTimeout(() => {
      if (isStatusIntAutomatic(statusRequest)) {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsNames.adding,
            ERequestStepsStatus.COMPLETED,
          ),
        );
      }

      if (isStatusRequestFinished()) {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsNames.adding,
            ERequestStepsStatus.COMPLETED,
          ),
        );
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsNames.requestAdded,
            ERequestStepsStatus.COMPLETED,
          ),
        );
      }

      if (isStatusCloseModal()) {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsNames.adding,
            ERequestStepsStatus.ERROR,
          ),
        );
      }
    }, 2000);
  };

  useEffect(() => {
    if (!networkError?.code?.length) {
      return;
    }
    setRequestSteps((prev) =>
      updateRequestSteps(
        prev,
        requestStepsNames.requestFilled,
        ERequestStepsStatus.COMPLETED,
      ),
    );

    const timeout1 = setTimeout(() => {
      setRequestSteps((prev) =>
        updateRequestSteps(
          prev,
          requestStepsNames.adding,
          ERequestStepsStatus.ERROR,
        ),
      );
    }, 1000);

    const timeout2 = setTimeout(() => {
      setSendData(false);
      setHasError(true);
    }, 3000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [networkError]);

  const handleStatusChange = () => {
    if (isStatusIntAutomatic(saveMoneyDestination?.requestStatus)) {
      if (isStatusCloseModal()) {
        setChangeTab(true);
        setHasError(true);
      }

      if (isStatusRequestFinished()) {
        addFlag({
          title: flowAutomaticMessages(operationTypes[useCase])
            .successfulCreateRequest.title,
          description: flowAutomaticMessages(operationTypes[useCase])
            .successfulCreateRequest.description,
          appearance: flowAutomaticMessages(operationTypes[useCase])
            .successfulCreateRequest.appearance as IFlagAppearance,
          duration: flowAutomaticMessages(operationTypes[useCase])
            .successfulCreateRequest.duration,
        });
      }
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
    if (
      setEntryDeleted &&
      statusRequest &&
      statusRequestFinished.includes(statusRequest)
    ) {
      setTimeout(() => {
        setEntryDeleted(
          data.configurationRequestData.moneyDestinationId as string,
        );
      }, 3000);
    }
  };

  useEffect(() => {
    if (!sendData) return;
    fetchSaveMoneyDestinationData();
  }, [sendData]);

  useEffect(() => {
    if (isStatusIntAutomatic(saveMoneyDestination?.requestStatus)) {
      fetchRequestData();
    }
  }, [saveMoneyDestination]);

  useEffect(() => {
    changeRequestSteps();
  }, [statusRequest]);

  const handleCloseRequestStatus = () => {
    setChangeTab(true);
    setSendData(false);
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

  const handleClosePendingReqModal = () => {
    setChangeTab(true);
    setShowPendingReqModal(false);
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

  return {
    saveMoneyDestination,
    requestSteps,
    showPendingReqModal,
    loadingSendData,
    errorData,
    hasError,
    networkError,
    errorFetchRequest,
    handleToggleErrorModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingReqModal,
  };
};

export { useSaveMoneyDestination };
