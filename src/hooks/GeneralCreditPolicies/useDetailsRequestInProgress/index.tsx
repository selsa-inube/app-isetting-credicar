import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { postAddGeneralPolicies } from "@services/generalPolicies/postAddGeneralPolicies";
import { patchEditGeneralPolicies } from "@services/generalPolicies/patchEditGeneralPolicies";
import { useRequestDetails } from "@hooks/useRequestDetails";
import { eventBus } from "@events/eventBus";
import { formatDateTable } from "@utils/date/formatDateTable";
import { errorObject } from "@utils/errorObject";
import { getDescriptionError } from "@utils/getDescriptionError";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { EModalState } from "@enum/modalState";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { EComponentAppearance } from "@enum/appearances";
import { interventionHumanMessage } from "@config/generalCreditPolicies/generic/interventionHumanMessage";
import { requestProcessedModal } from "@config/generalCreditPolicies/generic/processedModal";
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
  const [processedModal, setProcessedModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const navigate = useNavigate();
  const { addFlag } = useFlag();

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

  const handleProcessed = () => {
    setProcessedModal(false);
    navigate("/credit-lines");
  };

  const handleCloseProcessed = () => {
    setProcessedModal(false);
    navigate("/");
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
      if (data.useCaseName === EGeneralPolicies.USE_CASE_ADD) {
        await postAddGeneralPolicies(
          appData.businessUnit.publicCode,
          appData.user.userAccount,
          requestConfiguration as IRequestGeneralPol,
          appData.token,
        );
        setShowModal(false);
        setProcessedModal(true);
        addFlag({
          title: interventionHumanMessage.SuccessCreatePolicies.title,
          description:
            interventionHumanMessage.SuccessCreatePolicies.description,
          appearance: interventionHumanMessage.SuccessCreatePolicies
            .appearance as IFlagAppearance,
          duration: interventionHumanMessage.SuccessCreatePolicies.duration,
        });
      }
      if (data.useCaseName === EGeneralPolicies.USE_CASE_EDIT) {
        await patchEditGeneralPolicies(
          appData.businessUnit.publicCode,
          appData.user.userAccount,
          requestConfiguration as IRequestGeneralPol,
          appData.token,
        );
        setShowModal(false);
        navigate("/");
        addFlag({
          title: interventionHumanMessage.SuccessCreatePoliciesEdit.title,
          description:
            interventionHumanMessage.SuccessCreatePoliciesEdit.description,
          appearance: interventionHumanMessage.SuccessCreatePoliciesEdit
            .appearance as IFlagAppearance,
          duration: interventionHumanMessage.SuccessCreatePoliciesEdit.duration,
        });
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
    const decision = hasError || processedModal;
    setShowDecision(decision);
  }, [hasError, processedModal]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      moreDetails: "",
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
        ...errorModal(
          messageErrorStatusRequest(
            errorData.status,
            getDescriptionError(errorData.response),
          ),
        ),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (processedModal) {
      return {
        ...requestProcessedModal,
        onCloseModal: handleCloseProcessed,
        onClick: handleProcessed,
        moreDetails: "",
        withCancelButton: true,
        withIcon: true,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
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
