import { useContext, useEffect, useState } from "react";
import { moneyDestinationTabsConfig } from "@config/moneyDestination/tabs";

import { decrypt } from "@utils/crypto/decrypt";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { useTranslation } from "react-i18next";

const useMoneryDestinationPage = (businessUnitSigla: string) => {
  const { t } = useTranslation();
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";
  const [isSelected, setIsSelected] = useState<string>();

  const { descriptionOptions: rawDescriptionOptions } =
    useOptionsByBusinessUnit({
      businessUnit: businessUnitSigla,
      staffPortalId,
    });
  const translatedDescriptionOptions = {
    ...rawDescriptionOptions,
    id: t("moneyDestination.titlePage"),
    publicCode: t("moneyDestination.titlePage"),
    description: t("moneyDestination.descriptionPage"),
  };
  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };
  const { changeTab, setChangeTab } = useContext(ChangeToRequestTab);

  useEffect(() => {
    if (changeTab) {
      setIsSelected(moneyDestinationTabsConfig.requestsInProgress.id);
    }
  }, [changeTab]);

  useEffect(() => {
    if (isSelected === moneyDestinationTabsConfig.requestsInProgress.id) {
      setChangeTab(false);
      setIsSelected(moneyDestinationTabsConfig.requestsInProgress.id);
    }
  }, [isSelected]);

  return {
    isSelected,
    descriptionOptions: translatedDescriptionOptions,
    handleTabChange,
  };
};

export { useMoneryDestinationPage };
