import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { postAddGeneralPolicies } from "@services/generalPolicies/postAddGeneralPolicies";
import { patchEditGeneralPolicies } from "@services/generalPolicies/patchEditGeneralPolicies";
import { useRequestDetails } from "@hooks/useRequestDetails";
import { eventBus } from "@events/eventBus";
import { formatDateTable } from "@utils/date/formatDateTable";
import { errorObject } from "@utils/errorObject";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { EModalState } from "@enum/modalState";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { EComponentAppearance } from "@enum/appearances";
import { errorModal } from "@config/errorModal";
import { detailsRequestInProgressModal } from "@config/generalCreditPolicies/requestsInProgressTab/details/detailsRequestInProgressModal";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IUseDetailsRequestInProgress } from "@ptypes/generalCredPolicies/IUseDetailsRequest";
import { IRequestGeneralPol } from "@ptypes/generalCredPolicies/IRequestGeneralPol";
import { IErrors } from "@ptypes/IErrors";

const useDetailsRequestInProgress = (props: IUseDetailsRequestInProgress) => {
  const { data } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [showModal, setShowModal] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const navigate = useNavigate();

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const normalizeData = {
    ...data,
    request: data.useCaseName,
    responsable: data.staffName ?? "",
    status: data.requestStatus,
    traceability: data.configurationRequestsTraceability.map(
      (traceability: IEntry) => ({
        dateExecution: formatDateTable(new Date(traceability.executionDate)),
        actionExecuted: traceability.actionExecuted,
        userWhoExecuted: traceability.userWhoExecutedAction,
        description: traceability.description,
      }),
    ),
  };

  const requestConfiguration = {
    ...data?.configurationRequestData,
    settingRequest: {
      requestNumber: data?.requestNumber,
      settingRequestId: data?.settingRequestId,
    },
  };

  const fetchRequestData = async () => {
    setLoading(true);
    try {
      if (data.useCaseName === EGeneralPolicies.ADD_GENERAL_CREDIT_POLICIES) {
        await postAddGeneralPolicies(
          appData.businessUnit.publicCode,
          appData.user.userAccount,
          requestConfiguration as IRequestGeneralPol,
        );
        setShowModal(false);
        navigate(-1);
      }
      if (
        data.useCaseName === EGeneralPolicies.MODIFY_GENERAL_CREDIT_POLICIES
      ) {
        await patchEditGeneralPolicies(
          appData.businessUnit.publicCode,
          appData.user.userAccount,
          requestConfiguration as IRequestGeneralPol,
        );
        setShowModal(false);
        navigate(-1);
      }
    } catch (error) {
      console.info(error);
      setHasError(true);
      setErrorData(errorObject(error));
    } finally {
      setLoading(false);
    }
  };

  const {
    approvalRequest,
    defaultSelectedTab,
    executeRequest,
    filteredRequestTabs,
    isSelected,
    showErrorData,
    showTrazabilityData,
    statusRequestData,
    handleTabRequestChange,
    handleToggleErrorModal,
  } = useRequestDetails({
    data,
    hasError,
    setShowModal,
    setLoading,
    setErrorData,
    setHasError,
    fetchRequestData,
  });

  useEffect(() => {
    const decision = hasError;
    setShowDecision(decision);
  }, [hasError]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      icon: <></>,
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      withIcon: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (!loading && hasError) {
      return {
        ...errorModal(messageErrorStatusRequest(errorData.status)),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    return initial;
  };

  const modalData = modal();

  useEffect(() => {
    eventBus.emit(EModalState.SECOND_MODAL_STATE, showModal);
  }, [showModal]);

  const title = `${detailsRequestInProgressModal.labelRequest} ${
    normalizeData.request
  }`;

  const withErrorRequest = approvalRequest || executeRequest;

  return {
    showModal,
    filteredRequestTabs,
    showTrazabilityData,
    showErrorData,
    errorData,
    hasError,
    loading,
    isSelected,
    defaultSelectedTab,
    withErrorRequest,
    title,
    modalData,
    showDecision,
    statusRequestData,
    handleTabRequestChange,
    handleToggleModal,
    normalizeData,
  };
};

export { useDetailsRequestInProgress };
