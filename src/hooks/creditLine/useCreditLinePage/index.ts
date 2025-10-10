import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { ERequestInProgress } from "@enum/requestInProgress";
import { ECreditLines } from "@enum/creditLines";
import { mediaQueryTablet } from "@config/environment";
import { creditLinesTabsConfig } from "@config/creditLines/tabs";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { ICreditTabsConfig } from "@ptypes/creditLines/ICreditTabsConfig";
import { useLineInconstructionData } from "../useLineInconstructionData";

const useCreditLinePage = (businessUnitSigla: string) => {
  const { appData } = useContext(AuthAndPortalData);
  const [showUnderConstruction, setShowUnderConstruction] =
    useState<boolean>(false);
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const [loading, setLoading] = useState(true);

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

  return {
    isSelected,
    descriptionOptions,
    smallScreen,
    showCreditLinesTab,
    showLinesRequestTab,
    showLinesUnderConstructionTab,
    loading,
    creditLinesTabs,
    handleTabChange,
    setShowUnderConstruction,
  };
};

export { useCreditLinePage };
