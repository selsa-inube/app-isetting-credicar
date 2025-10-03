import { useContext, useEffect, useState } from "react";
import { MdCheck, MdOutlineChangeCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { patchApprovalConfiguration } from "@services/creditLines/patchApprovalConfiguration";
import { errorObject } from "@utils/errorObject";
import { detailsRequest } from "@config/detailsRequest";
import { detailsRequestTabsConfig } from "@config/detailsRequestTabsConfig";
import { approvalInRequest } from "@config/status/approvalInRequest";
import { executeInRequest } from "@config/status/executeInRequest";
import { IUseRequestDetails } from "@ptypes/hooks/IUseRequestDetails";
import { IDetailsRequestTabsConfig } from "@ptypes/requestInProgress/IDetailsRequestTabsConfig";

const useRequestDetails = (props: IUseRequestDetails) => {
  const {
    data,
    hasError,
    setShowModal,
    setHasError,
    setLoading,
    setErrorData,
    fetchRequestData,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [isSelected, setIsSelected] = useState<string>();
  const navigate = useNavigate();

  const approvalRequest = approvalInRequest.includes(data.requestStatusCode);
  const executeRequest = executeInRequest.includes(data.requestStatusCode);

  const withErrorRequest = Object.values(data.settingRequestError).length > 0;

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

  const fetchApprovalRequestData = async () => {
    setLoading(true);
    try {
      await patchApprovalConfiguration(appData.user.userAccount, {
        requestNumber: data.requestNumber,
        modifyJustification: `${detailsRequest.modifyJustification} ${appData.user.userAccount}`,
        settingRequestId: data.settingRequestId,
      });
      setShowModal(false);
      navigate(-1);
    } catch (error) {
      console.info(error);
      setHasError(true);
      setErrorData(errorObject(error));
    } finally {
      setLoading(false);
    }
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);

    if (hasError) {
      setShowModal(false);
    }
  };

  const handleApproval = () => {
    fetchApprovalRequestData();
  };

  const handleExecute = () => {
    fetchRequestData();
  };

  const getFirstFilteredTab = (
    filteredTabsConfig: IDetailsRequestTabsConfig,
  ) => {
    const keys = Object.keys(filteredTabsConfig);
    if (keys.length > 0) {
      return filteredTabsConfig[keys[0] as keyof IDetailsRequestTabsConfig];
    }
    return undefined;
  };

  useEffect(() => {
    if (defaultSelectedTab === detailsRequestTabsConfig.errorData.id) {
      setIsSelected(detailsRequestTabsConfig.errorData.id);
    } else {
      setIsSelected(detailsRequestTabsConfig.trazabilityData.id);
    }
  }, []);

  const statusRequest = () => {
    const initial = {
      textButton: "",
      iconButton: <></>,
      onClick: () => void 0,
    };

    if (approvalRequest) {
      return {
        textButton: "Aprobar",
        iconButton: <MdCheck />,
        onClick: handleApproval,
      };
    }
    if (executeRequest) {
      return {
        textButton: "Ejecutar",
        iconButton: <MdOutlineChangeCircle />,
        onClick: handleExecute,
      };
    }

    return initial;
  };

  const statusRequestData = statusRequest();

  const filteredRequestTabs = Object.values(filteredRequestTabsConfig);

  const defaultSelectedTab = getFirstFilteredTab(filteredRequestTabsConfig)?.id;

  const showTrazabilityData =
    isSelected === detailsRequestTabsConfig.trazabilityData.id;

  const showErrorData = isSelected === detailsRequestTabsConfig.errorData.id;

  return {
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
  };
};

export { useRequestDetails };
