import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useModifyLinesConstructionData } from "@hooks/creditLine/useModifyLinesConstructionData";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { EComponentAppearance } from "@enum/appearances";
import { errorModal } from "@config/errorModal";
import { withoutDataModal } from "@config/withoutData";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";
import { IUseConfigurationInitial } from "@ptypes/hooks/creditLines/IUseConfigurationInitial";

const useConfigurationInitial = (props: IUseConfigurationInitial) => {
  const { data } = props;
  const { appData } = useContext(AuthAndPortalData);
  const { setLinesConstructionData, setLoadingInitial } = useContext(
    CreditLinesConstruction,
  );
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showWithoutDataModal, setShowWithoutDataModal] =
    useState<boolean>(false);
  const [showDecision, setShowDecision] = useState<boolean>(false);
  const [linesData, setLinesData] = useState<IModifyConstructionResponse>();
  const navigate = useNavigate();
  const withoutData = data === undefined;

  useEffect(() => {
    if (!withoutData) {
      setLinesData({
        settingRequestId: data.settingRequestId,
        configurationRequestData: data.configurationRequestData,
        configurationRequestsTraceability:
          data.configurationRequestsTraceability,
      });
    }
  }, [data?.settingRequestId, setLinesConstructionData]);

  const { borrowerData, loading, hasError, errorData, setHasError } =
    useModifyLinesConstructionData({
      userAccount: appData.user.userAccount,
      linesData,
      withNeWData: true,
    });

  useEffect(() => {
    if (loading) {
      setLoadingInitial(true);
    } else {
      setLoadingInitial(false);
      if (!loading && borrowerData?.settingRequestId) {
        const normalizeData: ILinesConstructionData = {
          abbreviatedName: String(
            borrowerData.configurationRequestData?.abbreviatedName ?? "",
          ),
          alias: String(borrowerData.configurationRequestData?.alias ?? ""),
          descriptionUse: String(
            borrowerData.configurationRequestData?.descriptionUse ?? "",
          ),
          lineOfCreditId: borrowerData.settingRequestId,
        };

        if (borrowerData.configurationRequestData?.rules) {
          normalizeData.rules = Object(
            borrowerData.configurationRequestData.rules,
          );
        }
        setLinesConstructionData((prev) => ({
          ...prev,
          ...normalizeData,
        }));
      }
    }
  }, [loading, borrowerData?.settingRequestId, setLinesConstructionData]);

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
    if (hasError) {
      setShowErrorModal(false);
    }
  };

  const handleToggleWithouDataModal = () => {
    setShowWithoutDataModal(!showWithoutDataModal);
    navigate("/credit-lines");
  };

  useEffect(() => {
    const decision =
      showErrorModal || showWithoutDataModal || hasError || withoutData;
    setShowDecision(decision);
  }, [showErrorModal, showWithoutDataModal, hasError]);

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
        ...errorModal(messageErrorStatusConsultation(errorData.status)),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (data === undefined) {
      return {
        ...withoutDataModal,
        onCloseModal: handleToggleWithouDataModal,
        onClick: handleToggleWithouDataModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    return initial;
  };

  const modalData = modal();

  return {
    showDecision,
    modalData,
  };
};

export { useConfigurationInitial };
