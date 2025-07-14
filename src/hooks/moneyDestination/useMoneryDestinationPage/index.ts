import { useContext, useEffect, useState } from "react";
import { moneyDestinationTabsConfig } from "@config/moneyDestination/tabs";
import { useMediaQuery } from "@inubekit/inubekit";

import { decrypt } from "@utils/crypto/decrypt";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { IUseMoneryDestinationPage } from "@ptypes/hooks/moneyDestination/IUseMoneryDestinationPage";
import { IDestinationTabsConfig } from "@ptypes/moneyDestination/tabs/IDestinationTabsConfig";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";

const useMoneryDestinationPage = (props: IUseMoneryDestinationPage) => {
  const { businessUnitSigla, businessUnits } = props;
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";
  const smallScreen = useMediaQuery("(max-width: 990px)");
  const tabs = moneyDestinationTabsConfig(smallScreen);
  const [isSelected, setIsSelected] = useState<string>(
    tabs.moneyDestination.id,
  );
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId,
    optionName: "Destinos de dinero",
  });

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };
  const { changeTab, setChangeTab } = useContext(ChangeToRequestTab);

  const onToggleModal = () => {
    setShowModal(!showModal);
  };

  const onToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };
  const onCloseMenu = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      try {
        const data = await getRequestsInProgress(
          businessUnits,
          "MoneyDestination",
        );
        setRequestsInProgress(data);
      } catch (error) {
        console.info(error);
      }
    };

    fetchRequestsInProgressData();
  }, []);

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

  const filteredTabsConfig = Object.keys(tabs).reduce((acc, key) => {
    const tab = tabs[key as keyof typeof tabs];

    if (
      key === tabs.requestsInProgress.id &&
      requestsInProgress &&
      requestsInProgress.length === 0
    ) {
      return acc;
    }

    if (tab !== undefined) {
      acc[key as keyof IDestinationTabsConfig] = tab;
    }
    return acc;
  }, {} as IDestinationTabsConfig);

  const showMoneyTab = isSelected === tabs.moneyDestination.id;

  const showRequestsTab = isSelected === tabs.requestsInProgress.id;

  const moneyDestinationTabs = Object.values(filteredTabsConfig);

  return {
    isSelected,
    descriptionOptions,
    showModal,
    showInfoModal,
    smallScreen,
    showMoneyTab,
    showRequestsTab,
    moneyDestinationTabs,
    onCloseMenu,
    onToggleModal,
    onToggleInfoModal,
    handleTabChange,
  };
};

export { useMoneryDestinationPage };
