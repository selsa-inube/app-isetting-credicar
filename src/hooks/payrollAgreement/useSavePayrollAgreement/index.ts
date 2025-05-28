import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { statusFlowAutomatic } from "@config/status/statusFlowAutomatic";

import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { statusCloseModal } from "@config/status/statusCloseModal";
import { statusRequestFinished } from "@config/status/statusRequestFinished";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { IUseSavePayrollAgreement } from "@ptypes/hooks/payrollAgreement/IUseSavePayrollAgreement";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { requestStatusMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestStatusMessage";
import { requestStepsInitial } from "@config/requestSteps";
import { getRequestInProgressById } from "@services/requestInProgress/getRequestInProgressById";
import { flowAutomaticMessages } from "@config/payrollAgreement/payrollAgreementTab/generic/flowAutomaticMessages";
import { interventionHumanMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/interventionHumanMessage";
import { postSaveRequest } from "@services/requestInProgress/postSaveRequest";

const useSavePayrollAgreement = (props: IUseSavePayrollAgreement) => {
  const {
    bussinesUnits,
    userAccount,
    sendData,
    data,
    setSendData,
    setShowModal,
    setShowPendingReq,
    setErrorFetchSaveData,
  } = props;

  const [savePayrollAgreement, setSavePayrollAgreement] =
    useState<ISaveDataResponse>();
  const [statusRequest, setStatusRequest] = useState<string>();
  const { addFlag } = useFlag();
  const [requestSteps, setRequestSteps] =
    useState<IRequestSteps[]>(requestStepsInitial);
  const [showPendingReqModal, setShowPendingReqModal] = useState(false);
  const [loadingSendData, setLoadingSendData] = useState(false);

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
        title: flowAutomaticMessages.errorSendingData.title,
        description: flowAutomaticMessages.errorSendingData.description,
        appearance: flowAutomaticMessages.errorSendingData
          .appearance as IFlagAppearance,
        duration: flowAutomaticMessages.errorSendingData.duration,
      });
    } finally {
      setLoadingSendData(false);
      setShowModal(false);
    }
  };

  const isStatusIntAutomatic = (status: string | undefined): boolean => {
    return status ? statusFlowAutomatic.includes(status) : false;
  };

  const fetchRequestInProgressData = async () => {
    try {
      if (!isStatusIntAutomatic(savePayrollAgreement?.requestStatus)) return;
      const data = await getRequestInProgressById(
        bussinesUnits,
        savePayrollAgreement?.settingRequestId ?? "",
      );
      setStatusRequest(data.requestStatus);
    } catch (error) {
      console.info(error);
      navigate(navigatePage);
      addFlag({
        title: flowAutomaticMessages.errorQueryingData.title,
        description: flowAutomaticMessages.errorQueryingData.description,
        appearance: flowAutomaticMessages.errorQueryingData
          .appearance as IFlagAppearance,
        duration: flowAutomaticMessages.errorQueryingData.duration,
      });
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
    if (isStatusIntAutomatic(statusRequest)) {
      setRequestSteps((prev) =>
        updateRequestSteps(prev, requestStepsInitial[1].name, "completed"),
      );
    }

    if (isStatusRequestFinished()) {
      setRequestSteps((prev) =>
        updateRequestSteps(prev, requestStepsInitial[1].name, "completed"),
      );
      setRequestSteps((prev) =>
        updateRequestSteps(prev, requestStepsInitial[2].name, "completed"),
      );
    }

    if (isStatusCloseModal()) {
      setRequestSteps((prev) =>
        updateRequestSteps(prev, requestStepsInitial[1].name, "error"),
      );
    }
  };

  const handleStatusChange = () => {
    setTimeout(() => {
      if (isStatusIntAutomatic(savePayrollAgreement?.requestStatus)) {
        if (isStatusCloseModal()) {
          setChangeTab(true);
          navigate(navigatePage);
          addFlag({
            title: flowAutomaticMessages.errorCreateRequest.title,
            description: flowAutomaticMessages.errorCreateRequest.description,
            appearance: flowAutomaticMessages.errorCreateRequest
              .appearance as IFlagAppearance,
            duration: flowAutomaticMessages.errorCreateRequest.duration,
          });
        }

        if (isStatusRequestFinished()) {
          navigate(navigatePage);
          addFlag({
            title: flowAutomaticMessages.SuccessfulCreateRequest.title,
            description:
              flowAutomaticMessages.SuccessfulCreateRequest.description,
            appearance: flowAutomaticMessages.SuccessfulCreateRequest
              .appearance as IFlagAppearance,
            duration: flowAutomaticMessages.SuccessfulCreateRequest.duration,
          });
        }
      }
    }, 3000);
  };

  useEffect(() => {
    if (!sendData) return;
    fetchSavePayrollAgData();
  }, [sendData]);

  useEffect(() => {
    if (isStatusIntAutomatic(savePayrollAgreement?.requestStatus)) {
      setRequestSteps((prev) =>
        updateRequestSteps(prev, requestStepsInitial[0].name, "completed"),
      );

      const timer = setInterval(() => {
        const checkRequestStatus = async () => {
          if (isStatusCloseModal() || isStatusRequestFinished()) {
            changeRequestSteps();
            clearInterval(timer);
            setTimeout(() => {
              setSendData(false);
            }, 1500);
          } else {
            await fetchRequestInProgressData();
            changeRequestSteps();
          }
        };
        checkRequestStatus();
      }, 2000);

      const timeout = setTimeout(() => {
        clearInterval(timer);
        setSendData(false);
        setShowPendingReqModal(true);
        if (setShowPendingReq) {
          setShowPendingReq(!showPendingReqModal);
        }
      }, 60000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [savePayrollAgreement, statusRequest]);

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

  useEffect(() => {
    handleStatusChange();
  }, [statusRequest]);

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
    handleCloseRequestStatus,
    handleClosePendingReqModal,
  };
};

export { useSavePayrollAgreement };
