import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { postSaveRequest } from "@services/requestInProgress/postSaveRequest";
import { postAddPayrollAgreement } from "@services/payrollAgreement/postAddPayrollAgreement";
import { pacthEditPayrollAgreement } from "@services/payrollAgreement/pacthEditPayrollAgre";
import { deletePayrollAgreement } from "@services/payrollAgreement/deletePayrollAgre";
import { ERequestStepsStatus } from "@enum/requestStepsStatus";
import { EUseCase } from "@enum/useCase";
import { errorObject } from "@utils/errorObject";
import { interventionHumanMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/interventionHumanMessage";
import { flowAutomaticMessages } from "@config/payrollAgreement/payrollAgreementTab/generic/flowAutomaticMessages";
import { requestStepsInitial } from "@config/requestSteps";
import { operationTypes } from "@config/useCase";
import { requestStepsNames } from "@config/requestStepsNames";
import { statusFlowAutomatic } from "@config/status/statusFlowAutomatic";
import { statusCloseModal } from "@config/status/statusCloseModal";
import { requestStatusMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestStatusMessage";
import { statusRequestFinished } from "@config/status/statusRequestFinished";
import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre";
import { IUseSavePayrollAgreement } from "@ptypes/hooks/payrollAgreement/IUseSavePayrollAgreement";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IErrors } from "@ptypes/IErrors";

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
  const [showPendingRequestModal, setShowPendingRequestModal] = useState(false);
  const [loadingSendData, setLoadingSendData] = useState(false);
  const [errorFetchRequest, setErrorFetchRequest] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [hasError, setHasError] = useState(false);
  const [networkError, setNetworkError] = useState<IErrors>({} as IErrors);
  const { setChangeTab } = useContext(ChangeToRequestTab);

  const navigate = useNavigate();
  const navigatePage = "/payroll-agreement";

  const fetchSavePayrollData = async () => {
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
      setHasError(true);
      setErrorData(errorObject(error));
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
      if (useCase === EUseCase.ADD) {
        const newData = await postAddPayrollAgreement(
          userAccount,
          businessUnits,
          requestConfiguration as IRequestPayrollAgre,
        );
        setStatusRequest(newData.settingRequest?.requestStatus);
      }
      if (useCase === EUseCase.EDIT) {
        const newData = await pacthEditPayrollAgreement(
          userAccount,
          businessUnits,
          requestConfiguration as IRequestPayrollAgre,
        );
        setStatusRequest(newData.settingRequest?.requestStatus);
      }
      if (useCase === EUseCase.DELETE) {
        const newData = await deletePayrollAgreement(
          userAccount,
          businessUnits,
          requestConfiguration as IRequestPayrollAgre,
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
        }, 3000);
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
    if (isStatusIntAutomatic(savePayrollAgreement?.requestStatus)) {
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
          data.configurationRequestData
            .payrollForDeductionAgreementId as string,
        );
      }, 3000);
    }
  };

  useEffect(() => {
    if (!sendData) return;
    fetchSavePayrollData();
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
      title: interventionHumanMessage.successfulCreateRequestIntHuman.title,
      description:
        interventionHumanMessage.successfulCreateRequestIntHuman.description,
      appearance: interventionHumanMessage.successfulCreateRequestIntHuman
        .appearance as IFlagAppearance,
      duration:
        interventionHumanMessage.successfulCreateRequestIntHuman.duration,
    });
  };

  const handleClosePendingRequestModal = () => {
    setShowPendingRequestModal(false);
    setChangeTab(true);
    navigate(navigatePage);
  };

  const showRequestProcess = sendData && savePayrollAgreement;
  const showRequestStatus =
    showPendingRequestModal && savePayrollAgreement?.requestNumber;

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
    if (errorFetchRequest && hasError) {
      setChangeTab(true);
    }
    if (useCase !== EUseCase.DELETE) {
      navigate(navigatePage);
    }
  };

  const {
    title: titleRequest,
    description: descriptionRequest,
    actionText: actionTextRequest,
  } = requestStatusMessage(savePayrollAgreement?.staffName);

  return {
    savePayrollAgreement,
    requestSteps,
    showPendingRequestModal,
    loadingSendData,
    showRequestProcess,
    showRequestStatus,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    titleRequest,
    descriptionRequest,
    actionTextRequest,
    handleToggleErrorModal,
    handleCloseProcess,
    handleCloseRequestStatus,
    handleClosePendingRequestModal,
  };
};

export { useSavePayrollAgreement };
