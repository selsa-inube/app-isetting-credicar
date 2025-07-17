import { useMediaQuery } from "@inubekit/inubekit";
import { useContext, useEffect, useState } from "react";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { decrypt } from "@utils/crypto/decrypt";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { payrollAgreementTabsConfig } from "@config/payrollAgreement/tabs";
import { IUsePayrollAgreementPage } from "@ptypes/hooks/payrollAgreement/IUsePayrollAgreementPage";
import { IPayrollTabsConfig } from "@ptypes/payrollAgreement/IPayrollTabsConfig";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { IRequestsInProgress } from "@ptypes/payrollAgreement/requestInProgTab/IRequestsInProgress";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { menuOptionsPayroll } from "@config/payrollAgreement/payrollAgreementTab/menuOptions";
import { IMenuOptions } from "@ptypes/design/IMenuOptions";

const usePayrollAgreementPage = (props: IUsePayrollAgreementPage) => {
  const { businessUnitSigla, businessUnits } = props;
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";

  const smallScreen = useMediaQuery("(max-width: 990px)");

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
    staffPortalId,
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
        const data = await getRequestsInProgress(
          businessUnits,
          "PayrollAgreement",
        );
        setRequestsInProgress(data);
      } catch (error) {
        console.info(error);
      }
    };

    fetchRequestsInProgressData();
  }, []);

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
