import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { ERequestStepsStatus } from "@enum/requestStepsStatus";
import { statusCloseModal } from "@config/status/statusCloseModal";
import { statusRequestFinished } from "@config/status/statusRequestFinished";
import { operationTypes } from "@config/useCase";
import { statusFlowAutomatic } from "@config/status/statusFlowAutomatic";
import { requestStepsNames } from "@config/requestStepsNames";
import { flowAutomaticMessages } from "@config/generalCreditPolicies/generic/flowAutomaticMessages";
import { requestStepsInitial } from "@config/requestSteps";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IUseRequest } from "@ptypes/hooks/IUseRequest";

const useRequest = (props: IUseRequest) => {
  const {
    setSendData,
    useCase,
    statusRequest,
    errorFetchRequest,
    saveGeneralPolicies,
    networkError,
  } = props;

  const { addFlag } = useFlag();
  const [requestSteps, setRequestSteps] =
    useState<IRequestSteps[]>(requestStepsInitial);
  const { setChangeTab } = useContext(ChangeToRequestTab);

  const navigate = useNavigate();
  const navigatePage = "/";
  const isStatusInAutomatic = (status: string | undefined): boolean => {
    return status ? statusFlowAutomatic.includes(status) : false;
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
        setSendData(false);
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
      if (isStatusInAutomatic(statusRequest)) {
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
    if (networkError.length > 0) {
      setRequestSteps((prev) =>
        updateRequestSteps(
          prev,
          requestStepsNames.adding,
          ERequestStepsStatus.ERROR,
        ),
      );
      setTimeout(() => {
        setSendData(false);
        navigate(navigatePage);
        addFlag({
          title: flowAutomaticMessages().errorQueryingData.title,
          description: networkError,
          appearance: flowAutomaticMessages().errorQueryingData
            .appearance as IFlagAppearance,
          duration: flowAutomaticMessages().errorQueryingData.duration,
        });
      }, 3000);
    }
  }, [networkError]);

  const handleStatusChange = () => {
    if (isStatusInAutomatic(saveGeneralPolicies?.requestStatus)) {
      if (isStatusCloseModal()) {
        setChangeTab(true);
        addFlag({
          title: flowAutomaticMessages().errorCreateRequest.title,
          description: flowAutomaticMessages().errorCreateRequest.description,
          appearance: flowAutomaticMessages().errorCreateRequest
            .appearance as IFlagAppearance,
          duration: flowAutomaticMessages().errorCreateRequest.duration,
        });
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

  return {
    requestSteps,
    changeRequestSteps,
    handleStatusChange,
    isStatusInAutomatic,
    isStatusCloseModal,
    isStatusRequestFinished,
  };
};

export { useRequest };
