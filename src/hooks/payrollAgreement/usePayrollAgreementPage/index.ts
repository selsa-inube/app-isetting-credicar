import { useMediaQuery } from "@inubekit/inubekit";
import { useContext, useEffect, useState } from "react";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { payrollAgreementTabsConfig } from "@config/payrollAgreement/tabs";
import { menuOptionsPayroll } from "@config/payrollAgreement/payrollAgreementTab/menuOptions";
import { mediaQueryTablet } from "@config/environment";
import { IUsePayrollAgreementPage } from "@ptypes/hooks/payrollAgreement/IUsePayrollAgreementPage";
import { IRequestsInProgress } from "@ptypes/payrollAgreement/requestInProgTab/IRequestsInProgress";
import { IPayrollTabsConfig } from "@ptypes/payrollAgreement/IPayrollTabsConfig";
import { IMenuOptions } from "@ptypes/design/IMenuOptions";

const usePayrollAgreementPage = (props: IUsePayrollAgreementPage) => {
  const { businessUnitSigla, businessUnits, businessManager } = props;

  const { appData } = useContext(AuthAndPortalData);
  const smallScreen = useMediaQuery(mediaQueryTablet);

  const tabs = payrollAgreementTabsConfig(smallScreen);

  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const [isSelected, setIsSelected] = useState<string>(
    tabs.payrollAgreement.id,
  );
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [options, setOptions] = useState<IMenuOptions[]>(menuOptionsPayroll);

  const { disabledButton: disabledAdd } = useValidateUseCase({
    useCase: EPayrollAgreement.USE_CASE_ADD,
  });

  useEffect(() => {
    const menuOptions = menuOptionsPayroll.map((option) => {
      if (option.description === EPayrollAgreement.MENU_OPTION_ADD) {
        return {
          ...option,
          disabled: disabledAdd,
        };
      } else {
        return option;
      }
    });

    setOptions(menuOptions);
  }, [disabledAdd]);

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId: appData.portal.publicCode,
    optionName: EPayrollAgreement.OPTION_NAME,
  });

  const onToggleModal = () => {
    setShowModal(!showModal);
  };

  const onToggleInfoModal = () => {
    if (disabledAdd) {
      setShowInfoModal(!showInfoModal);
    }
  };
  const onCloseMenu = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      try {
        if (businessManager.length > 0) {
          const data = await getRequestsInProgress(
            businessManager,
            businessUnits,
            EPayrollAgreement.CONDITION_RULE,
          );
          setRequestsInProgress(data as IRequestsInProgress[]);
        }
      } catch (error) {
        console.info(error);
      }
    };

    fetchRequestsInProgressData();
  }, [businessManager, businessUnits]);

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

  const filteredTabsConfig = Object.keys(tabs).reduce((acc, key) => {
    const tab = tabs[key as keyof typeof payrollAgreementTabsConfig];

    if (
      key === tabs.requestsInProgress.id &&
      requestsInProgress &&
      requestsInProgress.length === 0
    ) {
      return acc;
    }

    if (tab !== undefined) {
      acc[key as keyof IPayrollTabsConfig] = tab;
    }
    return acc;
  }, {} as IPayrollTabsConfig);

  const showPayrollAgreementTab = isSelected === tabs.payrollAgreement.id;

  const showRequestsInProgressTab = isSelected === tabs.requestsInProgress.id;

  const payrollAgreementTabs = Object.values(filteredTabsConfig);

  return {
    isSelected,
    descriptionOptions,
    showPayrollAgreementTab,
    showRequestsInProgressTab,
    smallScreen,
    payrollAgreementTabs,
    filteredTabsConfig,
    showModal,
    showInfoModal,
    options,
    onToggleInfoModal,
    onCloseMenu,
    onToggleModal,
    handleTabChange,
  };
};

export { usePayrollAgreementPage };
