import { useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { mediaQueryMobile } from "@config/environment";
import { IDetailsTabsConfig } from "@ptypes/generalCredPolicies/IDetailsTabsConfig";
import { IUseDetailsPoliciesModal } from "@ptypes/hooks/IUseDetailsPoliciesModal";
import { generalDataKeys } from "@config/generalCreditPolicies/assisted/generalDataKeys";
import { newDeleted } from "@utils/newDeletedDecision";
import { newInserted } from "@utils/newInsertedDecisions";

const useDetailsPoliciesModal = (props: IUseDetailsPoliciesModal) => {
  const {
    data,
    detailsTabsConfig,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
    decisionsMinimum,
    isMoreDetails,
  } = props;

  const [isSelected, setIsSelected] = useState<string>();
  const isMobile = useMediaQuery(mediaQueryMobile);

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const contribQuotaInserted = newInserted(decisionsReciprocity);
  const contribQuotaDeleted = newDeleted(decisionsReciprocity);
  const incomeQuotaInserted = newInserted(decisionsIncomePortfolio);
  const incomeQuotaDeleted = newDeleted(decisionsIncomePortfolio);
  const scoreModelsInserted = newInserted(decisionsScoreModels);
  const scoreModelsDeleted = newDeleted(decisionsScoreModels);
  const minimumInserted = newInserted(decisionsMinimum);
  const minimumDeleted = newDeleted(decisionsMinimum);

  const generalData = generalDataKeys.reduce(
    (acc, prop) => {
      const value = data?.[prop];
      if (value) acc[prop] = value;
      return acc;
    },
    {} as Record<string, unknown>,
  );

  const filteredTabsConfig = Object.keys(detailsTabsConfig).reduce(
    (acc, key) => {
      const tab = detailsTabsConfig[key as keyof IDetailsTabsConfig];
      if (
        Object.values(generalData).length === 0 &&
        tab?.id === detailsTabsConfig.generalDecision?.id
      ) {
        return acc;
      }
      if (
        (isMoreDetails || decisionsReciprocity.length === 0) &&
        tab?.id === detailsTabsConfig.contributionQuota?.id
      ) {
        return acc;
      }

      if (
        contribQuotaInserted.length === 0 &&
        tab?.id === detailsTabsConfig.contribQuotaIncluded?.id
      ) {
        return acc;
      }
      if (
        contribQuotaDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.contribQuotaRemoved?.id
      ) {
        return acc;
      }

      if (
        (isMoreDetails || decisionsIncomePortfolio.length === 0) &&
        tab?.id === detailsTabsConfig.incomeQuota?.id
      ) {
        return acc;
      }

      if (
        incomeQuotaInserted.length === 0 &&
        tab?.id === detailsTabsConfig.incomeQuotaIncluded?.id
      ) {
        return acc;
      }
      if (
        incomeQuotaDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.incomeQuotaRemoved?.id
      ) {
        return acc;
      }

      if (
        (isMoreDetails || decisionsScoreModels.length === 0) &&
        tab?.id === detailsTabsConfig.scoreModels?.id
      ) {
        return acc;
      }

      if (
        scoreModelsInserted.length === 0 &&
        tab?.id === detailsTabsConfig.scoreModelsIncluded?.id
      ) {
        return acc;
      }
      if (
        scoreModelsDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.scoreModelsRemoved?.id
      ) {
        return acc;
      }

      if (
        (isMoreDetails || decisionsMinimum.length === 0) &&
        tab?.id === detailsTabsConfig.minimumIncome?.id
      ) {
        return acc;
      }

      if (
        minimumInserted.length === 0 &&
        tab?.id === detailsTabsConfig.minimumIncomeIncluded?.id
      ) {
        return acc;
      }
      if (
        minimumDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.minimumIncomeRemoved?.id
      ) {
        return acc;
      }

      if (tab !== undefined) {
        acc[key as keyof IDetailsTabsConfig] = tab;
      }
      return acc;
    },
    {} as IDetailsTabsConfig,
  );

  const getFirstFilteredTab = (filteredTabsConfig: IDetailsTabsConfig) => {
    const keys = Object.keys(filteredTabsConfig);
    if (keys.length > 0) {
      return filteredTabsConfig[keys[0] as keyof IDetailsTabsConfig];
    }
    return undefined;
  };

  const defaultSelectedTab = getFirstFilteredTab(filteredTabsConfig)?.id;

  return {
    isSelected,
    isMobile,
    filteredTabsConfig,
    defaultSelectedTab,
    contribQuotaInserted,
    contribQuotaDeleted,
    incomeQuotaInserted,
    incomeQuotaDeleted,
    scoreModelsInserted,
    scoreModelsDeleted,
    minimumInserted,
    minimumDeleted,
    handleTabChange,
  };
};

export { useDetailsPoliciesModal };
