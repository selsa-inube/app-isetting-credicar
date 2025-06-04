import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { statusFlowAutomatic } from "@config/status/statusFlowAutomatic";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { statusCloseModal } from "@config/status/statusCloseModal";
import { statusRequestFinished } from "@config/status/statusRequestFinished";
import { UseCase } from "@enum/useCase";
import { operationTypes } from "@config/useCase";
import { RequestStepsStatus } from "@enum/requestStepsStatus";
import { postSaveRequest } from "@services/requestInProgress/postSaveRequest";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { IUseSaveGeneralPolicies } from "@ptypes/hooks/generalCreditPolicies/IUseSaveGeneralPolicies";
import { flowAutomaticMessages } from "@config/generalCreditPolicies/generic/flowAutomaticMessages";
import { interventionHumanMessage } from "@config/generalCreditPolicies/generic/interventionHumanMessage";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { requestStepsInitial } from "@config/requestSteps";

const useSaveGeneralPolicies = (props: IUseSaveGeneralPolicies) => {
  const { userAccount, data, setSendData, sendData, setShowModal, useCase } =
    props;

  const [saveGeneralPolicies, setSaveGeneralPolicies] =
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
  const navigatePage = "/general-credit-policies";

  const fetchSaveMoneyDestinationData = async () => {
    setLoadingSendData(true);
    try {
      const saveData = await postSaveRequest(userAccount, data);
      setSaveGeneralPolicies(saveData);
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
    if (isStatusIntAutomatic(saveGeneralPolicies?.requestStatus)) {
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
    if (isStatusIntAutomatic(saveGeneralPolicies?.requestStatus)) {
      setStatusRequest("");
      setErrorFetchRequest(true);
    }
  }, [saveGeneralPolicies]);

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

  const isRequestStatusModal =
    showPendingReqModal && saveGeneralPolicies?.requestNumber ? true : false;

  return {
    saveGeneralPolicies,
    requestSteps,
    showPendingReqModal,
    loadingSendData,
    isRequestStatusModal,
    handleCloseRequestStatus,
    handleClosePendingReqModal,
  };
};

export { useSaveGeneralPolicies };
