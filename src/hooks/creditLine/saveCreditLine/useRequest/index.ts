import { useContext, useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { ERequestStepsStatus } from "@enum/requestStepsStatus";
import { statusCloseModal } from "@config/status/statusCloseModal";
import { statusRequestFinished } from "@config/status/statusRequestFinished";
import { operationTypes } from "@config/useCase";
import { statusFlowAutomatic } from "@config/status/statusFlowAutomatic";
import { flowAutomaticMessagesDecision } from "@config/creditLines/generic/flowAutomaticMessages";
import { requestStepsNames } from "@config/requestStepsNames";
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
    setHasError,
  } = props;

  const { addFlag } = useFlag();
  const [requestSteps, setRequestSteps] =
    useState<IRequestSteps[]>(requestStepsInitial);
  const { setChangeTab } = useContext(ChangeToRequestTab);
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
    if (isStatusInAutomatic(saveGeneralPolicies?.requestStatus)) {
      if (isStatusCloseModal()) {
        setChangeTab(true);
        setHasError(true);
      }

      if (isStatusRequestFinished()) {
        addFlag({
          title: flowAutomaticMessagesDecision(operationTypes[useCase])
            .successfulCreateRequest.title,
          description: flowAutomaticMessagesDecision(operationTypes[useCase])
            .successfulCreateRequest.description,
          appearance: flowAutomaticMessagesDecision(operationTypes[useCase])
            .successfulCreateRequest.appearance as IFlagAppearance,
          duration: flowAutomaticMessagesDecision(operationTypes[useCase])
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
