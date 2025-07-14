import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { interventionHumanMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/interventionHumanMessage";
import { flowAutomaticMessages } from "@config/payrollAgreement/payrollAgreementTab/generic/flowAutomaticMessages";
import { requestStatusMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestStatusMessage";
import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre";
import { IUseSavePayrollAgreement } from "@ptypes/hooks/payrollAgreement/IUseSavePayrollAgreement";
import { statusFlowAutomatic } from "@config/status/statusFlowAutomatic";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { statusCloseModal } from "@config/status/statusCloseModal";
import { statusRequestFinished } from "@config/status/statusRequestFinished";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { postSaveRequest } from "@services/requestInProgress/postSaveRequest";
import { postAddPayrollAgre } from "@services/payrollAgreement/postAddPayrollAgre";
import { pacthEditPayrollAgre } from "@services/payrollAgreement/pacthEditPayrollAgre";
import { deletePayrollAgre } from "@services/payrollAgreement/deletePayrollAgre";
import { RequestStepsStatus } from "@enum/requestStepsStatus";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { requestStepsInitial } from "@config/requestSteps";
import { operationTypes } from "@config/useCase";
import { requestStepsNames } from "@config/requestStepsNames";
import { UseCase } from "@enum/useCase";

const useSavePayrollAgreement = (props: IUseSavePayrollAgreement) => {
  const {
    businessUnits,
    useCase,
    userAccount,
    sendData,
    data,
    setSendData,
    setShowModal,
    setErrorFetchSaveData,
    setEntryDeleted,
  } = props;

  const [savePayrollAgreement, setSavePayrollAgreement] =
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
  const navigatePage = "/payroll-agreement";

  const fetchSavePayrollAgData = async () => {
    setLoadingSendData(true);
    try {
      const saveData = await postSaveRequest(userAccount, data);
      setSavePayrollAgreement(saveData);
    } catch (error) {
      console.info(error);
      if (setErrorFetchSaveData) {
        setErrorFetchSaveData(true);
      }
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

  const isStatusIntAutomatic = (status: string | undefined): boolean => {
    return status ? statusFlowAutomatic.includes(status) : false;
  };
  const requestConfiguration = {
    ...data?.configurationRequestData,
    settingRequest: {
      requestNumber: savePayrollAgreement?.requestNumber,
      settingRequestId: savePayrollAgreement?.settingRequestId,
    },
  };

  const fetchRequestData = async () => {
    try {
      if (useCase === UseCase.ADD) {
        const newData = await postAddPayrollAgre(
          businessUnits,
          requestConfiguration as IRequestPayrollAgre,
        );
        setStatusRequest(newData.settingRequest?.requestStatus);
      }
      if (useCase === UseCase.EDIT) {
        const newData = await pacthEditPayrollAgre(
          businessUnits,
          requestConfiguration as IRequestPayrollAgre,
        );

        setStatusRequest(newData.settingRequest?.requestStatus);
      }
      if (useCase === UseCase.DELETE) {
        const newData = await deletePayrollAgre(
          businessUnits,
          requestConfiguration as IRequestPayrollAgre,
        );
        setStatusRequest(newData.settingRequest?.requestStatus);
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
            requestStepsNames.requestFiled,
            RequestStepsStatus.ERROR,
          ),
        );
        setSendData(false);
      } else {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsNames.requestFiled,
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
            requestStepsNames.adding,
            RequestStepsStatus.COMPLETED,
          ),
        );
      }

      if (isStatusRequestFinished()) {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsNames.adding,
            RequestStepsStatus.COMPLETED,
          ),
        );
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsNames.requestAdded,
            RequestStepsStatus.COMPLETED,
          ),
        );
      }

      if (isStatusCloseModal()) {
        setRequestSteps((prev) =>
          updateRequestSteps(
            prev,
            requestStepsNames.adding,
            RequestStepsStatus.ERROR,
          ),
        );
      }
    }, 2000);
  };

  const handleStatusChange = () => {
    if (isStatusIntAutomatic(savePayrollAgreement?.requestStatus)) {
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

  const handleCloseProcess = () => {
    setSendData(false);
    if (isStatusCloseModal() || isStatusRequestFinished()) {
      handleStatusChange();
    }
    if (useCase !== UseCase.DELETE) {
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
          data.configurationRequestData
            .payrollForDeductionAgreementId as string,
        );
      }, 3000);
    }
  };

  useEffect(() => {
    if (!sendData) return;
    fetchSavePayrollAgData();
  }, [sendData]);

  useEffect(() => {
    if (isStatusIntAutomatic(savePayrollAgreement?.requestStatus)) {
      fetchRequestData();
    }
  }, [savePayrollAgreement]);

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

  const showRequestProcess = sendData && savePayrollAgreement;
  const showRequestStatus =
    showPendingReqModal && savePayrollAgreement?.requestNumber;

  const {
    title: titleRequest,
    description: descriptionRequest,
    actionText: actionTextRequest,
  } = requestStatusMessage(savePayrollAgreement?.staffName);

  return {
    savePayrollAgreement,
    requestSteps,
    showPendingReqModal,
    loadingSendData,
    showRequestProcess,
    showRequestStatus,
    titleRequest,
    descriptionRequest,
    actionTextRequest,
    handleCloseProcess,
    handleCloseRequestStatus,
    handleClosePendingReqModal,
  };
};

export { useSavePayrollAgreement };
