import { useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { mediaQueryMobile } from "@config/environment";
import { IDetailsTabsConfig } from "@ptypes/generalCredPolicies/IDetailsTabsConfig";
import { IUseDetailsPoliciesModal } from "@ptypes/hooks/IUseDetailsPoliciesModal";
import { generalDataKeys } from "@config/generalCreditPolicies/assisted/generalDataKeys";
import { newDeleted } from "@utils/newDeletedDecision";
import { newInserted } from "@utils/newInsertedDecisions";

const useDetailsPoliciesModal = (props: IUseDetailsPoliciesModal) => {
  const { data, detailsTabsConfig, decisions, isMoreDetails } = props;

  const [isSelected, setIsSelected] = useState<string>();
  const isMobile = useMediaQuery(mediaQueryMobile);

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const contribQuotaInserted = newInserted(decisions.reciprocity);
  const contribQuotaDeleted = newDeleted(decisions.reciprocity);
  const incomeQuotaInserted = newInserted(decisions.incomePortfolio);
  const incomeQuotaDeleted = newDeleted(decisions.incomePortfolio);
  const scoreModelsInserted = newInserted(decisions.scoreModels);
  const scoreModelsDeleted = newDeleted(decisions.scoreModels);
  const minimumInserted = newInserted(decisions.minimum);
  const minimumDeleted = newDeleted(decisions.minimum);
  const basicNotifFormatInserted = newInserted(decisions.basicNotifFormat);
  const basicNotifFormatDeleted = newDeleted(decisions.basicNotifFormat);
  const basicNotifRecipientInserted = newInserted(
    decisions.basicNotifRecipient,
  );
  const basicNotifRecipientDeleted = newDeleted(decisions.basicNotifRecipient);
  const minCredBureauRiskScoreInserted = newInserted(
    decisions.minCredBureauRiskScore,
  );
  const minCredBureauRiskScoreDeleted = newDeleted(
    decisions.minCredBureauRiskScore,
  );
  const notifChannelInserted = newInserted(decisions.notifChannel);
  const notifChannelDeleted = newDeleted(decisions.notifChannel);

  const riskScoreApiUrlInserted = newInserted(decisions.riskScoreApiUrl);
  const riskScoreApiUrlDeleted = newDeleted(decisions.riskScoreApiUrl);

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
        (isMoreDetails || decisions.reciprocity.length === 0) &&
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
        (isMoreDetails || decisions.incomePortfolio.length === 0) &&
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
        (isMoreDetails || decisions.scoreModels.length === 0) &&
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
        (isMoreDetails || decisions.minimum.length === 0) &&
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

      if (
        (isMoreDetails || decisions.basicNotifFormat.length === 0) &&
        tab?.id === detailsTabsConfig.basicNotifFormat?.id
      ) {
        return acc;
      }

      if (
        basicNotifFormatInserted.length === 0 &&
        tab?.id === detailsTabsConfig.basicNotifFormatIncluded?.id
      ) {
        return acc;
      }
      if (
        basicNotifFormatDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.basicNotifFormatRemoved?.id
      ) {
        return acc;
      }

      if (
        (isMoreDetails || decisions.basicNotifRecipient.length === 0) &&
        tab?.id === detailsTabsConfig.basicNotifRecipient?.id
      ) {
        return acc;
      }

      if (
        basicNotifRecipientInserted.length === 0 &&
        tab?.id === detailsTabsConfig.basicNotifRecipientIncluded?.id
      ) {
        return acc;
      }
      if (
        basicNotifRecipientDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.basicNotifRecipientRemoved?.id
      ) {
        return acc;
      }

      if (
        (isMoreDetails || decisions.minCredBureauRiskScore.length === 0) &&
        tab?.id === detailsTabsConfig.minCredBureauRiskScore?.id
      ) {
        return acc;
      }

      if (
        minCredBureauRiskScoreInserted.length === 0 &&
        tab?.id === detailsTabsConfig.minCredBureauRiskScoreIncluded?.id
      ) {
        return acc;
      }
      if (
        minCredBureauRiskScoreDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.minCredBureauRiskScoreRemoved?.id
      ) {
        return acc;
      }

      if (
        (isMoreDetails || decisions.notifChannel.length === 0) &&
        tab?.id === detailsTabsConfig.notificationChannel?.id
      ) {
        return acc;
      }

      if (
        notifChannelInserted.length === 0 &&
        tab?.id === detailsTabsConfig.notificationChannelIncluded?.id
      ) {
        return acc;
      }
      if (
        notifChannelDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.notificationChannelRemoved?.id
      ) {
        return acc;
      }

      if (
        (isMoreDetails || decisions.riskScoreApiUrl.length === 0) &&
        tab?.id === detailsTabsConfig.riskScoreApiUrl?.id
      ) {
        return acc;
      }

      if (
        riskScoreApiUrlInserted.length === 0 &&
        tab?.id === detailsTabsConfig.riskScoreApiUrlIncluded?.id
      ) {
        return acc;
      }
      if (
        riskScoreApiUrlDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.riskScoreApiUrlRemoved?.id
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
    basicNotifFormatInserted,
    basicNotifFormatDeleted,
    basicNotifRecipientInserted,
    basicNotifRecipientDeleted,
    minCredBureauRiskScoreInserted,
    minCredBureauRiskScoreDeleted,
    notifChannelInserted,
    notifChannelDeleted,
    riskScoreApiUrlInserted,
    riskScoreApiUrlDeleted,
    handleTabChange,
  };
};

export { useDetailsPoliciesModal };
