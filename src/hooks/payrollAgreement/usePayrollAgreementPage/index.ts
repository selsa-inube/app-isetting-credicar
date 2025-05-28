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

const usePayrollAgreementPage = (props: IUsePayrollAgreementPage) => {
  const { businessUnitSigla, bussinesUnits } = props;
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const [isSelected, setIsSelected] = useState<string>(
    payrollAgreementTabsConfig.payrollAgreement.id,
  );

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId,
    optionName: "Nóminas de convenio",
  });

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      try {
        const data = await getRequestsInProgress(
          bussinesUnits,
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
      setIsSelected(payrollAgreementTabsConfig.requestsInProgress.id);
    }
  }, [changeTab]);

  useEffect(() => {
    if (isSelected === payrollAgreementTabsConfig.requestsInProgress.id) {
      setChangeTab(false);
      setIsSelected(payrollAgreementTabsConfig.requestsInProgress.id);
    }
  }, [isSelected]);

  const filteredTabsConfig = Object.keys(payrollAgreementTabsConfig).reduce(
    (acc, key) => {
      const tab =
        payrollAgreementTabsConfig[
          key as keyof typeof payrollAgreementTabsConfig
        ];

      if (
        key === payrollAgreementTabsConfig.requestsInProgress.id &&
        requestsInProgress &&
        requestsInProgress.length === 0
      ) {
        return acc;
      }

      if (tab !== undefined) {
        acc[key as keyof IPayrollTabsConfig] = tab;
      }
      return acc;
    },
    {} as IPayrollTabsConfig,
  );

  const smallScreen = useMediaQuery("(max-width: 990px)");
  const smallScreenTab = useMediaQuery("(max-width: 450px)");

  const showPayrollAgreementTab =
    isSelected === payrollAgreementTabsConfig.payrollAgreement.id;

  const showRequestsInProgressTab =
    isSelected === payrollAgreementTabsConfig.requestsInProgress.id;

  const payrollAgreementTabs = Object.values(filteredTabsConfig);

  return {
    isSelected,
    descriptionOptions,
    showPayrollAgreementTab,
    showRequestsInProgressTab,
    smallScreen,
    smallScreenTab,
    payrollAgreementTabs,
    filteredTabsConfig,
    handleTabChange,
  };
};

export { usePayrollAgreementPage };
