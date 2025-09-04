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

const useCreditLinePage = (businessUnitSigla: string) => {
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";
  const [requestsInProgress] = useState<IRequestsInProgress[]>([]);

  const tabs = creditLinesTabsConfig;

  const [isSelected, setIsSelected] = useState<string>(tabs.creditLines.id);

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId,
    optionName: ECreditLines.OPTION_NAME,
  });

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };
  const { changeTab, setChangeTab } = useContext(ChangeToRequestTab);

  useEffect(() => {
    if (changeTab) {
      setIsSelected(tabs.requestsInProgress.id);
    }
  }, [changeTab]);

  useEffect(() => {
    if (isSelected === tabs.requestsInProgress.id) {
      setChangeTab(false);
      setIsSelected(tabs.requestsInProgress.id);
    }
  }, [isSelected]);

  const filteredTabsConfig = Object.keys(tabs).reduce((tabs, key) => {
    const tab = tabs[key as keyof typeof creditLinesTabsConfig];

    if (
      key === tabs.requestsInProgress.id &&
      requestsInProgress &&
      requestsInProgress.length === 0
    ) {
      return tabs;
    }

    if (tab !== undefined) {
      tabs[key as keyof ICreditTabsConfig] = tab;
    }
    return tabs;
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
  };
};

export { useCreditLinePage };
