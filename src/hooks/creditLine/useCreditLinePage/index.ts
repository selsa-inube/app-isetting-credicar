import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { decrypt } from "@utils/crypto/decrypt";
import { ECreditLines } from "@enum/creditLines";
import { mediaQueryTablet } from "@config/environment";
import { creditLinesTabsConfig } from "@config/creditLines/tabs";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { ICreditTabsConfig } from "@ptypes/creditLines/ICreditTabsConfig";
import { useLineInconstructionData } from "../useLineInconstructionData";

const useCreditLinePage = (businessUnitSigla: string) => {
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";
  const [showUnderConstruction, setShowUnderConstruction] =
    useState<boolean>(false);
  const [requestsInProgress] = useState<IRequestsInProgress[]>([]);

  const tabs = creditLinesTabsConfig;

  const [isSelected, setIsSelected] = useState<string>(tabs.creditLines.id);

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId,
    optionName: ECreditLines.OPTION_NAME,
  });

  const { lineUnderConstruction } = useLineInconstructionData();

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
    creditLinesTabs,
    handleTabChange,
    setShowUnderConstruction,
  };
};

export { useCreditLinePage };
