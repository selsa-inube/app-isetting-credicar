import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";
import { statusFlowAutomatic } from "@config/status/statusFlowAutomatic";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { flowAutomaticMessages } from "@config/moneyDestination/moneyDestinationTab/generics/flowAutomaticMessages";
import { interventionHumanMessage } from "@config/moneyDestination/moneyDestinationTab/generics/interventionHumanMessage";
import { statusCloseModal } from "@config/status/statusCloseModal";
import { statusRequestFinished } from "@config/status/statusRequestFinished";
import { postAddMoneyDestination } from "@services/moneyDestination/postAddMoneyDestination";
import { IRequestMoneyDestination } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IRequestMoneyDestination";
import { patchEditMoneyDestination } from "@services/moneyDestination/patchEditMoneyDestination";
import { deleteMoneyDestination } from "@services/moneyDestination/deleteMoneyDestination";
import { IUseSaveMoneyDestination } from "@ptypes/hooks/moneyDestination/IUseSaveMoneyDestination";
import { UseCase } from "@enum/useCase";
import { operationTypes } from "@config/useCase";
import { RequestStepsStatus } from "@enum/requestStepsStatus";
import { postSaveRequest } from "@services/requestInProgress/postSaveRequest";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { requestStepsInitial } from "@config/requestSteps";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";

const useSaveMoneyDestination = (props: IUseSaveMoneyDestination) => {
  const {
    useCase,
    bussinesUnits,
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

  const { setChangeTab } = useContext(ChangeToRequestTab);

  const navigate = useNavigate();
  const navigatePage = "/money-destination";

  const fetchSaveMoneyDestinationData = async () => {
    setLoadingSendData(true);
    try {
      const saveData = await postSaveRequest(userAccount, data);
      setSaveMoneyDestination(saveData);
      setRequestSteps((prev) =>
        updateRequestSteps(
          prev,
          requestStepsInitial[0].name,
          RequestStepsStatus.PENDING,
        ),
      );
    } catch (error) {
      console.info(error);
      setSendData(false);
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
      if (useCase === UseCase.ADD) {
        const newData = await postAddMoneyDestination(
          bussinesUnits,
          requestConfiguration as IRequestMoneyDestination,
        );
        setStatusRequest(newData.settingRequest?.requestStatus);
      }
      if (useCase === UseCase.EDIT) {
        const newData = await patchEditMoneyDestination(
          bussinesUnits,
          requestConfiguration as IRequestMoneyDestination,
        );

        setStatusRequest(newData.settingRequest?.requestStatus);
      }
      if (useCase === UseCase.DELETE) {
        const newData = await deleteMoneyDestination(
          bussinesUnits,
          requestConfiguration as IRequestMoneyDestination,
        );

        setStatusRequest(newData.settingRequest?.requestStatus);
        setTimeout(() => {
          if (
            setEntryDeleted &&
            newData?.settingRequest?.requestStatus &&
            statusRequestFinished.includes(
              newData?.settingRequest?.requestStatus,
            )
          ) {
            setEntryDeleted(
              data.configurationRequestData.moneyDestinationId as string,
            );
          }
        }, 3000);
      }
    } catch (error) {
      console.info(error);
      setErrorFetchRequest(true);
      setSendData(false);
      addFlag({
        title: flowAutomaticMessages().errorQueryingData.title,
        description: flowAutomaticMessages().errorQueryingData.description,
        appearance: flowAutomaticMessages().errorQueryingData
          .appearance as IFlagAppearance,
        duration: flowAutomaticMessages().errorQueryingData.duration,
      });
      setShowModal(false);
    }
  };

  const updateRequestSteps = (
    steps: IRequestSteps[],
    stepName: string,
    newStatus: "pending" | "completed" | "error",
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
            requestStepsInitial[0].name,
            RequestStepsStatus.ERROR,
          ),
        );
        setSendData(false);
      } else {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsInitial[0].name,
            RequestStepsStatus.COMPLETED,
          ),
        );
      }
    }, 1000);
    setTimeout(() => {
      if (isStatusIntAutomatic(statusRequest)) {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsInitial[1].name,
            RequestStepsStatus.COMPLETED,
          ),
        );
      }

      if (isStatusRequestFinished()) {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsInitial[1].name,
            RequestStepsStatus.COMPLETED,
          ),
        );
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsInitial[2].name,
            RequestStepsStatus.COMPLETED,
          ),
        );
      }

      if (isStatusCloseModal()) {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsInitial[1].name,
            RequestStepsStatus.ERROR,
          ),
        );
      }
    }, 2000);
  };

  const handleStatusChange = () => {
    if (isStatusIntAutomatic(saveMoneyDestination?.requestStatus)) {
      if (isStatusCloseModal()) {
        setChangeTab(true);
        navigate(navigatePage);
        addFlag({
          title: flowAutomaticMessages().errorCreateRequest.title,
          description: flowAutomaticMessages().errorCreateRequest.description,
          appearance: flowAutomaticMessages().errorCreateRequest
            .appearance as IFlagAppearance,
          duration: flowAutomaticMessages().errorCreateRequest.duration,
        });
      }

      if (isStatusRequestFinished()) {
        if (useCase !== UseCase.DELETE) {
          navigate(navigatePage);
        }
        addFlag({
          title: flowAutomaticMessages(operationTypes[useCase])
            .SuccessfulCreateRequest.title,
          description: flowAutomaticMessages(operationTypes[useCase])
            .SuccessfulCreateRequest.description,
          appearance: flowAutomaticMessages(operationTypes[useCase])
            .SuccessfulCreateRequest.appearance as IFlagAppearance,
          duration: flowAutomaticMessages(operationTypes[useCase])
            .SuccessfulCreateRequest.duration,
        });
      }
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

    if (isStatusCloseModal() || isStatusRequestFinished()) {
      setTimeout(() => {
        handleStatusChange();
        setSendData(false);
      }, 3000);
    }
  }, [statusRequest]);

  const handleCloseRequestStatus = () => {
    setChangeTab(true);
    setSendData(false);
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
    setChangeTab(true);
    setShowPendingReqModal(false);
    navigate(navigatePage);
  };

  return {
    saveMoneyDestination,
    requestSteps,
    showPendingReqModal,
    loadingSendData,
    handleCloseRequestStatus,
    handleClosePendingReqModal,
  };
};

export { useSaveMoneyDestination };
