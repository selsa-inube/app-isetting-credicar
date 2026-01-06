import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineWarningAmber } from "react-icons/md";
import { useMediaQuery } from "@inubekit/inubekit";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { ERequestInProgress } from "@enum/requestInProgress";
import { EComponentAppearance } from "@enum/appearances";
import { ECreditLines } from "@enum/creditLines";
import { mediaQueryTablet } from "@config/environment";
import { showOptionModal } from "@config/creditLines/showOptionModal";
import { creditLinesTabsConfig } from "@config/creditLines/tabs";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { ICreditTabsConfig } from "@ptypes/creditLines/ICreditTabsConfig";
import { useLineInconstructionData } from "../useLineInconstructionData";

const useCreditLinePage = (businessUnitSigla: string) => {
  const { appData } = useContext(AuthAndPortalData);
  const [showUnderConstruction, setShowUnderConstruction] =
    useState<boolean>(false);
  const [showDecision, setShowModal] = useState<boolean>(false);
  const [showModal, setShowDecision] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);

  const navigate = useNavigate();

  const tabs = creditLinesTabsConfig;

  const [isSelected, setIsSelected] = useState<string>(tabs.creditLines.id);

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId: appData.portal.publicCode,
    optionName: ECreditLines.OPTION_NAME,
  });

  const { lineUnderConstruction } = useLineInconstructionData();

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      setLoading(true);
      try {
        if (appData.businessManager.publicCode.length > 0) {
          const data = await getRequestsInProgress(
            appData.businessManager.publicCode,
            appData.businessUnit.publicCode,
            ERequestInProgress.CREDIT_LINE,
          );
          setRequestsInProgress(data as IRequestsInProgress[]);
        }
      } catch (error) {
        console.info(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestsInProgressData();
  }, [appData.businessManager.publicCode, appData.businessUnit.publicCode]);

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };
  const { changeTab, setChangeTab } = useContext(ChangeToRequestTab);

  useEffect(() => {
    if (changeTab) {
      if (!showUnderConstruction) {
        setIsSelected(tabs.requestsInProgress.id);
      }

      if (showUnderConstruction) {
        setIsSelected(tabs.linesUnderConstruction.id);
      }
    }
  }, [changeTab]);

  useEffect(() => {
    if (isSelected === tabs.requestsInProgress.id) {
      setChangeTab(false);
      setIsSelected(tabs.requestsInProgress.id);
    }

    if (isSelected === tabs.linesUnderConstruction.id) {
      setChangeTab(false);
      setIsSelected(tabs.linesUnderConstruction.id);
    }
  }, [isSelected]);

  const filteredTabsConfig = Object.keys(tabs).reduce((data, key) => {
    const tab = tabs[key as keyof typeof creditLinesTabsConfig];

    if (
      key === tabs.requestsInProgress.id &&
      requestsInProgress &&
      requestsInProgress.length === 0
    ) {
      return data;
    }

    if (
      key === tabs.linesUnderConstruction.id &&
      (!lineUnderConstruction || lineUnderConstruction.length === 0)
    ) {
      return data;
    }

    if (tab !== undefined) {
      data[key as keyof ICreditTabsConfig] = tab;
      data[key as keyof ICreditTabsConfig] = tab;
    }
    return data;
  }, {} as ICreditTabsConfig);

  const showCreditLinesTab = isSelected === tabs.creditLines.id;

  const showLinesUnderConstructionTab =
    isSelected === tabs.linesUnderConstruction.id;

  const showLinesRequestTab = isSelected === tabs.requestsInProgress.id;

  const creditLinesTabs = Object.values(filteredTabsConfig);

  const smallScreen = useMediaQuery(mediaQueryTablet);

  const handleToggleModal = () => {
    setShowModal(!showModal);
    navigate("/");
  };

  useEffect(() => {
    const decision = showModal;

    setShowDecision(decision);
  }, [showModal]);

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

    if (smallScreen) {
      return {
        ...showOptionModal,
        onCloseModal: handleToggleModal,
        onClick: handleToggleModal,
        withCancelButton: false,
        withIcon: true,
        icon: <MdOutlineWarningAmber />,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    return initial;
  };

  const modalData = modal();

  return {
    isSelected,
    descriptionOptions,
    smallScreen,
    showCreditLinesTab,
    showLinesRequestTab,
    showLinesUnderConstructionTab,
    loading,
    creditLinesTabs,
    showDecision,
    modalData,
    handleTabChange,
    setShowUnderConstruction,
  };
};

export { useCreditLinePage };
