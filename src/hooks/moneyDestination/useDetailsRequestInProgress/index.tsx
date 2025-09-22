import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { patchApprovalConfiguration } from "@services/requestInProgress/patchApprovalConfiguration";
import { eventBus } from "@events/eventBus";
import { formatDateTable } from "@utils/date/formatDateTable";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { errorObject } from "@utils/errorObject";
import { EModalState } from "@enum/modalState";
import { RequestType } from "@enum/requestType";
import { EComponentAppearance } from "@enum/appearances";
import { detailsRequestTabsConfig } from "@config/detailsRequestTabsConfig";
import { detailsRequestInProgressModal } from "@config/moneyDestination/requestsInProgressTab/details/detailsRequestInProgressModal";
import { errorModal } from "@config/errorModal";
import { withErrorInRequest } from "@config/status/withErrorInRequest";
import { detailsRequest } from "@config/detailsRequest";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IErrors } from "@ptypes/IErrors";
import { IDetailsRequestTabsConfig } from "@ptypes/requestInProgress/IDetailsRequestTabsConfig";

const useDetailsRequestInProgress = (data: IEntry) => {
  const [showModal, setShowModal] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [isSelected, setIsSelected] = useState<string>();
  const { appData } = useContext(AuthAndPortalData);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const normalizeData = {
    ...data,
    request: data.useCaseName,
    responsable: "",
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

  const withErrorRequest = withErrorInRequest.includes(data.requestStatusCode);

  const fetchRequestData = async () => {
    setLoading(true);
    try {
      await patchApprovalConfiguration(appData.user.userAccount, {
        requestNumber: data.requestNumber,
        modifyJustification: `${detailsRequest.modifyJustification} ${appData.user.userAccount}`,
        settingRequestId: data.settingRequestId,
      });
      setShowModal(false);
      navigate("/");
    } catch (error) {
      console.info(error);
      setHasError(true);
      setErrorData(errorObject(error));
    } finally {
      setLoading(false);
    }
  };

  const filteredRequestTabsConfig = Object.keys(
    detailsRequestTabsConfig,
  ).reduce((detail, key) => {
    const tab =
      detailsRequestTabsConfig[key as keyof IDetailsRequestTabsConfig];

    if (
      tab?.id === detailsRequestTabsConfig.errorData.id &&
      !withErrorRequest
    ) {
      return detail;
    }

    if (tab !== undefined) {
      detail[key as keyof IDetailsRequestTabsConfig] = tab;
    }
    return detail;
  }, {} as IDetailsRequestTabsConfig);

  const handleTabRequestChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const handleApproval = () => {
    fetchRequestData();
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);

    if (hasError) {
      setShowModal(false);
    }
  };

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

  const getFirstFilteredTab = (
    filteredTabsConfig: IDetailsRequestTabsConfig,
  ) => {
    const keys = Object.keys(filteredTabsConfig);
    if (keys.length > 0) {
      return filteredTabsConfig[keys[0] as keyof IDetailsRequestTabsConfig];
    }
    return undefined;
  };

  const defaultSelectedTab = getFirstFilteredTab(filteredRequestTabsConfig)?.id;

  useEffect(() => {
    if (defaultSelectedTab === detailsRequestTabsConfig.errorData.id) {
      setIsSelected(detailsRequestTabsConfig.errorData.id);
    } else {
      setIsSelected(detailsRequestTabsConfig.trazabilityData.id);
    }
  }, []);

  const filteredRequestTabs = Object.values(filteredRequestTabsConfig);

  const showTrazabilityData =
    isSelected === detailsRequestTabsConfig.trazabilityData.id;

  const showErrorData = isSelected === detailsRequestTabsConfig.errorData.id;

  const title = `${detailsRequestInProgressModal.labelRequest} ${
    RequestType[normalizeData.request as keyof typeof RequestType] ??
    data.request
  }`;

  return {
    showModal,
    normalizeData,
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
    handleTabRequestChange,
    handleApproval,
    handleToggleModal,
  };
};

export { useDetailsRequestInProgress };
